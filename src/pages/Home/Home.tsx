import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { shallowEqual, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import styles from './Home.module.scss';

import {
	Categories,
	Pizza,
	Sort,
	PizzaSkeleton,
	Pagination,
	PizzasZeroText,
	PizzasRejectedFetch,
} from '../../components';
import { useActions, usePrevFilters, useQueryString, useThunks } from '../../hooks';
import { QsParamsType } from '../../store/slices/filter-pizza/types';
import { pizzaSelectors, filterSelectors, appSelectors } from '../../store/slices';

export const HomePage: React.FC = () => {
	// 1 render - initialized
	// 2 render - isInitialized() action
	// 3 render - fetch pizzas
	// 4 render - из-за особенностей работы с createAsyncThunk
	// сначала срабатывает dispatch санки - стейт типо меняется из-за диспатча
	// а затем срабатывает fulllfiled (если request.ok) и он меняет стейт

	const init = useSelector(appSelectors.selectInit);
	const pizzas = useSelector(pizzaSelectors.selectPizzas);
	const status = useSelector(pizzaSelectors.selectStatus);

	//const { pizzas, status } = useSelector(selectAllPizzaFields);
	const { activeCategoryId, sortBy, currentPageIndex, search } = useSelector(
		filterSelectors.selectAllFilters,
		shallowEqual,
	);

	const {
		app: { isInitialized },
		filterPizza: { setUrlParams },
	} = useActions();
	const {
		pizza: { fetchPizzas },
	} = useThunks();

	const navigate = useNavigate();
	const isFirstRender = useRef(true);
	const queryString = useQueryString();
	const { checkCurrentFiltersWithPrevFilteres } = usePrevFilters();

	// отменяем при первом рендере изменение URL
	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
		} else {
			navigate(`?${queryString}`);
		}
	}, [activeCategoryId, sortBy, currentPageIndex, search]);

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1)) as QsParamsType;
			setUrlParams(params);
		}
		isInitialized();
		console.log('isInitialized');
	}, []);

	useEffect(() => {
		if (init) {
			fetchPizzas({
				queryString,
				currentPageIndex,
				checkCurrentFiltersWithPrevFilteres: checkCurrentFiltersWithPrevFilteres({
					activeCategoryId,
					sortBy,
					currentPageIndex,
					search,
				}),
			});
			console.log('fetch pizzas');
		}
	}, [activeCategoryId, sortBy, currentPageIndex, search, init]);

	const renders = {
		pizzas: !pizzas.length ? (
			<PizzasZeroText />
		) : (
			pizzas.map((pizza) => <Pizza key={pizza.id} {...pizza} />)
		),
		skeleton: [...new Array(4)].map((_, i) => <PizzaSkeleton key={i} />),
		errorPizzas: <PizzasRejectedFetch />,
	};

	return (
		<main className={styles.body}>
			<div className="container">
				<div className={clsx(styles.sorting)}>
					<Categories />
					<Sort />
				</div>

				<div className={styles.pizzas}>
					<h2 className={styles.pizzas__title}>Все пиццы</h2>
					<div className={styles.pizzas__wrapper}>
						{status === 'success'
							? renders.pizzas
							: status === 'loading'
							? renders.skeleton
							: renders.errorPizzas}
					</div>
				</div>

				<Pagination />
			</div>
		</main>
	);
};
