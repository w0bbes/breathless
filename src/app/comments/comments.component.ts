import { Component, OnInit, Input } from '@angular/core';

import { Comment, Topic } from '../shared/types';

import { ApiService } from '../shared/api.service';

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
        private apiService: ApiService
    ) { }

    addComment(): void {
        this.apiService.addComment(this.model);
        this.model = new Comment('', '', new Date(), this.topic.id);
        this.showCommentBox = false;
    }

    get diagnostic() {
        return JSON.stringify(this.model);
    }

    ngOnInit() {
        this.model = new Comment('', '', new Date(), this.topic.id);
    }
}
