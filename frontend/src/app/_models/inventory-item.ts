export class InventoryItem {

	public _id: string;
	public code: string;
	public name: string;
	public location: LocationData;
	public tags: string[];
	public goodState: boolean;
	public type: string;
	public borrowed: number;
	public buyPrice: number;
	public sellPrice: number;
	public quantity: number;
	public icon: string;
	public files: string[];

	constructor() {
		this._id = "";
		this.code = "";
		this.name = "";
		this.location = new LocationData();
		this.tags = [];
		this.goodState = true;
		this.type = "consumable";
		this.borrowed = 0;
		this.buyPrice = 0.00;
		this.sellPrice = 0.00;
		this.quantity = 0;
		this.icon = "./images/profile_icon.png";
		this.files = [];
	}
}

class LocationData {

	public main: string;
	public sub: string;

	constructor() {
		this.main = "";
		this.sub = "";
	}
}
