import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private httpClient: HttpClient
  ) { }

  readlink(name: string): Observable<any> {
    return this.httpClient.get("https://firebasestorage.googleapis.com/v0/b/utnhandrug.appspot.com/o/" + name);
  }
}
