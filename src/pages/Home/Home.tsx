import React from 'react';

import styles from './Home.module.scss';

import { Categories, Pizza, Sort } from '../../components';
import clsx from 'clsx';

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
							imgUrl="/assets/img/cheese.png"
							title="Чизбургер-пицца"
							count={0}
							sizes={{ 25: true, 30: true, 35: true }}
							prise={395}
							traditionWidth={true}
						/>
						<Pizza
							imgUrl="/assets/img/cheese.png"
							title="Чизбургер-пицца"
							count={0}
							sizes={{ 25: true, 30: true, 35: true }}
							prise={395}
							traditionWidth={true}
						/>
						<Pizza
							imgUrl="/assets/img/cheese.png"
							title="Чизбургер-пицца"
							count={0}
							sizes={{ 25: true, 30: true, 35: true }}
							prise={395}
							traditionWidth={true}
						/>
						<Pizza
							imgUrl="/assets/img/cheese.png"
							title="Чизбургер-пицца"
							count={0}
							sizes={{ 25: true, 30: true, 35: true }}
							prise={395}
							traditionWidth={true}
						/>
						<Pizza
							imgUrl="/assets/img/cheese.png"
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
