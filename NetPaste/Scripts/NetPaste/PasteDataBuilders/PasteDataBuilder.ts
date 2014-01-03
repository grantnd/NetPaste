module NetPaste.PasteDataBuilders {
    export interface PasteDataBuilder {
        buildData(clipboardData: any): JQueryGenericPromise<server.PasteData>;
    }
}