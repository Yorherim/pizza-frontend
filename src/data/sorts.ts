type SortTitlesType = {
	rating: {
		sort: 'rating';
		value: string;
	};
	price: {
		sort: 'price';
		value: string;
	};
	title: {
		sort: 'title';
		value: string;
	};
};

export const sortTitles: SortTitlesType = {
	rating: {
		sort: 'rating',
		value: 'популярности',
	},
	price: {
		sort: 'price',
		value: 'по цене',
	},
	title: {
		sort: 'title',
		value: 'по алфавиту',
	},
};
