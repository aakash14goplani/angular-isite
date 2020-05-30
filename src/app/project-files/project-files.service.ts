import { FetchFileResponse } from './../services/response/fetchFilesResponse';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IsiteHttp } from '../api-config';

@Injectable()
export class ProjectFilesService {

	constructor(private httpClient: HttpClient) { }

	private projectFileDataStore : Map<String, FetchFileResponse[]> = new Map<String, FetchFileResponse[]>();

	public getProjectStoreData() : Map<String, FetchFileResponse[]> {
		return this.projectFileDataStore;
	}

	public addProjectStoreData(fileData: FetchFileResponse): void {
		let tempFiles = this.projectFileDataStore.get(fileData.parent_id);
		if(!tempFiles) {
			tempFiles = [];
		}
		tempFiles.push(fileData);
		this.projectFileDataStore.set(fileData.parent_id, tempFiles);
	}

	public removeProjectStoreData(fileData: FetchFileResponse): void {
		let tempFiles: FetchFileResponse[] = this.projectFileDataStore.get(fileData.parent_id);
		if(tempFiles) {
			for(let index=tempFiles.length-1; index>=0; index--) {
				if(tempFiles[index].parent_id == fileData.parent_id && tempFiles[index].file_name == fileData.file_name) {
					tempFiles.splice(index, 1);
					break;
				}
			}
		}
		this.projectFileDataStore.set(fileData.parent_id, tempFiles);
	}

	public setProjectDataStore(fileData: Map<String, FetchFileResponse[]>): void {
		this.projectFileDataStore = fileData;
	}

	public fetchFiles() : Observable<Object> {
		return this.httpClient.get(IsiteHttp.concat('fetchfiles'));
	}

	public getProcessedFileDataStore(fileData: FetchFileResponse[]): Map<String, FetchFileResponse[]> {
		let fileMap = new Map<String, FetchFileResponse[]>();
		fileData.forEach((file, index) => {
			let tempFiles = fileMap.get(file.parent_id);
			if(!tempFiles) {
				tempFiles = [];
			}
			tempFiles.push(file);
			fileMap.set(file.parent_id, tempFiles);
		});
		return fileMap;
	}
	/* logic to upload files
			this.projectFilesService.....
		*/
	public uploadFiles(formData: any): Observable<Object> {
		return this.httpClient.post(IsiteHttp.concat('upload'), formData);
	}

	public deleteFile(fileUrl: string): Observable<Object> {
		return this.httpClient.get(fileUrl);
	}
}
