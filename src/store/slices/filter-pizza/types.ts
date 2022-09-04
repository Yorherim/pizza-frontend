export type SortByType = {
	sort: string;
	value: string;
};

export type FilterPizzaStateType = {
	activeCategoryId: number;
	sortBy: SortByType;
	currentPageIndex: number;
	pagesCount: number;
	search: string;
};
