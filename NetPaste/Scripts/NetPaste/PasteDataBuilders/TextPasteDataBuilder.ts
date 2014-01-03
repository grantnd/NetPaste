module NetPaste.PasteDataBuilders {
    export class TextPasteDataBuilder implements PasteDataBuilder  {
        public buildData(clipboardData: any): JQueryGenericPromise<server.PasteData> {
            var promise = $.Deferred<server.PasteData>();
            var type = "text/plain";
            promise.resolve({ Type: type, Value: clipboardData.getData(type) });
            return promise;
        }
    }
}