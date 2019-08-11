import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONSTANTS } from '../constants/app-constants';
import { FileModel } from '../models/file.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {


  restAPI: string = API_CONSTANTS.REST_API;

  options: any = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(
    private httpClientService: HttpService,
  ) {  }

  getFileListData(): Observable<FileModel> {
    return this.httpClientService.get(`${this.restAPI}file-list`, this.options);
  }

  getFileDataById(id: number): Observable<FileModel> {
    return this.httpClientService.get(`${this.restAPI}file/${id}`, this.options);
  }

  createFileData(body: FileModel): Observable<FileModel> {
    return this.httpClientService.post(`${this.restAPI}file`, body, this.options);
  }

  updateFileData(body: FileModel): Observable<FileModel> {
    return this.httpClientService.put(`${this.restAPI}file`, body, this.options);
  }

  deleteFileData(id: number): Observable<FileModel> {
    return this.httpClientService.delete(`${this.restAPI}file/${id}`, this.options);
  }

}
