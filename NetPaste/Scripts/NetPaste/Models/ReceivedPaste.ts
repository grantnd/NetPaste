module NetPaste.Models {
    export class ReceivedPaste extends Backbone.Model {
        Id: number;
        Data: server.PasteData;
        Sender: server.UserProfile;
        Received: Date;
    }
}