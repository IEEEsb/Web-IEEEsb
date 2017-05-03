import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';

import { ContentService } from '../../_services/content.service';
import { PostData } from '../../_models/post';

@Component({

	selector: 'post',
	templateUrl: './post.component.html',
    styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit, OnDestroy {

	post: PostData = new PostData();
	sub: any;

	constructor(private router: Router, private route: ActivatedRoute, private contentService: ContentService, private sanitizer: DomSanitizer) { }

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			if (params['id']) {
				this.contentService.getPost(params['id'])
					.then((post: PostData) => {
						this.post = post;
					});
			}
		});
	}

	get content(){
		return this.sanitizer.bypassSecurityTrustHtml(this.post.content);
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

}
