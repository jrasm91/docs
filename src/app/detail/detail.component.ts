import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as postman from '../models/postman.model';
import { PostmanService } from '../services';

@Component({
	selector: 'docs-detail',
	templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit, OnDestroy {
	private unsubscribe$ = new Subject<void>();
	item: postman.Item;

	constructor(
		private postmanService: PostmanService,
	) { }

	public ngOnInit() {
		this.postmanService.item$
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(item => {
				this.item = item;
			});
	}

	public ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}
