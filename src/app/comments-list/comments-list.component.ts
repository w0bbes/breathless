import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { CommentsService } from '../shared/comments.service';

import { Comment } from '../shared/types';

import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'my-comments-list',
    templateUrl: 'comments-list.component.html',
    styleUrls: ['comments-list.component.scss']
})
export class CommentsListComponent implements OnInit, OnChanges {

    @Input() topic;

    comments$: Observable<Comment[]>;
    amountOfComments: number;

    constructor(
        private commentsService: CommentsService
    ) {}

    removeComment(comment) {
        this.commentsService.removeComment(comment);
    }

    ngOnInit() { }
    ngOnChanges() {

        // retrieve the observable
        this.commentsService.getComments();

        // call it and subscribe to it with the async pipe in the html
        this.comments$ = this.commentsService.comments$
            .map(comments => comments.filter(comment => comment.topic_id === this.topic.id ))
            .map(comments => {
                comments.sort((a, b) => {

                    let aDate: any = new Date(a.date);
                    let bDate: any = new Date(b.date);

                    return bDate - aDate;
                });

                return comments;
            });

        // for the record, subscribe to get the amount of comments
        this.comments$.subscribe(comments => this.amountOfComments = comments.length);
    }
}
