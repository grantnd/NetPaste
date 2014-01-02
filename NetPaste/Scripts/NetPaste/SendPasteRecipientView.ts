module NetPaste {

    export class SendPasteRecipientView extends Backbone.View {

        model: Models.SendPasteRecipient;

        constructor(options?) {
            this.tagName = "div";
            this.className = "checkbox";
            super(options);
            this.delegateEvents({ "click input:checkbox": "clicked" });
        }

        clicked(e: JQueryEventObject) {            
            this.model.set("Selected", this.$('input:checkbox').is(":checked"));
        }

        render() {
            this.$el.append((Handlebars.templates.SendPasteRecipientView(this.model.toJSON())));

            return this;
        }
    }
}