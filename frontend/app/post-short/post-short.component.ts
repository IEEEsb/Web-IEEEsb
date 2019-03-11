import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-post-short',
	templateUrl: './post-short.component.html',
	styleUrls: ['./post-short.component.less']
})
export class PostShortComponent implements OnInit {

	@Input() post: any = {};
	@Input() index = 0;

	constructor(private _sanitizer: DomSanitizer) { }

	get sanitizer() {
		return this._sanitizer;
	}

	ngOnInit() {
	}

}
