module NetPaste {

    export class App {

        private sendPasteView;
        private receivedPastesView;
        private identityView;

        constructor() {
            this.getUserIdentity().then((identity) => {
                this.identifyUser(identity).done(() => {
                    this.identityView = new Views.IdentityView({ model: identity });
                    this.sendPasteView = new Views.SendPasteView();
                    this.receivedPastesView = new Views.ReceivedPastesView();

                    this.initialiseSignalR(this.sendPasteView, this.receivedPastesView);
                });
            });
        }

        private getUserIdentity() {
            var identity = new Models.UserIdentity({ id: "1" });
            identity.fetch();

            var identityPromise = $.Deferred<Models.UserIdentity>();

            if (!identity.get("Name")) {
                var modal = new Views.UsernameEntryModalView({ model: identity });
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
            sendPasteView: Views.SendPasteView,
            receivedPastesView: Views.ReceivedPastesView)
        {
            var netPasteHubProxy = $.connection.netPasteHub;
            
            netPasteHubProxy.logging = true;
            netPasteHubProxy.client.receivePaste = (paste: Models.ReceivedPaste) => {
                receivedPastesView.receivePaste(paste);
            }

            netPasteHubProxy.client.recipientConnected = (recipient: server.UserProfile) => {
                sendPasteView.addRecipient(recipient);
            }

            netPasteHubProxy.client.recipientDisconnected = (recipient: server.UserProfile) => {
                sendPasteView.removeRecipient(recipient);
            }

            $.connection.hub.start()
                .done(() => {
                    netPasteHubProxy.server.getRecipients()
                        .done(function (recipients: Array<server.UserProfile>) {
                            for (var i = 0; i < recipients.length; i++) {
                                sendPasteView.addRecipient(recipients[i]);
                            }
                        });
                })
                .fail((error) => { console.log('Could not connect ' + error); });
        }
    }

    $(() => {
        var app = new NetPaste.App();
    });
}