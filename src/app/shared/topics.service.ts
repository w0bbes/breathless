import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Topic, Comment } from './types';
import { API_URL } from './settings';

@Injectable()
export class TopicsService {

  public reddit$: Observable<Array<Topic>>;

  constructor(
    private http: Http
  ) {
    this.getTopics();
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

}
