export interface Post {
	_id: string;
	author: Author;
	description: string;
	body: Body[];
	coverImage: CoverImage;
	date: string;
	slug: string;
	title: string;
}

export interface Author {
	name: string;
	picture: string;
}

export interface Body {
	_key: string;
	_type: string;
	children: Child[];
	markDefs: any[];
	style: string;
}

export interface Child {
	_key: string;
	_type: string;
	marks: string[];
	text: string;
}

export interface CoverImage {
	_type: string;
	asset: Asset;
}

export interface Asset {
	_ref: string;
	_type: string;
}
