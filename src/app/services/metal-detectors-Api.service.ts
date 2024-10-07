import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListMetalDetector} from "../models/metaldetector";

@Injectable({
  providedIn: 'root'
})
export class MetalDetectorApiService {
  private URL_API = 'https://md.debug.testcenter.kz/md/api/v1';

  constructor(private http: HttpClient) {}

  getMetalDetectors(): Observable<ListMetalDetector[]> {
   return this.http.get<ListMetalDetector[]>(`${this.URL_API}/list_metal_detectors`)
  }

  addMetalDetectors(metalDetectors: ListMetalDetector): Observable<ListMetalDetector> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<ListMetalDetector>(`${this.URL_API}/data/metal_detectors`,  JSON.stringify(metalDetectors), { headers })
  }
  updateMetalDetector(id: number, metalDetector: ListMetalDetector): Observable<ListMetalDetector> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put<ListMetalDetector>(`${this.URL_API}/data/update/${id}`, metalDetector, { headers })
  }

  deleteMetalDetectors(id:number): Observable<void> {
    return this.http.delete<void>(`${this.URL_API}/data/delete/${id}`);
  }

}

