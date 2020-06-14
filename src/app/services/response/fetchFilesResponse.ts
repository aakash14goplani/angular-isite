export interface FileMap {
    message: string,
    content: FetchFileResponse[]
}

export interface FetchFileResponse {
    parent_id: string,
    parent_name: string,
    file_name: string,
    _id?: string
}