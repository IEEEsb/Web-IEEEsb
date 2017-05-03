export class PostData {
	public _id: string;
	public title: string;
	public author: any;
    public content: string;
    public excerpt: string;
    public published: boolean;
	public publishedDate: string;
    public tags: string[];
	public createDate: Date;
	public modifiedDate: Date;

	constructor() {
		this._id = "";
		this.title = "Title";
		this.author = {};
        this.content = "Content";
        this.excerpt = "";
        this.published = false;
		this.publishedDate = "";
        this.tags = [];
        this.createDate = new Date();
        this.modifiedDate = new Date();
	}
}