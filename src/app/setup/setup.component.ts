import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { PostmanService } from '../services';

@Component({
	selector: 'docs-setup',
	templateUrl: './setup.component.html',
})
export class SetupComponent implements OnInit {
	@ViewChild('inputEl', { static: false }) private inputEl: ElementRef;

	constructor(
		private postmanService: PostmanService,
		private notificationService: NbToastrService,
	) { }

	public ngOnInit() { }

	public onChange() {
		const [file] = this.inputEl.nativeElement.files;
		const filename = file.name;
		const reader = new FileReader();
		reader.addEventListener('load', () => {
			try {
				this.postmanService.setCollection(JSON.parse(reader.result.toString()));
			} catch (e) {
				console.error(e);
				this.notificationService.warning(`Unable to parse ${filename}.`, 'Upload Failed');
			}
		});

		reader.readAsText(file);
	}
}
