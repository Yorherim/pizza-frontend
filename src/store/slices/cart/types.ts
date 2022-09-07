export type PizzaCartType = {
	imageUrl: string;
	price: number;
	title: string;
	count: number;
	size: number;
	width: string;
};

export type IdsType = Record<string, Record<string, string>>;

export type CartStateType = {
	pizzas: Record<string, PizzaCartType>;
	totalCount: number;
	totalPrice: number;
	ids: IdsType;
	visitedPages: Record<string, boolean>;
};

export type PizzaCartAddedType = {
	pizza: Omit<PizzaCartType, 'count'>;
	pizzaCartId: string;
};
