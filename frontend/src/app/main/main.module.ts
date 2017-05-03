import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';

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
import { RestorePasswordComponent }  from './restore-password/restore-password.component';

import { PaginationModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { LoaderModule }		from '../loader/loader.module';

import { SafeUrlPipe } from '../_pipes/safeurl.pipe'

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		PaginationModule.forRoot(),
		LoaderModule,
		RouterModule,
		BrowserAnimationsModule,
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyCPex3S-n9f5FeXi6uGPwjBWbW6CxgxW3A'
		})
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
		PostsComponent,
		RestorePasswordComponent,
		SafeUrlPipe
	]
})
export class MainModule { }
