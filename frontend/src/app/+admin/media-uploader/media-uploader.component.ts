import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';

import { MediaService } from '../../_services/media.service';

const URL = '/api/media/';

@Component({
	moduleId: module.id,
	selector: 'media-uploader',
	templateUrl: './media-uploader.component.html',
	styleUrls: ['./media-uploader.component.css']
})
export class MediaUploaderComponent implements OnInit {

	@Output() onSelect = new EventEmitter();

	private tab: number = 2;
	public uploader:FileUploader = new FileUploader({url: URL, itemAlias: "avatar", queueLimit: 1});
	public hasBaseDropZoneOver:boolean = false;
	media: any[];

	constructor(private sanitizer: DomSanitizer, private mediaService: MediaService) {}

	ngOnInit() {
		this.mediaService.mediaSubject.subscribe((media) => {
			this.media = media;
		});
	}

	select() {
		let selected = [];
		for(let i = 0; i < this.media.length; i++){
			if(this.media[i].selected){
				selected.push(this.media[i]);
			}
		}
		this.onSelect.emit(selected);
	}

	getMediaURL(file: any){
		if( this.isImage(String(file.mimeType)) )
			return "/media/" + String(file._id);
		return "/images/profile_icon.png";
	}

	selectTab(id: any) {
		console.log(this.tab);
		this.tab = id;
	}

	fileOverBase(e:any):void {
		//console.log(e);
		this.hasBaseDropZoneOver = e;
	}

	isImage(type: string){
		return /image.*/.test(type);
	}

	get uploaderImage(){
		if (this.isImage(this.uploader.queue[0].file.type) ) {
			return this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.uploader.queue[0]._file));
		}
		return '/images/profile_icon.png';
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
