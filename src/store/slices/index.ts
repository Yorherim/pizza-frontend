import pizzaReducer, { pizzaActions, pizzaThunks } from './pizza/pizza';
import filterPizzaReducer, { filterPizzaActions } from './filter-pizza/filter-pizza';
import appReducer, { appActions } from './app/app';
import cartReducer, { cartActions } from './cart/cart';

const allActions = {
	pizzaActions,
	filterPizzaActions,
	appActions,
	cartActions,
};

const allThunks = {
	pizzaThunks,
};

export { pizzaReducer, filterPizzaReducer, appReducer, cartReducer, allActions, allThunks };
