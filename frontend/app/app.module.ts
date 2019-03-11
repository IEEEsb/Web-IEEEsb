import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularIEEEsbLibModule } from 'angular-ieeesb-lib'
import { AgmCoreModule } from '@agm/core';
import { CKEditorModule } from 'ng2-ckeditor';

import { UserService } from './user.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScopePipe } from './scope.pipe';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UsersEditorComponent } from './users-editor/users-editor.component';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { ProfileComponent } from './profile/profile.component';
import { PostShortComponent } from './post-short/post-short.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { PostsEditorComponent } from './posts-editor/posts-editor.component';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { PostComponent } from './post/post.component';

@NgModule({
	declarations: [
		AppComponent,
		ScopePipe,
		LoginComponent,
		MainComponent,
		HomeComponent,
		AdminComponent,
		UsersEditorComponent,
		UserEditorComponent,
		ProfileComponent,
		PostShortComponent,
		SafeUrlPipe,
		PostsEditorComponent,
		PostEditorComponent,
		PostComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		AngularIEEEsbLibModule.forRoot(),
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyCPex3S-n9f5FeXi6uGPwjBWbW6CxgxW3A'
		}),
		CKEditorModule,
		NgbModule
	],
	providers: [
		UserService,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
