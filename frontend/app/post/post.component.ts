import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { PostService } from '../post.service';

import { Post } from '../../../models/Post';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit {

	post: Post;

	constructor(private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer, private postService: PostService) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			if (params['postId']) {
				this.postService.getPublishedPost(params['postId']).subscribe((data) => {
					this.post = data.post;
				});
			}
		});
	}

	get content(){
		return this.sanitizer.bypassSecurityTrustHtml(this.post.content);
	}

}
