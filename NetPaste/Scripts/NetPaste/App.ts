module NetPaste {

    export class App {

        private sendPasteView;
        private receivedPastesView;
        private identityView;

        constructor() {
            this.getUserIdentity().then((identity) => {
                this.identifyUser(identity).done(() => {
                    this.identityView = new IdentityView({ model: identity });
                    this.sendPasteView = new SendPasteView();
                    this.receivedPastesView = new ReceivedPastesView();

                    this.initialiseSignalR(this.sendPasteView, this.receivedPastesView);
                });
            });
        }

        private getUserIdentity() {
            var identity = new Models.UserIdentity({ id: "1" });
            identity.fetch();

            var identityPromise = $.Deferred<Models.UserIdentity>();

            if (!identity.get("Name")) {
                var modal = new UsernameEntryModalView({ model: identity });
                modal.getUsername().then(() => {
                    identityPromise.resolve(modal.model);
                });
            }
            else {
                identityPromise.resolve(identity);
            }

            return identityPromise;
        }

        private identifyUser(identity: Models.UserIdentity) {
            return $.post("api/identify/", identity.toJSON());
        }

        private initialiseSignalR(
            sendPasteView: SendPasteView,
            receivedPastesView: ReceivedPastesView)
        {
            var netPasteHubProxy = $.connection.netPasteHub;
            
            netPasteHubProxy.logging = true;
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