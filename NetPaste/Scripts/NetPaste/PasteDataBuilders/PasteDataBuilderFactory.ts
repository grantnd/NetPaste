module NetPaste.PasteDataBuilders {
    export class PasteDataBuilderFactory {
        public static getBuilder(clipboardData: any): PasteDataBuilder {
            if (clipboardData.types[0] === "Files") {
                return new ImagePasteDataBuilder();
            }
            else {
                return new TextPasteDataBuilder();
            }
        }
    }
}