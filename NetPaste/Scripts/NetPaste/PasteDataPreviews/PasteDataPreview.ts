module NetPaste.PasteDataPreviews {
    export interface PasteDataPreview {
        render(pasteData: server.PasteData): Element;
    }
}