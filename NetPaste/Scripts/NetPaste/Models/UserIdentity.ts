module NetPaste.Models {
    export class UserIdentity extends Backbone.Model {
        Name: string;

        constructor(options?) {
            super(options);
            this.localStorage = new Backbone.LocalStorage("UserIdentity");
        }

        public validate(attrs, options?) {
            if (!attrs.Name || attrs.Name === "") {
                return "Username cannot be empty";
            } else if (attrs.Name.length > 10) {
                return "Username cannot be more than ten characters";
            }
        }
    }
}