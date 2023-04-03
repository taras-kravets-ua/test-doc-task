import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Document } from "../../pages/viewer/interface/anotration.interface";

@Injectable({ providedIn: "root" })
export class DocumentService {
  apiUrl = `${environment.baseUrl}/document`;
  constructor(private http: HttpClient) { }

  getOne(id: number): Observable<Document> {
    return this.http.get<Document>(`${this.apiUrl}/${id}`);
  }
}
