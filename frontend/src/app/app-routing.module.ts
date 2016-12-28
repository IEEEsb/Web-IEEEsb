import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }		from './login/login.component';
import { HomeComponent }		from './home/home.component';
import { RegisterComponent }	from './register/register.component';
import { InventoryComponent }		from './inventory/inventory.component';

const routes: Routes = [
	{
		path: '', component: HomeComponent,
		children: [
			{ path: '', component: LoginComponent },
			{ path: 'inventario', component: InventoryComponent }
		]
	},
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }