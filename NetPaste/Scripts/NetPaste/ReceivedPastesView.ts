module NetPaste {
    export class ReceivedPastesView extends Backbone.View {

        private listView: ReceivedPastesListView;

        constructor(options?) {
            super(options);

            this.setElement('#receivedPanel');

            this.delegateEvents({ "click #deletePastes": "deleteAllPastes" })

            this.collection = new Collections.ReceivedPastes();

            this.collection.on("add", this.render, this);
            this.collection.on("remove", this.render, this);
            this.collection.on("reset", this.render, this);

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