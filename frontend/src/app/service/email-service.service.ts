import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class EmailService {

    constructor(private http:HttpClient){}
    private emailUrl = "http://localhost:8888/identity/send-mail";

    sendmail(to:string[], subject:string, text:string):Observable<any>{
        const params = new HttpParams()
        .set('to', to.toString())
        .set('subject', subject)
        .set('text', text)
        return this.http.get<any>(`${this.emailUrl}`,{params})
    }
}
