export enum HttpVerb {
	POST = 'POST',
	GET = 'GET',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

export interface Collection {
	auth?: any;
	event?: any;
	protocolProfileBehavior?: any;
	info: {
		_postman_id: string,
		name: string;
		schema: string;
	};
	item: Array<Item | Folder>;
}

export interface Folder {
	name: string;
	description?: string;
	item: Array<Item | Folder>;
	protocolProfileBehavior: any;
}

export interface Item {
	name: string;
	request: Request;
	response: Response[];
}

export interface Request {
	auth?: any;
	method: HttpVerb | 'GET' | 'PUT' | 'POST' | 'DELETE';
	description?: string;
	header: Header[];
	body?: Body;
	url: Url;
}

export interface Response {
	name: string;
	originalRequest: Request;
	status: string;
	code: number;
	header: Header[];
	cookie: [];
	body: string;
	[key: string]: any;
}

export interface Header {
	key: string;
	value: string;
	name?: string;
	type?: string;
	disabled?: boolean;
}

export interface Body {
	mode: string;
	raw: string;
	options: {
		[key: string]: {
			language: string;
		};
	};
}

export interface Query {
	key: string;
	value: string;
	description?: string;
	disabled?: boolean;
}

export interface Variable {
	key: string;
	value: string;
	type: string;
	description?: string;
}

export interface Url {
	raw: string;
	host: string[];
	path: string[];
	query?: Query[];
	variable?: Variable[];
}
