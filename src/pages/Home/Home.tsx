import React, { useEffect } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import styles from './Home.module.scss';

import { Categories, Pizza, Sort, PizzaSkeleton, Pagination } from '../../components';
import { RootState } from '../../store/store';
import { setPizzas, changeLoading } from '../../store/slices/pizza/pizza';
import { changePagesCount } from '../../store/slices/filter-pizza/filter-pizza';
import { PizzaType } from '../../store/slices/pizza/types';

export const HomePage: React.FC = () => {
	const { pizzas, loading } = useSelector((state: RootState) => state.pizza);
	const { activeCategoryId, sortBy, currentPageIndex, search } = useSelector(
		(state: RootState) => state.filterPizza,
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(changeLoading(true));

		// меняем desc на asc, если сортировка сделана по названию из-за особенностей апи
		// то есть апи c sortBy=title&order=desc работает наоборот
		const orderParam = sortBy.sort === 'title' ? 'asc' : 'desc';
		const categoryParam = activeCategoryId !== 0 ? `category=${activeCategoryId}` : '';
		const pageParam = currentPageIndex + 1;
		const searchParam = search ? `&search=${search}` : '';

		(async () => {
			const pizzas: PizzaType[] = await (
				await axios.get(
					`${process.env.REACT_APP_API_URL}?${categoryParam}&page=${pageParam}&limit=4&sortBy=${sortBy.sort}&order=${orderParam}${searchParam}`,
				)
			).data;

			// бэкенд не присылает количество всех страниц, поэтому захардкодим
			const pagesCount = Math.ceil(10 / 4);

			dispatch(changePagesCount(pagesCount));
			dispatch(setPizzas(pizzas));
			dispatch(changeLoading(false));
		})();
	}, [activeCategoryId, sortBy, currentPageIndex, search]);

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
