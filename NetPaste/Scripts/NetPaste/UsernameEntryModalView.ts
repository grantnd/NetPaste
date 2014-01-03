module NetPaste {
    export class UsernameEntryModalView extends Backbone.View {

        private usernamePromise: JQueryDeferred<string>;

        constructor(options?) {
            super(options);

            this.setElement("#username-modal");

            this.delegateEvents({ "click #username-save": "saveUsername" });

            this.usernamePromise = $.Deferred<void>();
        }

        public getUsername(): JQueryDeferred<void> {
            this.$el.modal({ backdrop: "static" });
            return this.usernamePromise;
        }

        private saveUsername(e: JQueryEventObject) {
            this.model.set("Name", this.$("#username-input").val(), { validate: true });

            if (this.model.isValid()) {
                this.model.save();
                this.usernamePromise.resolve();
                this.$el.modal("hide");
            }
        }
    }
}