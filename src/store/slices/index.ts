import pizzaReducer, { pizzaActions } from './pizza/pizza';
import filterPizzaReducer, { filterPizzaActions } from './filter-pizza/filter-pizza';
import appReducer, { appActions } from './app/app';
import cartReducer, { cartActions } from './cart/cart';

const allActions = {
	...pizzaActions,
	...filterPizzaActions,
	...appActions,
	...cartActions,
};

export { pizzaReducer, filterPizzaReducer, appReducer, cartReducer, allActions };
