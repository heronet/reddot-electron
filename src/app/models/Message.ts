export interface Message {
    _id: string;
    text: string;
    sender: {
        _id: string,
        username: string
    };
    recipient: {
        _id: string,
        username: string
    };
    createdAt: Date;
}