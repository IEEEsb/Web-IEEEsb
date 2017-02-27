import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';

import { ContentService } from '../_services/content.service';

import { PostData } from '../_models/post';

@Component({
	selector: 'posts',
	templateUrl: 'app/posts/posts.component.html',
    styleUrls: ['app/posts/posts.component.css']
})
export class PostsComponent implements OnInit {

	posts: PostData[] = [];

	ngOnInit() {
		this.contentService.getPosts()
			.then((posts: PostData[]) => {
				this.posts = posts;
			});
	}

	constructor(private contentService: ContentService, private sanitizer: DomSanitizer) {}

}
