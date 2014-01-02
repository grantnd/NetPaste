module NetPaste.Models {
    export class SendPasteRecipient extends Backbone.Model {
        UserId: String;
        HostAddress: String;
        Name: String;
        Selected: boolean;
    }
}