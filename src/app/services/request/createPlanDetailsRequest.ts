export interface PlanDetailsDataStore {
    name: string,
    location: string,
    date?: string,
    files?: FileDetails[],
    removeFile?: FileDetails
}

export interface FileDetails {
    fileName: string,
    url: string,
    parentName: string
}