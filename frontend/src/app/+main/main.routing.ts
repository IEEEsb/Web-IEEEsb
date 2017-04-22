import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent }		from './main.component';
import { LoginComponent }		from './login/login.component';
import { RegisterComponent }	from './register/register.component';
import { ProfileComponent }		from './profile/profile.component';
import { HomeComponent }		from './home/home.component';
import { InventoryComponent }		from './inventory/inventory.component';
import { ItemDetailsComponent }		from './inventory/details/details.component';
import { PostComponent }		from './post/post.component';
import { RestorePasswordComponent }  from './restore-password/restore-password.component';

import { LoggedGuard }  from '../_guards/logged.guard';
import { IEEEGuard }  from '../_guards/ieee.guard';

const routes: Routes = [
	{
		path: '', component: MainComponent,
		children: [
			{ path: '', component: HomeComponent },
			{ path: 'inventory', component: InventoryComponent, canActivate: [IEEEGuard] },
			{ path: 'inventory/item/:id', component: ItemDetailsComponent, canActivate: [IEEEGuard] },
			{ path: 'post/:id', component: PostComponent },
			{ path: 'login', component: LoginComponent },
			{ path: 'register', component: RegisterComponent },
			{ path: 'restorepassword', component: RestorePasswordComponent },
			{ path: 'profile', component: ProfileComponent, canActivate: [LoggedGuard] },
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MainRoutingModule { }