export type PizzaType = {
	id: string;
	title: string;
	widths: (0 | 1)[];
	sizes: (25 | 30 | 35)[];
	price: number;
	imageUrl: string;
};

export type PizzaStateType = {
	pizzas: PizzaType[];
	loading: boolean;
};