module NetPaste.Collections {
    export class ReceivedPastes extends Backbone.Collection {

        model: Models.ReceivedPaste;

        constructor(options?) {
            super(options);
            this.localStorage = new Backbone.LocalStorage("ReceivedPastes");
        }

        public comparator(paste: Models.ReceivedPaste, paste2?: Models.ReceivedPaste) {
            return paste.get("Received") > paste2.get("Received") ? -1 : 1;
        }
    }
}