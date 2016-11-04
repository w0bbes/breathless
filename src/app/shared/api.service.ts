import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Topic, Comment } from './types';
import { API_URL } from './settings';

@Injectable()
export class ApiService {

  public reddit$: Observable<Array<Topic>>;
  public comments: Comment[];
  public comment$: Comment[] = [];

  constructor(
    private http: Http
  ) {
    this.getTopics();
    this.checkStorage();
    this.setCommentsObservable();
    this._logFeed();
  }

  getTopics(): void {
    this.reddit$ = this.http.get(`${API_URL}breathless.json`)
        .map(response => response.json())

        // for now, slice the first two mod posts
        .map(json => json.data.children.slice(2))
        .map(children =>

            // map only the objects that we want
            children.map(topic => {

                let topicData = topic.data;

                // get the large preview, if it exists, else we'll keep the placeholder
                let large_image = 
                Object.keys(topicData.preview).length > 0 
                ? topicData.preview.images[0].source.url 
                : 'https://placeholdit.imgix.net/~text?txtsize=45&txt=480%C3%97360&w=480&h=360';

                // destructure
                let { id, author, title, thumbnail } = topicData;

                // return a new topic instance
                return new Topic(id, title, thumbnail, large_image, author, false);

            })
        );
    }

    checkStorage(): void {
        // if there are existing comments, set them
        if (localStorage.getItem('comments')) {

            let localComments = localStorage.getItem('comments');

            if (localComments.length > 0) {
                this.comments = JSON.parse(localStorage.getItem('comments'));
            }

        } else {
            // else, create a new localstorage item
            this.setStorage();
        }
    }

    getStorage(): any {
        return JSON.parse(localStorage.getItem('comments'));
    }

    setStorage(): void {
        localStorage.setItem('comments', JSON.stringify(this.comment$));
    }

    setCommentsObservable(): void {
        
        Observable.from(this.comments)
        
        .subscribe(comments => {
            this.comment$.push(comments);
        });

    }

    getCommentsForTopic(topic_id): any {
        
        return this.comment$.filter(comment => comment.topic_id === topic_id);
        // return topicComments;
    }

    addComment(comment: Comment): void {
        this.comment$.push(comment);
        this.setStorage();
    }

    private _logFeed() {
        this.reddit$.subscribe(data => console.debug('data', data));
    }
}
