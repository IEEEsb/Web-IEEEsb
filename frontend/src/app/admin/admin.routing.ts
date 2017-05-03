import { Route } from '@angular/router';

import { AdminComponent }  from './admin.component';
import { PostEditorComponent }  from './posts/editor/editor.component';
import { PostsAdminComponent }  from './posts/posts.component';
import { UsersAdminComponent }  from './users/users.component';
import { UserEditorComponent }  from './users/editor/editor.component';
import { InventoryAdminComponent }  from './inventory/inventory.component';
import { ItemEditorComponent }  from './inventory/editor/editor.component';
import { InsertItemComponent }  from './inventory/insert/insert.component';
import { ItemAutomaticEditorComponent }  from './inventory/automatic-editor/automatic-editor.component';

import { AdminGuard }  from '../_guards/admin.guard';

export const AdminRoute: Route = {
	path: 'admin', component: AdminComponent, canActivateChild: [AdminGuard],
	children: [
		{ path: '', redirectTo: '/admin/posts', pathMatch: 'full' },
		{ path: 'posts', component: PostsAdminComponent },
		{ path: 'posts/post/:id', component: PostEditorComponent },
		{ path: 'posts/post', component: PostEditorComponent },
		{ path: 'inventory', component: InventoryAdminComponent	},
		{ path: 'inventory/editor/:id', component: ItemEditorComponent },
		{ path: 'inventory/insert', component: InsertItemComponent },
		{ path: 'inventory/autoeditor/:id', component: ItemAutomaticEditorComponent },
		{ path: 'inventory/autoeditor', component: ItemAutomaticEditorComponent },
		{ path: 'users', component: UsersAdminComponent	},
		{ path: 'users/editor/:id', component: UserEditorComponent	},
	]
};