import { Component, OnInit, Input } from '@angular/core';

import { Comment, Topic } from '../shared/types';

import { TopicsService } from '../shared/topics.service';
import { CommentsService } from '../shared/comments.service';

@Component({
    selector: 'my-comments',
    templateUrl: 'comments.component.html',
    styleUrls: ['comments.component.scss']
})
export class CommentsComponent implements OnInit {

    showCommentBox: boolean = false;
    model: any;

    @Input() topic: Topic;

    constructor(
        private topicService: TopicsService,
        private commentsService: CommentsService
    ) {}

    addComment(): void {
        this.commentsService.addComment(this.model);

        // reset the comment box
        this.model = new Comment('', '', new Date(), this.topic.id);
        this.showCommentBox = false;
    }

    get diagnostic() {
        // for debugging
        return JSON.stringify(this.model);
    }

    ngOnInit() {
        // construct a new comment instance, so the form is filled
        this.model = new Comment('', '', new Date(), this.topic.id);
    }
}
