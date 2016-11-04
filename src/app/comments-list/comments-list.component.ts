import { Component, OnInit, Input } from '@angular/core';

import { CommentsService } from '../shared/comments.service';

import { Comment } from '../shared/types';

@Component({
    selector: 'my-comments-list',
    templateUrl: 'comments-list.component.html',
    styleUrls: ['comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {

    @Input() topic;
    comments$: any;
    singleTodo$: any;

    constructor(
        private commentsService: CommentsService
    ) { }

    getComments() {

    }

    ngOnInit() {
        this.comments$ = this.commentsService._comments$;
        this.singleTodo$ = this.commentsService._comments$
            .map(comments => comments.find(comment => comment.topic_id === this.topic.topic_id));

        this.commentsService.getComments();
        this.commentsService.getComment(this.topic.topic_id);
    }
}