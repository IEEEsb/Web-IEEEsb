import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedInGuard } from './guards.guard'

import { LoginComponent } from './login/login.component'
import { MainComponent } from './main/main.component'
import { HomeComponent } from './home/home.component'
import { AdminComponent } from './admin/admin.component'
import { UsersEditorComponent } from './users-editor/users-editor.component'
import { UserEditorComponent } from './user-editor/user-editor.component'
import { ProfileComponent } from './profile/profile.component'
import { PostsEditorComponent } from './posts-editor/posts-editor.component'
import { PostEditorComponent } from './post-editor/post-editor.component'
import { PostComponent } from './post/post.component';


const routes: Routes = [
	{
		path: '', component: MainComponent, children: [
			{ path: '', component: HomeComponent },
			{ path: 'profile', canActivate:[LoggedInGuard], component: ProfileComponent },
			{ path: 'post/:postId', component: PostComponent },
			{ path: 'login', component: LoginComponent },
		]
	},
	{
		path: 'admin', component: AdminComponent, canActivate:[LoggedInGuard], children: [
			{ path: '', component: HomeComponent },
			{ path: 'posts', component: PostsEditorComponent },
			{ path: 'posts/add', component: PostEditorComponent },
			{ path: 'posts/:postId', component: PostEditorComponent },
			{ path: 'users', component: UsersEditorComponent },
			{ path: 'users/:userId', component: UserEditorComponent },
			{ path: 'login', component: LoginComponent },
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
