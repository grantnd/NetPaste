module NetPaste.UsernameStores {
    export class LocalUsernameStore implements UsernameStore {

        private key: string = "username";
        
        public saveUsername(username: string) {
            window.localStorage.setItem(this.key, username);
        }

        public getUsername(): string {
            return window.localStorage.getItem(this.key);
        }
    }
}