import React, { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';

import styles from './Home.module.scss';

import { Categories, Pizza, Sort, PizzaSkeleton } from '../../components';
import { PizzaType, SortByType } from './types';
import { categoriesList, sortTitles } from '../../data';

export const HomePage: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [pizzas, setPizzas] = useState([] as PizzaType[]);
	const [activeCategoryId, setActiveCategoryId] = useState<number>(0);
	const [sortBy, setSortBy] = useState<SortByType>(sortTitles.rating);

	useEffect(() => {
		setLoading(true);

		// меняем desc на asc, если сортировка сделана по названию из-за особенностей апи
		// то есть апи c sortBy=title&order=desc работает наоборот
		const orderParam = sortBy.sort === 'title' ? 'asc' : 'desc';
		const categoryParam = activeCategoryId !== 0 ? `category=${activeCategoryId}` : '';

		(async () => {
			const pizzas: PizzaType[] = await (
				await axios.get(
					`${process.env.REACT_APP_API_URL}?${categoryParam}&sortBy=${sortBy.sort}&order=${orderParam}`,
				)
			).data;
			setPizzas(pizzas);
			setLoading(false);
		})();
	}, [activeCategoryId, sortBy]);

	const options = {
		sortList: useMemo(() => {
			return Object.values(sortTitles);
		}, []),
		categories: useMemo(() => categoriesList, []),
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
						{!loading
							? pizzas.map((pizza) => <Pizza key={pizza.id} {...pizza} />)
							: [...new Array(8)].map((_, i) => <PizzaSkeleton key={i} />)}
					</div>
				</div>
			</div>
		</main>
	);
};
