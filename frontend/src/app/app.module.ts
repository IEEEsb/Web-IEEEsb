import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }		from './app.component';
import { HomeComponent }	from './home/home.component';
import { CarouselComponent }  from './carousel/carousel.component';
import { LoginComponent }  from './login/login.component';
import { RegisterComponent }  from './register/register.component';
import { InventoryComponent }  from './inventory/inventory.component';
import { ItemDetailsComponent }  from './inventory/details/details.component';
import { NavBarComponent }  from './navbar/navbar.component';
import { AdminComponent }  from './admin/admin.component';
import { InventoryAdminComponent }  from './admin/inventory/inventory.component';
import { ItemEditorComponent }  from './admin/inventory/editor/editor.component';
import { ItemEditorComponent }  from './admin/inventory/editor/editor.component';
import { ItemAutomaticEditorComponent }  from './admin/inventory/automatic-editor/automatic-editor.component';
import { MediaUploaderComponent }  from './admin/media-uploader/media-uploader.component';
import { PostComponent }  from './post/post.component';
import { PostsComponent }  from './posts/posts.component';
import { MainComponent }  from './main/main.component';
import { PostEditorComponent }  from './admin/posts/editor/editor.component';
import { PostsAdminComponent }  from './admin/posts/posts.component';

import { CKEditorModule } from 'ng2-ckeditor';
import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

import { AppRoutingModule }	from './app-routing.module';
import { UserService }  from './_services/user.service';
import { StorageService }  from './_services/storage.service';
import { ContentService }  from './_services/content.service';
import { MediaService }  from './_services/media.service';
import { InventoryService }  from './_services/inventory.service';

import { LoggedGuard }  from './_guards/logged.guard';
import { IEEEGuard }  from './_guards/ieee.guard';

@NgModule({
	imports: [BrowserModule,
		HttpModule,
		FormsModule,
		AppRoutingModule,
		CKEditorModule,
		Ng2AutoCompleteModule
	],
	declarations: [AppComponent,
		HomeComponent,
		CarouselComponent,
		LoginComponent,
		RegisterComponent,
		InventoryComponent,
		ItemDetailsComponent
		NavBarComponent,
		AdminComponent,
		InventoryAdminComponent,
		ItemEditorComponent,
		ItemAutomaticEditorComponent,
		MediaUploaderComponent,
		PostComponent,
		PostsComponent,
		MainComponent,
		PostEditorComponent,
		PostsAdminComponent,
		FileDropDirective,
		FileSelectDirective
	],
	bootstrap: [AppComponent],
	providers: [UserService, StorageService, ContentService, MediaService, InventoryService, LoggedGuard, IEEEGuard]
})
export class AppModule { }
