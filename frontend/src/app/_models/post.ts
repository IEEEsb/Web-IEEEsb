export class PostData {
	public _id: string;
	public title: string;
	public author: string;
    public content: string;
    public excerpt: string;
    public published: boolean;
    public tags: string[];
	public createDate: Date;
	public modifiedDate: Date;
	constructor() {
		this._id = "";
		this.title = "Title";
		this.author = "";
        this.content = "Content";
        this.excerpt = "";
        this.published = false;
        this.tags = [];
        this.createDate = new Date();
        this.modifiedDate = new Date();
	}
}