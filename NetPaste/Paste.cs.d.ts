declare module server {

	interface Paste{
		Id?: number;
        Data: PasteData;
        Sender: UserProfile;
		Received: Date;
}
}
