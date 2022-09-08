import { PizzaType } from './../pizza/types';
import { cartReducer } from '..';
import { cartActions } from './cart';
import { CartStateType, PizzaCartType } from './types';

let state: CartStateType;
let pizzas: PizzaType[];
const { addPizza, decrementPizza, deleteAllPizzas, deletePizzasById, incrementPizza } = cartActions;

beforeEach(() => {
	state = {
		pizzas: {
			'1': {
				count: 1,
				imageUrl: 'blabla',
				price: 500,
				size: 25,
				title: 'Пепперони',
				width: 'тонкое',
			},
			'2': {
				count: 3,
				imageUrl: 'blablabla',
				price: 250,
				size: 30,
				title: 'Овощи и грибы',
				width: 'толстое',
			},
		},
		totalCount: 4,
		totalPrice: 1250,
		ids: {},
		visitedPages: {},
	};
	pizzas = [
		{
			id: '7',
			imageUrl:
				'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg',
			title: 'Маргарита',
			widths: [0, 1],
			sizes: [25, 30, 35],
			price: 450,
			category: 4,
			rating: 10,
		},
		{
			id: '8',
			imageUrl:
				'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg',
			title: 'Четыре сезона',
			widths: [0, 1],
			sizes: [25, 30, 35],
			price: 395,
			category: 5,
			rating: 10,
		},
		{
			id: '6',
			imageUrl:
				'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d2e337e9-e07a-4199-9cc1-501cc44cb8f8.jpg',
			title: 'Пепперони',
			widths: [0, 1],
			sizes: [25, 30, 35],
			price: 675,
			category: 1,
			rating: 9,
		},
		{
			id: '4',
			imageUrl:
				'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg',
			title: 'Чизбургер-пицца',
			widths: [0, 1],
			sizes: [25, 30, 35],
			price: 415,
			category: 3,
			rating: 8,
		},
	];
});

test('should add pizza', () => {
	const pizza: Omit<PizzaCartType, 'count' | 'id' | 'category' | 'rating'> = {
		imageUrl: 'rara',
		price: 300,
		size: 25,
		title: 'Новая пицца',
		width: 'тонкое',
	};
	const pizzaCartId = '3';

	const newState = cartReducer(state, addPizza({ pizza, pizzaCartId }));

	expect(Object.keys(newState.pizzas)).toHaveLength(3);
	expect(newState.pizzas['3'].title).toBe('Новая пицца');
	expect(newState.pizzas['3'].count).toBe(1);
	expect(newState.totalCount).toBe(5);
	expect(newState.totalPrice).toBe(1550);

	const newState2 = cartReducer(newState, addPizza({ pizza, pizzaCartId }));

	expect(Object.keys(newState2.pizzas)).toHaveLength(3);
	expect(newState2.pizzas['3'].count).toBe(2);
	expect(newState2.totalCount).toBe(6);
	expect(newState2.totalPrice).toBe(1850);
});

test('should increment pizza', () => {
	const newState = cartReducer(state, incrementPizza('1'));

	expect(newState.pizzas['1'].count).toBe(2);
	expect(newState.totalCount).toBe(5);
	expect(newState.totalPrice).toBe(1750);
});

test('should decrement pizza', () => {
	const newState = cartReducer(state, decrementPizza('2'));

	expect(newState.pizzas['2'].count).toBe(2);
	expect(newState.totalCount).toBe(3);
	expect(newState.totalPrice).toBe(1000);

	const newState2 = cartReducer(newState, decrementPizza('1'));

	expect(Object.values(newState2.pizzas)).toHaveLength(1);
});

test('should delete pizzas by id', () => {
	const newState = cartReducer(state, deletePizzasById('2'));

	expect(Object.keys(newState.pizzas)).toHaveLength(1);
	expect(newState.totalCount).toBe(1);
	expect(newState.totalPrice).toBe(500);
});

test('should delete all pizzas from cart', () => {
	const newState = cartReducer(state, deleteAllPizzas());

	expect(Object.keys(newState.pizzas)).toHaveLength(0);
	expect(newState.totalCount).toBe(0);
	expect(newState.totalPrice).toBe(0);
});
