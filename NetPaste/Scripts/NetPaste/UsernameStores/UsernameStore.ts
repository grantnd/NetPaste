module NetPaste.UsernameStores {
    export interface UsernameStore {
        saveUsername(username: string);
        getUsername(): string;
    }
}