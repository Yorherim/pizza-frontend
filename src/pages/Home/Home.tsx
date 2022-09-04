import React, { useCallback, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import styles from './Home.module.scss';

import { Categories, Pizza, Sort, PizzaSkeleton, Pagination } from '../../components';
import { PizzaType, SortByType } from './types';
import { categoriesList, sortTitles } from '../../data';

export const HomePage: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [pizzas, setPizzas] = useState([] as PizzaType[]);
	const [activeCategoryId, setActiveCategoryId] = useState<number>(0);
	const [sortBy, setSortBy] = useState<SortByType>(sortTitles.rating);
	const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
	const [pagesCount, setPagesCount] = useState<number>(0);

	useEffect(() => {
		setLoading(true);

		// меняем desc на asc, если сортировка сделана по названию из-за особенностей апи
		// то есть апи c sortBy=title&order=desc работает наоборот
		const orderParam = sortBy.sort === 'title' ? 'asc' : 'desc';
		const categoryParam = activeCategoryId !== 0 ? `category=${activeCategoryId}` : '';
		const pageParam = currentPageIndex + 1;

		(async () => {
			const pizzas: PizzaType[] = await (
				await axios.get(
					`${process.env.REACT_APP_API_URL}?${categoryParam}&page=${pageParam}&limit=4&sortBy=${sortBy.sort}&order=${orderParam}`,
				)
			).data;

			// бэкенд не присылает количество всех страниц, поэтому захардкодим
			const pagesCount = Math.ceil(10 / 4);

			setPagesCount(pagesCount);
			setPizzas(pizzas);
			setLoading(false);
		})();
	}, [activeCategoryId, sortBy, currentPageIndex]);

	const options = {
		sortList: useMemo(() => {
			return Object.values(sortTitles);
		}, []),
		categories: useMemo(() => categoriesList, []),
	};

	const callbacks = {
		changePage: useCallback((pageIndex: number) => setCurrentPageIndex(pageIndex), []),
	};

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
					<Categories
						categories={options.categories}
						activeCategoryId={activeCategoryId}
						setActiveCategoryId={(id) => setActiveCategoryId(id)}
					/>
					<Sort sortList={options.sortList} sortBy={sortBy} setSortBy={setSortBy} />
				</div>

				<div className={styles.pizzas}>
					<h2 className={styles.pizzas__title}>Все пиццы</h2>
					<div className={styles.pizzas__wrapper}>
						{!loading ? renders.pizzas : renders.skeleton}
					</div>
				</div>

				<Pagination pagesCount={pagesCount} setCurrentPageIndex={callbacks.changePage} />
			</div>
		</main>
	);
};
