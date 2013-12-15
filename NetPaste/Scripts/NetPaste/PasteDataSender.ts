module NetPaste
{
    export class PasteDataSender
    {
        public handlePasteEvent(e)
        {
            var originalEvent: any = e.originalEvent;
            var clipboardData = originalEvent.clipboardData;

            if (clipboardData.types[0] === "Files") {
                var blob = clipboardData.items[0].getAsFile(clipboardData.items[0].type);

                var reader = new FileReader();
                var _this = this;
                reader.addEventListener("loadend", function () {
                    _this.sendPasteData(_this.buildPasteData("image/png", reader.result.split(',')[1]));
                });
                reader.readAsDataURL(blob);
            }
            else {
                var type = "text/plain";
                this.sendPasteData(this.buildPasteData(type, clipboardData.getData(type)));
            }
        }

        private buildPasteData(type: string, value: string): server.PasteData {
            return {
                Type: type,
                Value: value
            };
        }

        private sendPasteData(pasteData: server.PasteData) {
            var netPasteHubProxy = $.connection.netPasteHub;
            netPasteHubProxy.server.sendPaste(pasteData, '');
        }
    }
}