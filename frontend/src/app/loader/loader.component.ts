import { Component, Input } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'loader',
	templateUrl: './loader.component.html',
	styleUrls: ['./loader.component.css']
})
export class LoaderComponent{
	@Input() enabled: boolean = true;
}