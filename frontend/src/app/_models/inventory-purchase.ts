export class InventoryPurchase {

	public _id: string;
	public who: string;
	public item: string;
	public quantity: number;

	constructor() {
		this._id = "";
		this.who = "";
		this.item = "";
		this.quantity = 0;
	}
}

