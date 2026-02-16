export type Track = {
    id: string;
    uri: string;
    filename: string;
    duration: number; // segundos
    creationTime?: number; // epoch seconds (conforme platform)
    modificationTime?: number;
};
