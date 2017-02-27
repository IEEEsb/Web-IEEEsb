import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }		from './login/login.component';
import { HomeComponent }		from './home/home.component';
import { RegisterComponent }	from './register/register.component';
import { InventoryComponent }		from './inventory/inventory.component';
import { ItemDetailsComponent }		from './inventory/details/details.component';
import { AdminComponent }		from './admin/admin.component';
import { MainComponent }		from './main/main.component';
import { PostComponent }		from './post/post.component';
import { PostEditorComponent }  from './admin/posts/editor/editor.component';
import { PostsAdminComponent }  from './admin/posts/posts.component';
import { InventoryAdminComponent }  from './admin/inventory/inventory.component';
import { ItemEditorComponent }  from './admin/inventory/editor/editor.component';
import { ItemAutomaticEditorComponent }  from './admin/inventory/automatic-editor/automatic-editor.component';

import { LoggedGuard }  from './_guards/logged.guard';
import { IEEEGuard }  from './_guards/ieee.guard';

const routes: Routes = [
	{
		path: '', component: MainComponent,
		children: [
			{ path: '', component: HomeComponent },
			{ path: 'inventory', component: InventoryComponent, canActivate: [IEEEGuard] },
			{ path: 'inventory/item/:id', component: ItemDetailsComponent, canActivate: [IEEEGuard] },
			{ path: 'post/:id', component: PostComponent },
			{ path: 'login', component: LoginComponent },
		]
	},
	{
		path: 'admin', component: AdminComponent, canActivateChild: [LoggedGuard],
		children: [
			{ path: '', redirectTo: '/admin/posts', pathMatch: 'full' },
			{ path: 'posts', component: PostsAdminComponent },
			{ path: 'posts/post/:id', component: PostEditorComponent },
			{ path: 'posts/post', component: PostEditorComponent },
			{ path: 'inventory', component: InventoryAdminComponent	},
			{ path: 'inventory/editor/:id', component: ItemEditorComponent },
			{ path: 'inventory/editor', component: ItemEditorComponent },
			{ path: 'inventory/autoeditor/:id', component: ItemAutomaticEditorComponent },
			{ path: 'inventory/autoeditor', component: ItemAutomaticEditorComponent }
		]
	},
	{ path: 'register', component: RegisterComponent },
	{ path: '**', redirectTo: '/' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }