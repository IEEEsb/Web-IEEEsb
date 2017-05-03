import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { RouterModule } from '@angular/router';

import { AdminComponent }  from './admin.component';
import { InventoryAdminComponent }  from './inventory/inventory.component';
import { ItemEditorComponent }  from './inventory/editor/editor.component';
import { InsertItemComponent }  from './inventory/insert/insert.component';
import { ItemAutomaticEditorComponent }  from './inventory/automatic-editor/automatic-editor.component';
import { MediaUploaderComponent }  from './media-uploader/media-uploader.component';
import { PostEditorComponent }  from './posts/editor/editor.component';
import { PostsAdminComponent }  from './posts/posts.component';
import { UsersAdminComponent }  from './users/users.component';
import { UserEditorComponent }  from './users/editor/editor.component';

import { CKEditorModule } from 'ng2-ckeditor';
import { FileUploadModule } from 'ng2-file-upload';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { LoaderModule }		from '../loader/loader.module';

import { PaginationModule } from 'ngx-bootstrap';

@NgModule({
	imports: [
		CommonModule,
		HttpModule,
		FormsModule,
		CKEditorModule,
		Ng2AutoCompleteModule,
		FileUploadModule,
		LoaderModule,
		RouterModule,
		PaginationModule.forRoot(),
	],
	declarations: [
		AdminComponent,
		InventoryAdminComponent,
		ItemEditorComponent,
		InsertItemComponent,
		ItemAutomaticEditorComponent,
		MediaUploaderComponent,
		PostEditorComponent,
		PostsAdminComponent,
		UsersAdminComponent,
		UserEditorComponent
	]
})
export class AdminModule { }
