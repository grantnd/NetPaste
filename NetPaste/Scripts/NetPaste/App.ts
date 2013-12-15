module NetPaste {
    export class App {

        private sendPasteView;
        private sendPasteController;
        private pasteStore;
        private receivedPastesView;
        private receivedPastesController;

        constructor() {
            this.sendPasteView = new SendPasteView();
            this.sendPasteController = new SendPasteController(this.sendPasteView);
            this.pasteStore = new PasteStores.LocalPasteStore();
            this.receivedPastesView = new ReceivedPastesView(this.pasteStore.getAllPastes());
            this.receivedPastesController = new ReceivedPastesController(this.pasteStore, this.receivedPastesView);

            this.setUpPasteHandler(this.sendPasteController);
            this.setUpDeletePastesHandler(this.receivedPastesController);
            this.initialiseSignalR(this.sendPasteController, this.receivedPastesController);
        }

        private setUpPasteHandler(sender: SendPasteController) {
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

        private initialiseSignalR(
            sendPasteController: SendPasteController,
            receivedPastesController: ReceivedPastesController)
        {
            var netPasteHubProxy = $.connection.netPasteHub;

            netPasteHubProxy.client.receivePaste = function (paste: server.Paste) {
                receivedPastesController.receivePaste(paste);
            }

            netPasteHubProxy.client.updateRecipients = function (recipients: Array<server.UserProfile>) {
                sendPasteController.updateRecipients(recipients);
            }

            $.connection.hub.start()
                .done(function () { console.log('Now connected, connection ID=' + $.connection.hub.id); })
                .fail(function () { console.log('Could not Connect!'); });
        }
    }
} 