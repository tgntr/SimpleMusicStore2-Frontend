import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommentView } from '../_models/comment-view';
import { NewComment } from '../_models/new-comment';
import { EditComment } from '../_models/edit-comment';


@Injectable({ providedIn: 'root' })
export class CommentService {
    constructor(private http: HttpClient){       
    }

    public getComments(recordId: number): Observable<CommentView[]>{
        return this.http.get<CommentView[]>(`${environment.url}/comments/all/${recordId}`);
    }

    public addComment(comment: NewComment): Observable<CommentView>{
        return this.http.post<CommentView>(`${environment.url}/comments/add`, comment);
    }

    public editComment(comment: EditComment): Observable<CommentView>{
            return this.http.post<CommentView>(`${environment.url}/comments/edit`, comment);
    }

    public deleteComment(id: number): Observable<any>{
            return this.http.delete(`${environment.url}/comments/delete/${id}`);
    }
}

