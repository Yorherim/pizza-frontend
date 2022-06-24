import React from 'react';
import clsx from 'clsx';

import styles from './Home.module.scss';

import { Cheese } from '../../assets/img/pizzas';
import { Categories, Pizza, Sort } from '../../components';

export const HomePage: React.FC = () => {
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
						<Pizza
							imgUrl={Cheese}
							title="Чизбургер-пицца"
							count={0}
							sizes={{ 25: true, 30: true, 35: true }}
							prise={395}
							traditionWidth={true}
						/>
						<Pizza
							imgUrl={Cheese}
							title="Чизбургер-пицца"
							count={0}
							sizes={{ 25: true, 30: true, 35: true }}
							prise={395}
							traditionWidth={true}
						/>
						<Pizza
							imgUrl={Cheese}
							title="Чизбургер-пицца"
							count={0}
							sizes={{ 25: true, 30: true, 35: true }}
							prise={395}
							traditionWidth={true}
						/>
						<Pizza
							imgUrl={Cheese}
							title="Чизбургер-пицца"
							count={0}
							sizes={{ 25: true, 30: true, 35: true }}
							prise={395}
							traditionWidth={true}
						/>
						<Pizza
							imgUrl={Cheese}
							title="Чизбургер-пицца"
							count={0}
							sizes={{ 25: true, 30: true, 35: true }}
							prise={395}
							traditionWidth={true}
						/>
						<Pizza
							imgUrl={Cheese}
							title="Чизбургер-пицца"
							count={0}
							sizes={{ 25: true, 30: true, 35: true }}
							prise={395}
							traditionWidth={true}
						/>
					</div>
				</div>
			</div>
		</main>
	);
};
