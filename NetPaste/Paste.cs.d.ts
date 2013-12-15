declare module server {

	interface Paste{
		Id?: number;
        Data: PasteData;
		Sender: string;
		Received: Date;
    }
}
