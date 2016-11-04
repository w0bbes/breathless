import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Comment } from './types';

@Injectable()
export class CommentsService {

    private _comments$: Subject<Comment[]>;
    private baseUrl: string;

    private dataStore: {
        comments: Comment[]
    };

    constructor(
        private http: Http
    ) {
        this.dataStore = { comments: [] };
        this._comments$ = <Subject<Comment[]>> new Subject();
        this.baseUrl = 'http://581c951028a03411009e590b.mockapi.io/api';
    }

    get comments$() {
        return this._comments$.asObservable();
    }

    getComments() {
        
        this.http.get(`${this.baseUrl}/comments`)
            .map(response => response.json())
            .subscribe(data => {
                this.dataStore.comments = data;
                this._comments$.next(this.dataStore.comments)
            });
    }

    addComment(comment: Comment) {
        this.http.post(`${this.baseUrl}/comments`, comment)
            .map(response => response.json())
            .subscribe(data => {
                this.dataStore.comments.push(data);
                this._comments$.next(this.dataStore.comments);
            });
    }

    removeComment(comment: Comment) {
        this.http.delete(`${this.baseUrl}/comments/${comment.id}`)
            .subscribe(response => {
                let itemIndex = this.dataStore.comments.indexOf(comment);
                this.dataStore.comments.splice(itemIndex, 1);

                this._comments$.next(this.dataStore.comments);
            });
    }
}
