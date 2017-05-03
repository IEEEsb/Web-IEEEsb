export class User {
	public _id: string;
	public alias: string;
	public code: string;
	public roles: string[];
	public name: string;
	public email: string;
	public money: number;
	public ieee: string;
	public profilePic: string;

	constructor() {
		this._id = "";
		this.alias = "";
		this.code = "";
		this.roles = [""];
        this.name = "";
        this.email = "";
        this.money = 0;
        this.ieee = "";
        this.profilePic = "";
	}
}