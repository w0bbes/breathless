import { Component, OnInit, Input } from '@angular/core';

import { CommentsService } from '../shared/comments.service';

import { Comment } from '../shared/types';

import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'my-comments-list',
    templateUrl: 'comments-list.component.html',
    styleUrls: ['comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {

    @Input() topic;

    comments$: Observable<Comment[]>;

    constructor(
        private commentsService: CommentsService
    ) { }

    getComments() {

    }

    ngOnInit() {
    
        this.comments$ = this.commentsService.comments$
            .map(comments => comments.filter(comment => comment.topic_id === this.topic.topic_id));

        this.commentsService.getComments();
    }
}