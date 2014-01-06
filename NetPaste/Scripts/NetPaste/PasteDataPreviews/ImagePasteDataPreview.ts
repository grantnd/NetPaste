module NetPaste.PasteDataPreviews {
    export class ImagePasteDataPreview implements PasteDataPreview {
        public render(pasteData: server.PasteData): Element {
            var data = atob(pasteData.Value);

            var byteNumbers = new Array(data.length);
            for (var i = 0; i < data.length; i++) {
                byteNumbers[i] = data.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            var blob = new Blob([byteArray], { type: pasteData.Type });

            var url = URL.createObjectURL(blob);
            var img = new Image();

            img.src = url;
            img.classList.add('img-thumbnail');
            img.classList.add('img-responsive');

            return img;
        }
    }
}