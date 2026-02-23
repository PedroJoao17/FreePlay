import { getDb } from "@/core/db/db";
import type { Track } from "@/features/library/model/types";

export async function loadCachedTracks(): Promise<Track[]> {
    const db = await getDb();

    // getAllAsync já retorna array
    const rows = await db.getAllAsync<Track>(`
    SELECT
      id,
      uri,
      filename,
      duration,
      creation_time AS creationTime,
      modification_time AS modificationTime
    FROM tracks
    ORDER BY filename COLLATE NOCASE ASC;
  `);

    return rows ?? [];
}

export async function upsertTracks(tracks: Track[]): Promise<void> {
    const db = await getDb();
    const now = Date.now();

    await db.withTransactionAsync(async () => {
        const stmt = await db.prepareAsync(`
      INSERT INTO tracks (id, uri, filename, duration, creation_time, modification_time, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        uri=excluded.uri,
        filename=excluded.filename,
        duration=excluded.duration,
        creation_time=excluded.creation_time,
        modification_time=excluded.modification_time,
        updated_at=excluded.updated_at;
    `);

        try {
            for (const t of tracks) {
                await stmt.executeAsync([
                    t.id,
                    t.uri,
                    t.filename,
                    t.duration,
                    t.creationTime ?? null,
                    t.modificationTime ?? null,
                    now,
                ]);
            }
        } finally {
            await stmt.finalizeAsync();
        }
    });
}