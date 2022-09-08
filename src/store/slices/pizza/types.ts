export type PizzaType = {
	id: string;
	title: string;
	widths: (0 | 1)[];
	sizes: (25 | 30 | 35)[];
	price: number;
	imageUrl: string;
	category: number;
	rating: number;
};

export type StatusType = 'loading' | 'success' | 'rejected';

export type PizzaStateType = {
	pizzas: PizzaType[];
	status: StatusType;
};

export type FetchPizzasActionPayloadType = {
	queryString: string;
	currentPageIndex: number;
	checkCurrentFiltersWithPrevFilteres: boolean;
};
