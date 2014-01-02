module NetPaste {
    export class ReceivedPastesListView extends Backbone.View {

        constructor(options?) {
            super(options);

            this.setElement('#receivedPastesList');
        }

        render() {
            this.$el.empty();

            this.collection.forEach((element, index) => {
                this.$el.append(new ReceivedPasteView({ model: element }).render().$el);
            });

            return this;
        }
    }
}