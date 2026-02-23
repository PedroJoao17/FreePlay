// src/features/library/screens/Tracks/useTracksVM.ts
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AppState } from "react-native";
import * as Linking from "expo-linking";
import type { Track } from "@/features/library/model/types";
import {
    ensureAudioLibraryPermission,
    getAllTracks,
    subscribeToMediaLibraryChanges,
} from "@/features/library/data/mediaLibraryRepo";
import { initDb } from "@/core/db/initDb";
import { loadCachedTracks, upsertTracks } from "@/features/library/data/tracksCacheRepo";

type LoadState = "idle" | "loading" | "ready" | "denied" | "error";

export type TrackRow = {
    id: string;
    uri: string;
    title: string;
    letter: string;
    duration: number;
};

export type TrackSection = {
    title: string;
    data: TrackRow[];
};

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").concat("#");

function stripExtension(name: string) {
    return name.replace(/\.[^/.]+$/, "");
}

function normalizeTitle(filename: string) {
    const base = stripExtension(filename);
    return base.replace(/^\s*\d+\s*[-._)\]]\s*/g, "").trim();
}

function getLetter(title: string) {
    const ch = (title.trim()[0] ?? "").toUpperCase();
    return ch >= "A" && ch <= "Z" ? ch : "#";
}

function buildRows(tracks: Track[]): TrackRow[] {
    const rows = tracks.map((t) => {
        const title = normalizeTitle(t.filename);
        return {
            id: t.id,
            uri: t.uri,
            title,
            letter: getLetter(title),
            duration: t.duration,
        };
    });

    rows.sort((a, b) =>
        a.title.localeCompare(b.title, "pt-BR", { sensitivity: "base" })
    );

    return rows;
}

function buildSections(rows: TrackRow[]): TrackSection[] {
    const map = new Map<string, TrackRow[]>();

    for (const r of rows) {
        const key = r.letter;
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push(r);
    }

    const sections: TrackSection[] = [];
    for (const l of LETTERS) {
        const data = map.get(l);
        if (data && data.length) sections.push({ title: l, data });
    }

    return sections;
}

export function useTracksVM() {
    const [state, setState] = useState<LoadState>("idle");
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const [tracks, setTracks] = useState<Track[]>([]);
    const [query, setQuery] = useState("");

    const [refreshing, setRefreshing] = useState(false);
    const [syncing, setSyncing] = useState(false);

    const lastSyncAtRef = useRef<number>(0);
    const isMountedRef = useRef(true);

    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const loadFromCache = useCallback(async () => {
        await initDb();
        const cached = await loadCachedTracks();

        if (!isMountedRef.current) return;

        if (cached.length > 0) {
            setTracks(cached);
            setState("ready");
        }
    }, []);

    const syncFromDevice = useCallback(
        async (force = false) => {
            const elapsed = Date.now() - lastSyncAtRef.current;
            if (!force && elapsed < 15000) return;

            if (tracks.length === 0) setState("loading");

            setErrorMsg(null);
            setSyncing(true);

            try {
                const perm = await ensureAudioLibraryPermission();

                if (!perm?.granted) {
                    if (!isMountedRef.current) return;
                    setState((prev) => (tracks.length ? "ready" : "denied"));
                    return;
                }

                const all = await getAllTracks({ pageSize: 250, max: 20000 });

                if (!isMountedRef.current) return;
                setTracks(all);

                await initDb();
                await upsertTracks(all);

                lastSyncAtRef.current = Date.now();
                if (!isMountedRef.current) return;
                setState("ready");
            } catch (e: any) {
                if (!isMountedRef.current) return;
                setErrorMsg(e?.message ?? "Falha ao carregar as faixas.");
                setState((prev) => (tracks.length ? "ready" : "error"));
            } finally {
                if (isMountedRef.current) setSyncing(false);
            }
        },
        [tracks.length]
    );

    const reload = useCallback(async () => {
        await syncFromDevice(true);
    }, [syncFromDevice]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await syncFromDevice(true);
        } finally {
            setRefreshing(false);
        }
    }, [syncFromDevice]);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                await loadFromCache();
                if (mounted) await syncFromDevice(false);
            } catch { }
        })();
        return () => {
            mounted = false;
        };
    }, [loadFromCache, syncFromDevice]);

    useEffect(() => {
        const sub = AppState.addEventListener("change", (next) => {
            if (next === "active") void syncFromDevice(false);
        });
        return () => sub.remove();
    }, [syncFromDevice]);

    useEffect(() => {
        const unsub = subscribeToMediaLibraryChanges(() => {
            void syncFromDevice(true);
        });
        return () => unsub();
    }, [syncFromDevice]);

    const rows = useMemo(() => buildRows(tracks), [tracks]);

    const filteredRows = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return rows;
        return rows.filter((r) => r.title.toLowerCase().includes(q));
    }, [rows, query]);

    const sections = useMemo(() => buildSections(filteredRows), [filteredRows]);

    const indexByLetter = useMemo(() => {
        const map: Record<string, number> = {};
        sections.forEach((s, i) => (map[s.title] = i));
        return map;
    }, [sections]);

    const openSettings = useCallback(() => Linking.openSettings(), []);

    return {
        state,
        errorMsg,
        refreshing,
        syncing,

        query,
        setQuery,

        tracksCount: tracks.length,
        sections,
        indexByLetter,
        letters: LETTERS,

        reload,
        onRefresh,
        openSettings,
    };
}