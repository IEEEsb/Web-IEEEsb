import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { PostService } from '../post.service';

import { Post } from '../../../models/Post';

const config = require('../../../config.json');

@Component({
	selector: 'app-post-editor',
	templateUrl: './post-editor.component.html',
	styleUrls: ['./post-editor.component.less']
})
export class PostEditorComponent implements OnInit {

	ckeditorConfig = {
		language: 'es',
		uiColor: '#4285f4',
		allowedContent: true,
		filebrowserBrowseUrl: `${config.fileServer}/#/browser?type=all`,
		filebrowserImageBrowseUrl: `${config.fileServer}/#/browser?type=image`
	};

	post: Post = {
		excerpt: ''
	};
	editing = false;

	constructor(private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer, private postService: PostService) {}

	ngOnInit() {
		this.route.params.subscribe(params => {
			if (params['postId']) {
				this.postService.getPost(params['postId']).subscribe((data) => {
					this.post = data.post;
					this.editing = true;
				});
			}
		});
	}

	get content(){
		return this.sanitizer.bypassSecurityTrustHtml(this.post.content);
	}

	get excerpt(){
		return this.post.excerpt.replace(/<br \/>/g, "\n");
	}

	set excerpt(excerpt){
		this.post.excerpt = excerpt.replace(/\n/g, "<br />");
	}

	addPost() {
		this.postService.addPost(this.post).subscribe((data) => {
			this.router.navigate(["/admin/posts/" + data.post._id]);
		});
	}

	updatePost() {
		this.postService.updatePost(this.post._id, this.post).subscribe((data) => {
			this.post = data.post;
		});
	}

	removePost() {
		if(!confirm('¿Estás seguro de que quieres eliminar la noticia?')) return;
		this.postService.removePost(this.post._id).subscribe((data) => {
			this.router.navigate(["/admin/posts/"]);
		});
	}

	publishPost() {
		this.postService.publishPost(this.post._id).subscribe((data) => {
			this.post = data.post;
		});
	}

}
