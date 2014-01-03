module NetPaste.Collections {
    export class SendPasteRecipients extends Backbone.Collection {

        model: Models.SendPasteRecipient;

        constructor(options?) {
            super(options);
        }

        public comparator(recipient: Models.SendPasteRecipient) {
            return recipient.get("Name").toLowerCase();
        }
    }
}