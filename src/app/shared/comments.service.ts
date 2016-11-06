import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Subject } from 'rxjs/Subject';

import { Comment } from './types';

import { MOCK_API } from './settings';

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
        // fill the datastore so we have persistant data
        this.dataStore = { comments: [] };

        // subject observable
        this._comments$ = <Subject<Comment[]>> new Subject();
        this.baseUrl = MOCK_API;
    }

    get comments$() {
        return this._comments$.asObservable();
    }

    getComments() {

        this.http.get(`${this.baseUrl}/comments`)
            .map(response => response.json())
            .subscribe(data => {
                this.dataStore.comments = data;
                this._comments$.next(this.dataStore.comments);
            });
    }

    addComment(comment: Comment) {
        this.http.post(`${this.baseUrl}/comments`, comment)
            .map(response => response.json())
            .subscribe(data => {
                this.dataStore.comments.unshift(data);
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
