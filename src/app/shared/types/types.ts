export class Reddit {
    kind: string;
    data: any;
}

export class Topic {
  constructor(
    public title: string,
    public thumbnail: string,
    public large_image: string,
    public author: string,
    public active: boolean
  ){ }
}