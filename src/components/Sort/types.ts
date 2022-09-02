type SortType = {
	sort: string;
	value: string;
};

export type SortPropsType = {
	sortList: SortType[];
	sortBy: SortType;
	setSortBy: (sort: SortType) => void;
};
