import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';

import styles from './Home.module.scss';

import { Categories, Pizza, Sort, PizzaSkeleton } from '../../components';

type PizzaType = {
	id: string;
	title: string;
	widths: (0 | 1)[];
	sizes: (25 | 30 | 35)[];
	price: number;
	img: string;
};

export const HomePage: React.FC = () => {
	const [pizzas, setPizzas] = useState([] as PizzaType[]);

	useEffect(() => {
		(async () => {
			const pizzas: PizzaType[] = await (
				await axios.get(`${process.env.REACT_APP_API_URL}`)
			).data;
			setPizzas(pizzas);
		})();
	}, []);

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
						{pizzas.length
							? pizzas.map((pizza) => <Pizza key={pizza.id} {...pizza} />)
							: [...new Array(4)].map((_, i) => <PizzaSkeleton key={i} />)}
					</div>
				</div>
			</div>
		</main>
	);
};
