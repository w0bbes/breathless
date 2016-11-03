export class Reddit {
    kind: string;
    data: any;
}

export class Topic {
    constructor(
        public id: string,
        public title: string,
        public thumbnail: string,
        public large_image: string,
        public author: string,
        public active: boolean
    ){ }
}

export class Comment {
    constructor(
        public name: string,
        public comment: string,
        public date: Date,
        public topic_id: string
    ){ }
}