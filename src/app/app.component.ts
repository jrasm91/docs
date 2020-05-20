import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NbIconLibraries, NbMenuItem, NbSidebarService } from '@nebular/theme';
import * as postman from './models/postman.model';
import { PostmanService } from './services';

@Component({
	selector: 'docs-app',
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	menu: NbMenuItem[] = [];

	private lastUrl: string;
	private lastMethod: string;

	constructor(
		private iconLibraries: NbIconLibraries,
		private postmanService: PostmanService,
		private sidebarService: NbSidebarService,
		private http: HttpClient,
		private router: Router,
		private route: ActivatedRoute,
	) {
		this.iconLibraries.registerFontPack('font-awesome', { packClass: 'fas', iconClassPrefix: 'fa' });
		this.iconLibraries.setDefaultPack('font-awesome');
	}

	public ngOnInit() {
		this.router.events.subscribe(event => {
			const method = this.route.snapshot.queryParams.method;
			if (event instanceof NavigationEnd) {
				this.lastUrl = event.url.split('?')[0];
				this.lastMethod = method;
				this.notify();
			}
		});

		this.postmanService.collection$.subscribe(() => {
			if (this.lastUrl && this.lastMethod) {
				this.notify();
			}

			this.menu = this.postmanService.menu();
			const [url] = this.menu.filter(item => item.link).map(item => item.link);
			if (url) {
				this.sidebarService.expand('menu-sidebar');
				// this.sidebarService.expand('options-sidebar');
				return this.router.navigateByUrl(url);
			}
		});

		this.tryAutoLoad();
	}

	private notify() {
		this.postmanService.notify(this.lastUrl, this.lastMethod);
	}

	public toggleGroups(collapsable: boolean) {
		this.postmanService.collapsable = collapsable;
		this.menu = this.postmanService.menu();
	}

	public tryAutoLoad() {
		this.http.get<postman.Collection>('/assets/data/collection.json').subscribe(collection => {
			this.postmanService.setCollection(collection);
		});
	}
}
