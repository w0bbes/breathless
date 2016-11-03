import { Component, OnInit, Input } from '@angular/core';

import { ApiService } from '../shared/api.service';

import { Comment } from '../shared/types';

@Component({
    selector: 'my-comments-list',
    templateUrl: 'comments-list.component.html',
    styleUrls: ['comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {

    @Input() topic;

    comments$: Array<Comment>;

    constructor(
        private apiService: ApiService
    ) { }

    getComments() {

        this.comments$ = this.apiService.comment$;

        console.log(this.apiService.getCommentsForTopic(this.topic.topic_id));

    }

    ngOnInit() {
        this.getComments();
    }
}