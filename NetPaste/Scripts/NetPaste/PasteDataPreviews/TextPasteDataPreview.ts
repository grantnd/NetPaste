module NetPaste.PasteDataPreviews {
    export class TextPasteDataPreview implements PasteDataPreview {
        public render(pasteData: server.PasteData): Element {
            if (pasteData.Value.indexOf("http") == 0) {
                return $('<a href="' + pasteData.Value + '" target="_blank">' + pasteData.Value + '</a>').get();
            }
            else {
                return $("<span>").text(_.escape(pasteData.Value)).get();
            }
        }
    }
}