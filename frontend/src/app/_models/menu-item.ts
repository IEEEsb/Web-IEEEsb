export class MenuItem {
	public name: string;
	public ext: boolean;
	public href: string;
	public params: any;
	public sep: boolean;
    public dropdown: MenuItem[];

	constructor(){
		this.name = "";
		this.ext = false;
		this.href = "";
		this.params = {};
		this.sep = false;
		this.dropdown = [];
	}
}