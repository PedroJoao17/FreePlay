import { migrateDb } from "./db";

let initPromise: Promise<void> | null = null;

export function initDb(): Promise<void> {
    if (!initPromise) initPromise = migrateDb();
    return initPromise;
}