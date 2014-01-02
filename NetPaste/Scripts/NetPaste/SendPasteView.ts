module NetPaste {
    export class SendPasteView extends Backbone.View {

        private sendPasteRecipientsView: SendPasteRecipientsListView;

        constructor(options?) {
            super(options);

            this.setElement("#sendPanel");

            this.delegateEvents({
                "paste #pasteHole": "sendPaste",
                "keypress #pasteHole": "supressTyping"
            });

            this.collection = new Collections.SendPasteRecipients();
            this.collection.on("change:Selected", this.selectionChanged, this);

            this.sendPasteRecipientsView = new SendPasteRecipientsListView({ collection: this.collection });
        }
        
        public updateRecipients(recipients: Array<server.UserProfile>) {
            this.collection.reset();

            for (var i = 0; i < recipients.length; i++) {
                this.collection.add(new Models.SendPasteRecipient({
                    UserId: recipients[i].UserId,
                    HostAddress: recipients[i].HostAddress,
                    Name: recipients[i].Name,
                    Selected: false
                }));
            }
        }
              
        private sendPaste(e: JQueryEventObject) {
            e.preventDefault();

            var originalEvent: any = e.originalEvent;
            var clipboardData = originalEvent.clipboardData;

            var recipients = this.getSelectedRecipientUserIds();

            if (recipients && recipients.length > 0) {
                this.sendClipboardData(clipboardData, recipients);
            }
        }
        
        private getSelectedRecipientUserIds(): Array<string> {
            var userIds: Array<string> = [];

            this.collection.forEach((recipient: Models.SendPasteRecipient) => {
                if (recipient.get('Selected')) {
                    userIds.push(recipient.get('UserId'));
                }
            });

            return userIds;
        }

        private sendClipboardData(clipboardData, recipientUserIds: Array<string>) {
            var builder = PasteDataBuilderFactory.GetBuilder(clipboardData);

            builder.BuildData(clipboardData).then((value) => {
                var netPasteHubProxy = $.connection.netPasteHub;
                netPasteHubProxy.server.sendPaste(value, recipientUserIds)
            });
        }

        private supressTyping(e: JQueryEventObject) {
            e.preventDefault();
        }

        private selectionChanged() {
            var selectedRecipients = this.collection.where({ Selected: true });
            this.$('#pasteHole').toggle(selectedRecipients && selectedRecipients.length > 0);
        }
    }
}