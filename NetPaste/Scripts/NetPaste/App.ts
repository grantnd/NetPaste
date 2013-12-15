module NetPaste {
    export class App {

        private sender;
        private pasteStore;
        private receivedPastesView;
        private receivedPastesController;

        constructor() {
            this.sender = new PasteDataSender();
            this.pasteStore = new PasteStores.LocalPasteStore();
            this.receivedPastesView = new ReceivedPastesView(this.pasteStore.getAllPastes());
            this.receivedPastesController = new ReceivedPastesController(this.pasteStore, this.receivedPastesView);

            this.setUpPasteHandler(this.sender);
            this.setUpDeletePastesHandler(this.receivedPastesController);
            this.initialiseSignalR(this.receivedPastesController);
        }

        private setUpPasteHandler(sender: PasteDataSender) {
            $('#pasteHole').on("paste", function (e) {
                e.preventDefault();
                sender.handlePasteEvent(e);
            });
        }

        private setUpDeletePastesHandler(receivedPastesController: ReceivedPastesController) {
            $('#deletePastes').click(function (e) {
                e.preventDefault();
                receivedPastesController.deleteAllPastes();
            });
        }

        private initialiseSignalR(receivedPastesController: ReceivedPastesController) {
            var netPasteHubProxy = $.connection.netPasteHub;
            netPasteHubProxy.client.receivePaste = function (paste: server.Paste) {
                receivedPastesController.receivePaste(paste);
            }

            $.connection.hub.start()
                .done(function () { console.log('Now connected, connection ID=' + $.connection.hub.id); })
                .fail(function () { console.log('Could not Connect!'); });
        }
    }
} 