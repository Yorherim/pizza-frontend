import pizzaReducer, { pizzaActions } from './pizza/pizza';
import filterPizzaReducer, { filterPizzaActions } from './filter-pizza/filter-pizza';
import appReducer, { appActions } from './app/app';

const allActions = {
	...pizzaActions,
	...filterPizzaActions,
	...appActions,
};

export { pizzaReducer, filterPizzaReducer, appReducer, allActions };
