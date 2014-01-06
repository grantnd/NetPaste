module NetPaste.Views {
    export class UsernameEntryModalView extends Backbone.View {

        private usernamePromise: JQueryDeferred<string>;

        constructor(options?) {
            super(options);

            this.setElement("#username-modal");

            this.delegateEvents({
                "click #username-save": "saveUsername",
                "keypress #username-input": "saveOnEnter"
            });

            this.usernamePromise = $.Deferred<void>();
        }
        
        private saveOnEnter(e: JQueryEventObject) {
            if (e.keyCode === 13) {
                this.saveUsername()
            }
        }

        private saveUsername() {
            this.model.set("Name", this.$("#username-input").val());

            if (this.model.isValid()) {
                this.model.save();
                this.usernamePromise.resolve();
                this.$el.modal("hide");
            }
            else {
                this.$("#username-error").html(this.model.validationError).show().delay(4000).fadeOut();
            }
        }

        public getUsername(): JQueryDeferred<void> {
            this.$el.modal({ backdrop: "static" });

            return this.usernamePromise;
        }
    }
}