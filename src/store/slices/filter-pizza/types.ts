export type SortType = 'rating' | 'price' | 'title';

export type SortByType = {
	sort: SortType;
	value: string;
};

export type FilterPizzaStateType = {
	activeCategoryId: number;
	sortBy: SortByType;
	currentPageIndex: number;
	pagesCount: number;
	search: string;
};

export type QsParamsType = {
	category?: string;
	page: string;
	limit: string;
	sortBy: SortType;
	order?: string;
	search?: string;
};
