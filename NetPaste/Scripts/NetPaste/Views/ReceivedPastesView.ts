module NetPaste.Views {
    export class ReceivedPastesView extends Backbone.View {

        private listView: ReceivedPastesListView;

        constructor(options?) {
            super(options);

            this.setElement('#receivedPanel');

            this.delegateEvents({ "click #deletePastes": "deleteAllPastes" })

            this.collection = new Collections.ReceivedPastes();

            this.collection.on("add remove reset", this.render, this);

            this.listView = new ReceivedPastesListView({ collection: this.collection });

            this.collection.fetch();
        }

        render() {
            this.$('#deletePastes').toggle(this.collection.length > 0);
            this.listView.render();

            return this;
        }

        public receivePaste(paste: Models.ReceivedPaste) {
            this.collection.create(paste);
        }

        public deleteAllPastes() {
            this.collection.reset();
        }
    }
}