import * as SQLite from "expo-sqlite";

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

export async function getDb(): Promise<SQLite.SQLiteDatabase> {
    if (!dbPromise) dbPromise = SQLite.openDatabaseAsync("freeplay.db");
    return dbPromise;
}

export async function migrateDb(): Promise<void> {
    const db = await getDb();

    // PRAGMAs
    await db.execAsync(`PRAGMA journal_mode=WAL;`);
    await db.execAsync(`PRAGMA foreign_keys=ON;`);

    // Cache de faixas
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tracks (
      id TEXT PRIMARY KEY NOT NULL,
      uri TEXT NOT NULL,
      filename TEXT NOT NULL,
      duration REAL NOT NULL,
      creation_time INTEGER,
      modification_time INTEGER,
      updated_at INTEGER NOT NULL
    );
  `);

    await db.execAsync(`
    CREATE INDEX IF NOT EXISTS idx_tracks_filename
    ON tracks(filename);
  `);

    // Estatísticas (base p/ “Mais tocadas” no futuro)
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS track_stats (
      track_id TEXT PRIMARY KEY NOT NULL,
      play_count INTEGER NOT NULL DEFAULT 0,
      last_played_at INTEGER,
      FOREIGN KEY(track_id) REFERENCES tracks(id) ON DELETE CASCADE
    );
  `);
}