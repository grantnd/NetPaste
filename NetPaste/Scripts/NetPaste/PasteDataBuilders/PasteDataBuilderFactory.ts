module NetPaste {
    export class PasteDataBuilderFactory {
        public static GetBuilder(clipboardData: any): PasteDataBuilder {
            if (clipboardData.types[0] === "Files") {
                return new ImagePasteDataBuilder();
            }
            else {
                return new TextPasteDataBuilder();
            }
        }
    }
}