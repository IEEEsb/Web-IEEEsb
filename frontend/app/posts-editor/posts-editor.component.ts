import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PostService } from '../post.service';

import { Post } from '../../../models/Post';

@Component({
	selector: 'app-posts-editor',
	templateUrl: './posts-editor.component.html',
	styleUrls: ['./posts-editor.component.less']
})
export class PostsEditorComponent implements OnInit {

	search = '';
	posts: Post[] = [];
	constructor(private postService: PostService, private router: Router) { }

	ngOnInit() {
		this.postService.getPosts().subscribe((data) => {
			this.posts = data.posts;
		});
	}
}
