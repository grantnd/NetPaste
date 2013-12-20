module NetPaste {
    export interface PasteDataBuilder {
        BuildData(clipboardData: any): JQueryGenericPromise<server.PasteData>;
    }
}