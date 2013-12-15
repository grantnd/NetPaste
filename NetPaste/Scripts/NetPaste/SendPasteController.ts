module NetPaste
{
    export class SendPasteController
    {
        private clipboardData: Storage;
        private sendPasteView: SendPasteView;

        constructor(sendPasteView: SendPasteView) {
            this.sendPasteView = sendPasteView;
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
            if (clipboardData.types[0] === "Files") {
                var blob = clipboardData.items[0].getAsFile(clipboardData.items[0].type);

                var reader = new FileReader();
                var _this = this;
                reader.addEventListener("loadend", function () {
                    _this.sendPasteData(_this.buildPasteData("image/png", reader.result.split(',')[1]), recipientUserIds);
                });
                reader.readAsDataURL(blob);
            }
            else {
                var type = "text/plain";
                this.sendPasteData(this.buildPasteData(type, clipboardData.getData(type)), recipientUserIds);
            }
        }

        private buildPasteData(type: string, value: string): server.PasteData {
            return {
                Type: type,
                Value: value
            };
        }

        private sendPasteData(pasteData: server.PasteData, recipientUserIds: Array<string>) {
            var netPasteHubProxy = $.connection.netPasteHub;
            netPasteHubProxy.server.sendPaste(pasteData, recipientUserIds);
        }
    }
}