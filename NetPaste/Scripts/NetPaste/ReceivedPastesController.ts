module NetPaste {
    export class ReceivedPastesController {

        constructor(
            private pasteStore: PasteStores.PasteStore,
            private receivedPasteView: ReceivedPastesView)
        {
            this.setUpDeletePastesHandler();
        }

        private setUpDeletePastesHandler() {
            var receivedPastesController = this;
            $('#deletePastes').click(function (e) {
                e.preventDefault();
                receivedPastesController.deleteAllPastes();
            });
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