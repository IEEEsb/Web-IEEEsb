import { MenuItem } from './menu-item';

export class Menu {
	public leftItems: MenuItem[];
    public rightItems: MenuItem[];

	constructor(){
		this.leftItems = [];
		this.rightItems = [];
	}
}