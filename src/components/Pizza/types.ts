export type PizzaPropsType = {
	imageUrl: string;
	title: string;
	widths: number[];
	sizes: number[];
	price: number;
	count?: number;
	id: string;
};

export type PizzaSizesType = 25 | 30 | 35;
