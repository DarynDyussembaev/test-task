import {inject, Injectable} from '@angular/core';
import {MetalDetectorDirectory} from "../models/metaldetector";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MetalDetectorDirectoryService {
  private URL_API = 'https://md.debug.testcenter.kz/md/api/v1';
  private http: HttpClient = inject(HttpClient);

  getTypesMetalDetectors(language:string): Observable<MetalDetectorDirectory[]> {
    const headers = new HttpHeaders({
      'Accept-Language': language
    });
    return this.http.get<MetalDetectorDirectory[]>(`${this.URL_API}/ref/types_metal_detectors`,{headers});
  }

  getCountriesManufacture(language:string): Observable<MetalDetectorDirectory[]> {
    const headers = new HttpHeaders({
      'Accept-Language': language
    });
    return this.http.get<MetalDetectorDirectory[]>(`${this.URL_API}/ref/country_manufacture`,{headers});
  }

  getAvailabilityStatuses(language:string): Observable<MetalDetectorDirectory[]> {
    const headers = new HttpHeaders({
      'Accept-Language': language
    });
    return this.http.get<MetalDetectorDirectory[]>(`${this.URL_API}/ref/availability`,{headers});
  }
}
