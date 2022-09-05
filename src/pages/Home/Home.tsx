import React, { useEffect } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import styles from './Home.module.scss';

import { Categories, Pizza, Sort, PizzaSkeleton, Pagination } from '../../components';
import { RootState } from '../../store/store';
import { PizzaType } from '../../store/slices/pizza/types';
import { useActions } from '../../hooks';
import { QsParamsType } from '../../store/slices/filter-pizza/types';

export const HomePage: React.FC = () => {
	const { init, firstRender } = useSelector((state: RootState) => state.app);
	const { pizzas, loading } = useSelector((state: RootState) => state.pizza);
	const { activeCategoryId, sortBy, currentPageIndex, search } = useSelector(
		(state: RootState) => state.filterPizza,
	);
	const navigate = useNavigate();
	const {
		setPizzas,
		changeLoading,
		changePagesCount,
		setUrlParams,
		isInitialized,
		cancelFirstRender,
	} = useActions();

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

			// меняем desc на asc, если сортировка сделана по названию из-за особенностей апи
			// то есть апи c sortBy=title&order=desc работает наоборот
			const orderParam = sortBy.sort === 'title' ? 'asc' : 'desc';

			const qsParams = {} as QsParamsType;
			if (activeCategoryId) qsParams.category = activeCategoryId.toString();
			if (orderParam) qsParams.order = orderParam;
			if (search) qsParams.search = search;
			qsParams.limit = `4`;
			qsParams.sortBy = sortBy.sort;
			qsParams.page = (currentPageIndex + 1).toString();

			const queryString = qs.stringify(qsParams);

			// если это не первый рендер, то добавляем queryString в URL
			if (!firstRender) navigate(`?${queryString}`);

			(async () => {
				const pizzas: PizzaType[] = await (
					await axios.get(`${process.env.REACT_APP_API_URL}?${queryString}`)
				).data;

				// бэкенд не присылает количество всех страниц, поэтому захардкодим
				const pagesCount = Math.ceil(10 / 4);

				changePagesCount(pagesCount);
				setPizzas(pizzas);
				changeLoading(false);
				cancelFirstRender();
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
