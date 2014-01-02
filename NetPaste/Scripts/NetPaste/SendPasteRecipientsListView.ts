module NetPaste {
    export class SendPasteRecipientsListView extends Backbone.View {
        collection: NetPaste.Collections.SendPasteRecipients;

        constructor(options?) {
            super(options);

            this.setElement("#recipients-list");

            this.collection.on("add", this.render, this);
            this.collection.on("remove", this.render, this);
        }
        
        render() {
            this.$el.empty();

            this.collection.forEach((element, index) => {
                this.$el.append(new SendPasteRecipientView({ model: element }).render().$el);
            });

            return this;
        }
    }
}