import * as MediaLibrary from "expo-media-library";
import type { Track } from "../model/types";

export async function ensureAudioLibraryPermission(): Promise<MediaLibrary.PermissionResponse> {
    // Android 13+ (Android 16): pedir só áudio
    const current = await MediaLibrary.getPermissionsAsync(false, ["audio"]);
    if (current.granted) return current;

    return MediaLibrary.requestPermissionsAsync(false, ["audio"]);
}

export async function getLatestTracks(limit = 60): Promise<Track[]> {
    const page = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.audio,
        first: limit,
        sortBy: [[MediaLibrary.SortBy.creationTime, false]], // newest first
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
