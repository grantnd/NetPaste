module NetPaste {
    export class ReceivedPastesController {

        constructor(
            private pasteStore: PasteStores.PasteStore,
            private receivedPasteView: ReceivedPastesView) {
        }

        public receivePaste(paste: server.Paste) {
            this.pasteStore.addPaste(paste);
            this.receivedPasteView.addPaste(paste);
        }

        public deleteAllPastes() {
            this.pasteStore.deleteAllPastes();
            this.receivedPasteView.deleteAllPastes();
        }
    }
}