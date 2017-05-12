import { Component, OnInit, Output, EventEmitter, NgZone } from '@angular/core';
import { Router, NavigationEnd, UrlTree } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';

import { MediaService } from '../../_services/media.service';

@Component({

	selector: 'media-uploader',
	templateUrl: './media-uploader.component.html',
	styleUrls: ['./media-uploader.component.less']
})
export class MediaUploaderComponent implements OnInit {

	@Output() onSelect = new EventEmitter();

	tab: number = 2;
	url: string = "";
	public uploader:FileUploader;
	public hasBaseDropZoneOver:boolean = false;
	media: any[];
	params: {[key: string]: string};
	progress: number = 0;

	constructor(private sanitizer: DomSanitizer, private mediaService: MediaService, private router: Router, private _ngZone: NgZone) {}

	ngOnInit() {
		var bases = document.getElementsByTagName('base');
		var baseHref = null;

		if (bases.length > 0) {
			baseHref = bases[0].href;
		}
		this.url = baseHref + 'api/media/';
		console.log(this.url);
		this.uploader = new FileUploader({url: this.url, itemAlias: "avatar", queueLimit: 1});
		this.mediaService.mediaSubject.subscribe((media) => {
			this.media = media;
		});
		this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
			this.mediaService.update();
			this.clear();
			this.tab = 2;
		};
		this.uploader.onProgressItem = (item:any, progress:any) => {
			this._ngZone.run(()=>{
				this.progress = progress;
			})
		};
		this.params = this.router.parseUrl(this.router.url).queryParams;
	}

	clear(){
		this.uploader.queue = [];
	}

	select() {
		let selected;
		for(let i = 0; i < this.media.length; i++){
			if(this.media[i].selected){
				selected = this.media[i];
				break;
			}
		}
		if(this.params.CKEditor){
			window.opener.CKEDITOR.tools.callFunction(this.params.CKEditorFuncNum, selected.url);
			window.close();
		} else {
			this.onSelect.emit(selected);
		}

	}

	selected(id) {
		for (let index in this.media) {
			if(this.media[index]._id === id){
				this.media[index].selected = true;
			} else {
				this.media[index].selected = false;
			}
		}
	}

	selectTab(id: any) {
		//console.log(this.tab);
		this.tab = id;
	}

	fileOverBase(e:any):void {
		//console.log(e);
		this.hasBaseDropZoneOver = e;
	}

	isImage(type: string){
		return /image.*/.test(type);
	}

	fileImage(file: any){
		if (this.isImage(file.mimeType) ) {
			return file.url;
		}
		return './images/profile_icon.png';
	}

	get uploaderImage(){
		if (this.isImage(this.uploader.queue[0].file.type) ) {
			return this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.uploader.queue[0]._file));
		}
		return './images/profile_icon.png';
	}

	bytesToSize(bytes: any) {
		var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		if (bytes == 0) return '0 Byte';
		var i = Math.floor(Math.log(bytes) / Math.log(1024));
		return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
	}

	remove(id: any) {
		window.confirm('¿Seguro de que lo quieres borrar?') ? this.mediaService.removeMedia(id) : false;
	}



}
