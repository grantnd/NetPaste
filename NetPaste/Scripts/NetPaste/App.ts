module NetPaste {

    export class App {

        private sendPasteView;
        private receivedPastesView;

        constructor() {
            this.sendPasteView = new SendPasteView();
            this.receivedPastesView = new ReceivedPastesView();

            this.initialiseSignalR(this.sendPasteView, this.receivedPastesView);
        }

        private initialiseSignalR(
            sendPasteView: SendPasteView,
            receivedPastesView: ReceivedPastesView)
        {
            var netPasteHubProxy = $.connection.netPasteHub;

            netPasteHubProxy.client.receivePaste = (paste: Models.ReceivedPaste) => {
                receivedPastesView.receivePaste(paste);
            }

            netPasteHubProxy.client.updateRecipients = (recipients: Array<server.UserProfile>) => {
                sendPasteView.updateRecipients(recipients);
            }

            $.connection.hub.start()
                .done(() =>
                {
                    console.log('Now connected, connection ID=' + $.connection.hub.id);
                    //$.connection.netPasteHub.server.getRecipients().done(function (recipients: Array<server.UserProfile>) {
                    //    sendPasteController.updateRecipients(recipients);
                    //});
                })
                .fail(() => { console.log('Could not Connect!'); });
        }
    }

    $(() => {
        var app = new NetPaste.App();
    });
}