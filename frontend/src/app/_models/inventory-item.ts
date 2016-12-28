export class InventoryItem {
	public code: string;
	public name: string;
    public location: LocationData;
    public goodState: boolean;
    public consumable: boolean;
    public buyPrice: number;
    public sellPrice: number;
    public quantity: number;
    public icon: string;
    public files: FileData[];
    
    
	constructor() {
		this.code = "";
		this.name = "name";
        this.location = new LocationData();
        this.goodState = true;
        this.consumable = false;
        this.buyPrice = 0.00;
        this.sellPrice = 0.00;
        this.quantity = 0;
        this.icon = "item.png";
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

class FileData {
    
    public name: string;
    public url: string;
    
    constructor() {
        this.name = "";
        this.url = "";
    }
}