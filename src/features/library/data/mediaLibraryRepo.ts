import * as MediaLibrary from "expo-media-library";
import type { Track } from "../model/types";

type GetAllTracksOpts = {
    pageSize?: number;
    max?: number;
};

export async function ensureAudioLibraryPermission(): Promise<MediaLibrary.PermissionResponse> {
    try {
        const current = await MediaLibrary.getPermissionsAsync(false, ["audio"]);
        if (current.granted) return current;
        return await MediaLibrary.requestPermissionsAsync(false, ["audio"]);
    } catch {
        const current = await MediaLibrary.getPermissionsAsync();
        if (current.granted) return current;
        return await MediaLibrary.requestPermissionsAsync();
    }
}

export async function getLatestTracks(limit = 60): Promise<Track[]> {
    const page = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.audio,
        first: limit,
        sortBy: [[MediaLibrary.SortBy.creationTime, false]],
    });

    return page.assets.map((a) => ({
        id: a.id,
        uri: a.uri,
        filename: a.filename ?? "unknown",
        duration: a.duration ?? 0,
        creationTime: a.creationTime,
        modificationTime: a.modificationTime,
    }));
}

export async function getAllTracks(opts: GetAllTracksOpts = {}): Promise<Track[]> {
    const pageSize = opts.pageSize ?? 250;
    const max = opts.max ?? 20000;

    const result: Track[] = [];
    let after: string | undefined;

    while (result.length < max) {
        const page = await MediaLibrary.getAssetsAsync({
            mediaType: MediaLibrary.MediaType.audio,
            first: pageSize,
            after,
        });

        for (const a of page.assets) {
            result.push({
                id: a.id,
                uri: a.uri,
                filename: a.filename ?? "unknown",
                duration: a.duration ?? 0,
                creationTime: a.creationTime,
                modificationTime: a.modificationTime,
            });
        }

        if (!page.hasNextPage || page.assets.length === 0) break;
        after = page.endCursor ?? page.assets[page.assets.length - 1]?.id;
    }

    return result;
}

export function subscribeToMediaLibraryChanges(onChange: () => void): () => void {
    const anyML = MediaLibrary as any;
    const addListener = anyML?.addListener;

    if (typeof addListener !== "function") return () => { };

    const sub = addListener(() => onChange());
    return () => sub?.remove?.();
}