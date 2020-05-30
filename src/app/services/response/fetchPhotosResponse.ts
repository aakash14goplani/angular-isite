export interface PhotosDataFormat {
    title?: string;
    description?: string;
    date: string;
    url: string;
    location?: string
}

export interface FetchPhotosResponse {
    message: string,
    content: PhotosDataFormat[]
}