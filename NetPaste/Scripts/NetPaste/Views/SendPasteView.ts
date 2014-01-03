module NetPaste.Views {
    export class SendPasteView extends Backbone.View {

        private sendPasteRecipientsView: SendPasteRecipientsListView;

        constructor(options?) {
            super(options);

            this.setElement("#sendPanel");

            this.delegateEvents({
                "paste #pasteTarget": "sendPaste",
                "keypress #pasteTarget": "supressTyping"
            });

            this.collection = new Collections.SendPasteRecipients();
            this.collection.on("change:Selected", this.render, this);
            this.collection.on("add", this.render, this);
            this.collection.on("remove", this.render, this);

            this.sendPasteRecipientsView = new SendPasteRecipientsListView({ collection: this.collection });

            this.render();
        }
        
        public render()
        {
            this.$("#no-recipients").toggle(this.collection.length == 0);

            var selectedRecipients = this.collection.where({ Selected: true });
            this.$('#pasteTarget').toggle(selectedRecipients && selectedRecipients.length > 0);

            return this;
        }

        public addRecipient(recipient: server.UserProfile) {
            if (!this.collection.get(recipient.UserId)) {
                this.collection.add(new Models.SendPasteRecipient({
                    UserId: recipient.UserId,
                    HostAddress: recipient.HostAddress,
                    Name: recipient.Name,
                    Selected: false
                }));
            }
        }

        public removeRecipient(recipient: server.UserProfile) {
            this.collection.remove(this.collection.get(recipient.UserId));
        }

        private sendPaste(e: JQueryEventObject) {
            e.preventDefault();

            try
            {
                var originalEvent: any = e.originalEvent;
                var clipboardData = originalEvent.clipboardData;

                var recipients = this.getSelectedRecipientUserIds();

                if (recipients && recipients.length > 0) {
                    this.sendClipboardData(clipboardData, recipients);
                }
            }
            catch(err)
            {
                this.showError(err);
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
            var builder = PasteDataBuilders.PasteDataBuilderFactory.getBuilder(clipboardData);

            builder.buildData(clipboardData).then((value) => {
                var netPasteHubProxy = $.connection.netPasteHub;
                netPasteHubProxy.server.sendPaste(value, recipientUserIds)
                    .done(() => {
                        this.$('#send-success').show().delay(1500).fadeOut();
                    })
                    .fail((error) => {
                        this.showError(error);
                    });
            });
        }

        private supressTyping(e: JQueryEventObject) {
            e.preventDefault();
        }

        private showError(error) {
            this.$("#send-error").html(error).show().delay(4000).fadeOut();
        }
    }
}