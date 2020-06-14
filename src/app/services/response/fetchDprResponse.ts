export interface FetchDprResponse {
    message: string;
    content: Content[];
}

export interface Content {
    content: string[],
    date: string,
    _id?: string
}