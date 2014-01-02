module NetPaste {
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

            this.appendPreview();

            return this;
        }

        private appendPreview() {

            var element = this.$("#pastePreview");

            var paste = this.model.toJSON();

            if (paste.Data.Type === "text/plain") {
                if (paste.Data.Value.indexOf("http") == 0) {
                    element.append('<a href="' + paste.Data.Value + '" target="_blank">' + paste.Data.Value + '</a>');
                }
                else {
                    element.append(_.escape(this.model.get("Data").Value));
                }
            }
            else if (paste.Data.Type === "image/png") {
                var data = atob(paste.Data.Value);

                var byteNumbers = new Array(data.length);
                for (var i = 0; i < data.length; i++) {
                    byteNumbers[i] = data.charCodeAt(i);
                }
                var byteArray = new Uint8Array(byteNumbers);
                var blob = new Blob([byteArray], { type: paste.Data.Type });

                var url = URL.createObjectURL(blob);
                var img = new Image();

                img.src = url;
                img.classList.add('img-thumbnail');
                img.classList.add('img-responsive');
                element.append(img);
            }
            else {
                element.append('Unknown type');
            }
        }
    }
}