import { Injectable, Pipe, PipeTransform } from '@angular/core';
import * as postman from './models/postman.model';

@Pipe({ name: 'url' })
@Injectable({ providedIn: 'root' })
export class UrlPipe implements PipeTransform {

	transform(url: postman.Url, replace = false): string {
		if (!url) {
			return '';
		}

		let result = url.path.join('/');
		if (!result.startsWith('/')) {
			result = '/' + result;
		}

		if (replace && url.variable) {
			url.variable.forEach(variable => {
				result = result.split(`:${variable.key}`).join(variable.value);
			});
		}

		return result;
	}

}

@Pipe({ name: 'request' })
@Injectable({ providedIn: 'root' })
export class RequestPipe implements PipeTransform {
	constructor(private url: UrlPipe) { }
	transform(request: postman.Request, args?: any): string {
		if (!request) {
			return '';
		}

		let result = this.url.transform(request.url, true);
		if (request.body) {
			const body = JSON.parse(request.body.raw);
			result += `\n${JSON.stringify(body, null, 4)}`;
		}

		return result;
	}
}

@Pipe({ name: 'response' })
@Injectable({ providedIn: 'root' })
export class ResponsePipe implements PipeTransform {
	transform(response: postman.Response, args?: any): string {
		if (!response) {
			return '';
		}

		let result = `${response.code} - ${response.status}`;
		if (response.body) {
			const body = JSON.parse(response.body);
			result += `\n${JSON.stringify(body, null, 4)}`;
		}

		return result;
	}
}
