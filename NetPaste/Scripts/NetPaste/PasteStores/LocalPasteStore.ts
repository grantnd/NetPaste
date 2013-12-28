module NetPaste.PasteStores {
    export class LocalPasteStore implements PasteStore {

        private key: string = "pastes";
        
        public addPaste(paste: server.Paste) {
            var pastes = this.getAllPastes();
            if (pastes == null) {
                pastes = [];
            }
            paste.Id = pastes.length;
            pastes.unshift(paste);
            this.saveAllPastes(pastes);
        }

        private saveAllPastes(pastes: Array<server.Paste>) {
            window.localStorage.setItem(this.key, JSON.stringify(pastes));
        }

        public getAllPastes(): Array<server.Paste> {
            var pastesAsString: string = window.localStorage.getItem(this.key);

            if (pastesAsString == null) {
                return null;
            }
            else {
                return JSON.parse(pastesAsString);
            }
        }

        public deleteAllPastes() {
            window.localStorage.removeItem(this.key);
        }

        public getCount(): number {
            var allPastes = this.getAllPastes();
            if (allPastes == null) {
                return 0;
            }
            else {
                return allPastes.length;
            }
        }
    }
}