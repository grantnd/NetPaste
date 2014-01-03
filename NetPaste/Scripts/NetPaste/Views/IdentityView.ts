module NetPaste.Views {
    export class IdentityView extends Backbone.View {

        constructor(options?) {
            super(options);

            this.setElement("#username");

            this.model.on("change", this.render, this);

            this.render();
        }

        public render() {
            this.$(".label").html(this.model.get("Name"));

            return this;
        }
    }
}