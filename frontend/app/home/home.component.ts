import { Component, HostListener, OnInit, ChangeDetectorRef } from '@angular/core';

import { PostService } from '../post.service';

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

	width = 0;
	location = { lat: 40.451836, lng: -3.726562 };
	zoom = 15;

	rawPosts = [];
	posts = [];

	constructor(private postService: PostService, private cdRef:ChangeDetectorRef) { }

	ngOnInit() {
		this.width = window.innerWidth;
		this.postService.getPublishedPosts().subscribe((data) => {
			this.rawPosts = data.posts;
			this.cdRef.detectChanges();
		})
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.width = event.target.innerWidth;
	}
}
