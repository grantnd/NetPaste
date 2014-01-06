module NetPaste.Views {
    export class ReceivedPasteView extends Backbone.View {

        model: Models.ReceivedPaste;

        constructor(options?) {
            this.className = "panel panel-info";

            super(options)
            
            this.delegateEvents({
                "click #deleteButton": "deletePaste"
            });
        }

        private deletePaste(e: JQueryEventObject) {
            this.model.destroy();
        }
        
        public render() {
            this.$el.html(Handlebars.templates.ReceivedPasteView(this.model.toJSON()))

            this.renderPreview();

            return this;
        }

        private renderPreview() {

            var element = this.$("#paste-preview");
            var pasteData: server.PasteData = this.model.toJSON().Data;

            var pasteDataPreview = PasteDataPreviews.PasteDataPreviewFactory.getPreview(pasteData);

            element.append(pasteDataPreview.render(pasteData));
        }
    }
}