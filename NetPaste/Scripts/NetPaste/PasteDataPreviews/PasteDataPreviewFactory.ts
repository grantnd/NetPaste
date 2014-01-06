module NetPaste.PasteDataPreviews {
    export class PasteDataPreviewFactory {
        public static getPreview(pasteData: server.PasteData): PasteDataPreview {
            if (pasteData.Type === "text/plain") {
                return new TextPasteDataPreview();
            }
            else if (pasteData.Type === "image/png") {
                return new ImagePasteDataPreview()
            }
            else {
                throw new Error("Can't generate preview for passet paste data type: " + pasteData.Type);
            }
        }
    }
}