import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Comment } from './types';

@Injectable()
export class CommentsService {

    public _comments$: Subject<Comment[]>;

    private dataStore: {
        comments: Comment[]
    };

    constructor(
        
    ) {
        this.dataStore = { comments: [] };
        this._comments$ = <Subject<Comment[]>> new Subject();
        this.getComments();
    }

    get comments$() {
        return this._comments$.asObservable();
    }

    getComments() {

        this.dataStore.comments = this.getLocalStorage();
        this._comments$.next(this.dataStore.comments);

    }

    getComment(topic_id: string) {
        let storage = this.getLocalStorage();
        let item = this.dataStore.comments.filter(comment => comment.topic_id === topic_id);

        this._comments$.next(item);
    }

    getLocalStorage() {

        let localComments = localStorage.getItem('comments');

        if (localComments) {
            console.log('exist', JSON.parse(localComments));
            return JSON.parse(localComments);
        }

        let newComments: Comment[] = [];

        localStorage.setItem('comments', JSON.stringify(newComments));

        console.log('comments local', JSON.parse(localStorage.getItem('comments')))

        return JSON.parse(localStorage.getItem('comments'));
    }

    /*
    get comments() { 
        return localStorage.getItem('comments'); 
    }
    */

}