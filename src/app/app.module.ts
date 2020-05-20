import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NbMenuModule, NbSidebarModule, NbToastrModule } from '@nebular/theme';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { DetailComponent } from './detail/detail.component';
import { RequestPipe, ResponsePipe, UrlPipe } from './pipes';
import { SetupComponent } from './setup/setup.component';
import { ThemeModule } from './theme/theme.module';

const routes: Routes = [
	{
		path: 'setup',
		component: SetupComponent,
	},
	{ path: '', redirectTo: '/setup', pathMatch: 'full' },
	{ path: '**', component: DetailComponent, canActivate: [AuthGuard] },
];

const config: ExtraOptions = {
	useHash: false,
	onSameUrlNavigation: 'reload',
};

@NgModule({
	declarations: [
		AppComponent,
		DetailComponent,
		RequestPipe,
		ResponsePipe,
		UrlPipe,
		SetupComponent,
	],
	imports: [
		HttpClientModule,
		BrowserModule,
		BrowserAnimationsModule,
		CommonModule,
		RouterModule.forRoot(routes, config),
		ThemeModule.forRoot(),

		NbSidebarModule.forRoot(),
		NbMenuModule.forRoot(),
		NbToastrModule.forRoot({ duration: 10000 }),
	],
	providers: [],
	entryComponents: [],
	bootstrap: [AppComponent],
})
export class AppModule { }
