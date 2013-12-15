module NetPaste.PasteStores {
    export interface PasteStore {

        addPaste(paste: server.Paste);

        getAllPastes(): server.Paste[];

        deleteAllPastes();

        getCount(): number;
    }
}