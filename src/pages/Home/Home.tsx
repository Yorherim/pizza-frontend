import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import styles from './Home.module.scss';

import { Categories, Pizza, Sort, PizzaSkeleton, Pagination } from '../../components';
import { RootState } from '../../store/store';
import { PizzaType } from '../../store/slices/pizza/types';
import { useActions, usePrevFilters, useQueryString } from '../../hooks';
import { QsParamsType } from '../../store/slices/filter-pizza/types';

export const HomePage: React.FC = () => {
	const { init } = useSelector((state: RootState) => state.app);
	const { pizzas, loading } = useSelector((state: RootState) => state.pizza);
	const { activeCategoryId, sortBy, currentPageIndex, search } = useSelector(
		(state: RootState) => state.filterPizza,
	);
	const visitedPages = useSelector((state: RootState) => state.cart.visitedPages);

	const {
		app: { isInitialized },
		pizza: { changeLoading, setPizzas },
		filterPizza: { changePagesCount, setUrlParams },
		cart: { addIds, addVisitedPages },
	} = useActions();

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
	}, []);

	useEffect(() => {
		if (init) {
			changeLoading(true);

			(async () => {
				const pizzas: PizzaType[] = await (
					await axios.get(`${process.env.REACT_APP_API_URL}?${queryString}`)
				).data;

				if (
					!visitedPages[currentPageIndex] ||
					!checkCurrentFiltersWithPrevFilteres({
						activeCategoryId,
						sortBy,
						currentPageIndex,
						search,
					})
				) {
					addIds(pizzas);
					addVisitedPages(currentPageIndex);
				}

				// бэкенд не присылает количество всех страниц, поэтому захардкодим
				const pagesCount = Math.ceil(10 / 4);

				changePagesCount(pagesCount);
				setPizzas(pizzas);
				changeLoading(false);
			})();
		}
	}, [activeCategoryId, sortBy, currentPageIndex, search, init]);

	const renders = {
		pizzas: !pizzas.length ? (
			<div className={styles.pizzas__zeroText}>К сожалению, таких пицц нет... 😕</div>
		) : (
			pizzas.map((pizza) => <Pizza key={pizza.id} {...pizza} />)
		),
		skeleton: [...new Array(4)].map((_, i) => <PizzaSkeleton key={i} />),
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
						{!loading ? renders.pizzas : renders.skeleton}
					</div>
				</div>

				<Pagination />
			</div>
		</main>
	);
};
