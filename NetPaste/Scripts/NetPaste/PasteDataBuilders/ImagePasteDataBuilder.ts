module NetPaste.PasteDataBuilders {
    export class ImagePasteDataBuilder implements PasteDataBuilder {
        public buildData(clipboardData: any): JQueryGenericPromise<server.PasteData> {
            var blob = clipboardData.items[0].getAsFile(clipboardData.items[0].type);

            var promise = $.Deferred<server.PasteData>();

            var reader = new FileReader();
            var _this = this;

            reader.addEventListener("loadend", () => {
                promise.resolve({ Type: "image/png", Value: reader.result.split(',')[1] });
            });
            
            reader.readAsDataURL(blob);

            return promise;
        }
    }
}