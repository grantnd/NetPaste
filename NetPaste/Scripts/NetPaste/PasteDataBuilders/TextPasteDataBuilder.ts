module NetPaste {
    export class TextPasteDataBuilder implements PasteDataBuilder  {
        public BuildData(clipboardData: any): JQueryGenericPromise<server.PasteData> {
            var promise = $.Deferred<server.PasteData>();
            var type = "text/plain";
            promise.resolve({ Type: type, Value: clipboardData.getData(type) });
            return promise;
        }
    }
}