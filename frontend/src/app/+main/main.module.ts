import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { MainComponent }	from './main.component';
import { HomeComponent }	from './home/home.component';
import { CarouselComponent }  from './carousel/carousel.component';
import { LoginComponent }  from './login/login.component';
import { ProfileComponent }  from './profile/profile.component';
import { RegisterComponent }  from './register/register.component';
import { InventoryComponent }  from './inventory/inventory.component';
import { ItemDetailsComponent }  from './inventory/details/details.component';
import { NavBarComponent }  from './navbar/navbar.component';
import { PostComponent }  from './post/post.component';
import { PostsComponent }  from './posts/posts.component';

import { PaginationModule } from 'ng2-bootstrap';
import { LoaderModule }		from '../loader/loader.module';

import { MainRoutingModule }	from './main.routing';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		MainRoutingModule,
		PaginationModule.forRoot(),
		LoaderModule
	],
	declarations: [
		MainComponent,
		HomeComponent,
		CarouselComponent,
		LoginComponent,
		ProfileComponent,
		RegisterComponent,
		InventoryComponent,
		ItemDetailsComponent,
		NavBarComponent,
		PostComponent,
		PostsComponent
	]
})
export class MainModule { }
