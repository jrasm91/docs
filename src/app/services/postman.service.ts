import { Injectable } from '@angular/core';
import * as postman from '../models/postman.model';
import { NbMenuItem } from '@nebular/theme';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostmanService {
	private item = new BehaviorSubject<postman.Item>(null);
	private collection = new BehaviorSubject<postman.Collection>(null);
	private skipFolders: string[] = [];

	public collapsable = false;

	public get item$() {
		return this.item.asObservable();
	}

	public get collection$() {
		return this.collection.asObservable();
	}

	public notify(url: string, method: string) {
		let found = null;
		this.iterate(item => {
			if (this.toLink(item) === url) {
				found = item;
			}
		});
		if (found) {
			this.item.next(found);
		}
	}

	public setSkipFolders(folders: string[]) {
		this.skipFolders = folders;
	}

	public setCollection(collection: postman.Collection) {
		this.collection.next(collection);
	}

	public isLoaded() {
		return !!this.collection.getValue();
	}

	public menu() {
		if (!this.collection) {
			return [];
		}

		const menu: NbMenuItem[] = [];
		this.iterate(
			item => {
				const lastItem = [...menu].pop();
				const menuItem = {
					title: item.name,
					link: this.toLink(item),
					data: item,
					queryParams: { method: item.request.method },
				};

				if (lastItem && this.collapsable) {
					lastItem.children.push(menuItem);
				} else {
					menu.push(menuItem);
				}
			},
			folder => menu.push({ title: folder.name, group: !this.collapsable, children: this.collapsable ? [] : null }),
		);
		return menu;
	}

	private iterate(
		onItem: (item?: postman.Item) => any,
		onFolder?: (folder?: postman.Folder) => any,
	): void {
		const collection = this.collection.getValue();
		if (!collection) {
			console.warn('Collection is empty');
			return;
		}

		const _onItem = (item: postman.Item) => onItem(item);
		const _onItems = (items: Array<postman.Item | postman.Folder>) => {
			items.forEach(item => this.isFolder(item)
				// tslint:disable-next-line: no-use-before-declare
				? _onFolder(item as postman.Folder)
				: _onItem(item as postman.Item));
		};
		const _onFolder = (folder: postman.Folder) => {
			if (this.skipFolders.indexOf(folder.name) !== -1) {
				return;
			}

			if (onFolder) {
				onFolder(folder);
			}

			_onItems(folder.item);
		};

		_onItems(collection.item);
	}

	private isFolder(folder: postman.Item | postman.Folder) {
		return !!(folder as postman.Folder).item;
	}

	private toLink(item: postman.Item) {
		return '/' + item.request.url.path.join('/');
	}
}
