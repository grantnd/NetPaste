module NetPaste
{
    export class SendPasteController
    {
        constructor(private sendPasteView: SendPasteView) {
            this.setUpPasteHandler();
        }

        private setUpPasteHandler() {
            var sendPasteController = this;
            $('#pasteHole').on("paste", function (e) {
                e.preventDefault();
                sendPasteController.handlePasteEvent(e);
            });
        }

        public updateRecipients(recipients: Array<server.UserProfile>) {
            this.sendPasteView.updateRecipients(recipients);
        }

        public handlePasteEvent(e)
        {
            var originalEvent: any = e.originalEvent;
            var clipboardData = originalEvent.clipboardData;

            var recipients = this.sendPasteView.getSelectedRecipientUserIds();

            if (recipients && recipients.length > 0) {
                this.sendClipboardData(clipboardData, recipients);
            }
        }

        private sendClipboardData(clipboardData, recipientUserIds: Array<string>) {
            var builder = PasteDataBuilderFactory.GetBuilder(clipboardData);
            builder.BuildData(clipboardData).then(function (value) {
                var netPasteHubProxy = $.connection.netPasteHub;
                netPasteHubProxy.server.sendPaste(value, recipientUserIds)
            });
        }

        private buildPasteData(type: string, value: string): server.PasteData {
            return {
                Type: type,
                Value: value
            };
        }
    }
}