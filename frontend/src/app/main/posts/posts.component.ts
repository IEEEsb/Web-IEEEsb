import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';

import { ContentService } from '../../_services/content.service';

import { PostData } from '../../_models/post';



@Component({

	selector: 'posts',
	templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.less']
})
export class PostsComponent implements OnInit {

	@Input() perPage: any;

	posts: PostData[] = [];
	currentPage: number = 1;

	ngOnInit() {
		this.contentService.getPosts()
			.then((posts: PostData[]) => {
				this.posts = posts;
			});
	}

	get pagePosts(){
		return this.posts.slice( (this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
	}

	constructor(private contentService: ContentService, private sanitizer: DomSanitizer) {}

}
