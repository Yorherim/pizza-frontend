import { cartReducer } from '..';
import { cartActions } from './cart';
import { CartStateType, PizzaCartType } from './types';

let state: CartStateType;
const {
	addPizzaInCart: addPizza,
	decrementPizzaInCart: decrementPizza,
	deleteAllPizzasInCart: deleteAllPizzas,
	deletePizzasByIdInCart: deletePizzasById,
	incrementPizzaInCart: incrementPizza,
} = cartActions;

beforeEach(() => {
	state = {
		pizzas: [
			{
				id: '1',
				count: 1,
				imageUrl: 'blabla',
				price: 500,
				size: 25,
				title: 'Пепперони',
				width: 'тонкое',
			},
			{
				id: '2',
				count: 3,
				imageUrl: 'blablabla',
				price: 250,
				size: 30,
				title: 'Овощи и грибы',
				width: 'толстое',
			},
		],
		totalCount: 4,
		totalPrice: 1250,
	};
});

test('should add pizza', () => {
	const newPizza: Omit<PizzaCartType, 'id' | 'count'> = {
		imageUrl: 'rara',
		price: 300,
		size: 25,
		title: 'Новая пицца',
		width: 'тонкое',
	};

	const newState = cartReducer(state, addPizza(newPizza));

	expect(newState.pizzas).toHaveLength(3);
	expect(newState.pizzas[2].title).toBe('Новая пицца');
	expect(newState.pizzas[2].count).toBe(1);
	expect(newState.pizzas[2].id).toBeTruthy();
	expect(newState.totalCount).toBe(5);
	expect(newState.totalPrice).toBe(1550);

	const newState2 = cartReducer(newState, addPizza(newPizza));

	expect(newState2.pizzas).toHaveLength(3);
	expect(newState2.pizzas[2].count).toBe(2);
	expect(newState2.totalCount).toBe(6);
	expect(newState2.totalPrice).toBe(1850);
});

test('should increment pizza', () => {
	const newState = cartReducer(state, incrementPizza('1'));

	expect(newState.pizzas[0].count).toBe(2);
	expect(newState.totalCount).toBe(5);
	expect(newState.totalPrice).toBe(1750);
});

test('should decrement pizza', () => {
	const newState = cartReducer(state, decrementPizza('2'));

	expect(newState.pizzas[1].count).toBe(2);
	expect(newState.totalCount).toBe(3);
	expect(newState.totalPrice).toBe(1000);

	const newState2 = cartReducer(newState, decrementPizza('1'));

	expect(newState2.pizzas).toHaveLength(1);
	expect(newState2.pizzas[0].title).toBe('Овощи и грибы');
});

test('should delete pizzas by id', () => {
	const newState = cartReducer(state, deletePizzasById('2'));

	expect(newState.pizzas).toHaveLength(1);
	expect(newState.totalCount).toBe(1);
	expect(newState.totalPrice).toBe(500);
});

test('should delete all pizzas from cart', () => {
	const newState = cartReducer(state, deleteAllPizzas());

	expect(newState.pizzas).toHaveLength(0);
	expect(newState.totalCount).toBe(0);
	expect(newState.totalPrice).toBe(0);
});
