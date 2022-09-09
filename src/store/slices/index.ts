import pizzaReducer, { pizzaActions, pizzaThunks } from './pizza/pizza';
import filterPizzaReducer, { filterPizzaActions } from './filter-pizza/filter-pizza';
import appReducer, { appActions } from './app/app';
import cartReducer, { cartActions } from './cart/cart';
import * as filterSelectors from './filter-pizza/selectors';
import * as pizzaSelectors from './pizza/selectors';
import * as appSelectors from './app/selectors';
import * as cartSelectors from './cart/selectors';

const allActions = {
	pizzaActions,
	filterPizzaActions,
	appActions,
	cartActions,
};

const allThunks = {
	pizzaThunks,
};

export {
	pizzaReducer,
	filterPizzaReducer,
	appReducer,
	cartReducer,
	allActions,
	allThunks,
	filterSelectors,
	pizzaSelectors,
	appSelectors,
	cartSelectors,
};
