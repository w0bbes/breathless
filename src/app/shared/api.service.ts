import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Topic } from './types';
import { API_URL } from './settings';

@Injectable()
export class ApiService {

  public reddit$: Observable<Array<Topic>>;

  constructor(
    private http: Http
  ) {
    this.getTopics();
  }

  getTopics() {
    this.reddit$ = this.http.get(`${API_URL}breathless.json`)
      .map(response => response.json())
      .map(json => <Array<any>>json.data.children)
      .map(children => 
        children.map(topic => {

          let topicData = topic.data;

          // destructure
          let { author, title, thumbnail } = topicData;

          // some images from the mods are a string 'self'
          // replace it with a placeholder so we at least show something
          if (thumbnail === 'self') {
            thumbnail = 'https://placeholdit.imgix.net/~text?txtsize=15&txt=140%C3%9793&w=140&h=93';
          }

          return new Topic(title, thumbnail, author, false);

        })
      );
  }
}
