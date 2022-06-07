import clsx from 'clsx';
import React, { useState } from 'react';

import styles from './Pizza.module.scss';

import { PizzaButton } from './PizzaButton/PizzaButton';

type PizzaPropsType = {
	imgUrl: string;
	title: string;
	traditionWidth: boolean;
	sizes: {
		25: boolean;
		30: boolean;
		35: boolean;
	};
	prise: number;
	count: number;
};
type PizzaSizesType = 25 | 30 | 35;

export const Pizza: React.FC<PizzaPropsType> = ({
	imgUrl,
	title,
	traditionWidth,
	sizes,
	prise,
	count,
}) => {
	const [activeWidth, setActiveWidth] = useState<number>(0);
	const [activeSize, setActiveSize] = useState<PizzaSizesType>(25);

	return (
		<div className={styles.pizza}>
			<img src="/assets/img/image 2.jpg" className={styles.pizza__img} />
			<span className={styles.pizza__title}>{title}</span>
			<div className={styles.pizza__tabs}>
				<div className={styles.pizza__box}>
					<button
						className={clsx(styles.pizza__tab, styles.pizza__tab_width, {
							[styles.pizza__tab_active]: activeWidth === 0,
						})}
						onClick={() => setActiveWidth(0)}
					>
						тонкое
					</button>
					<button
						className={clsx(styles.pizza__tab, styles.pizza__tab_width, {
							[styles.pizza__tab_active]: activeWidth === 1,
							[styles.pizza__tab_disable]: !traditionWidth,
						})}
						onClick={() => setActiveWidth(1)}
					>
						традиционное
					</button>
				</div>
				<div className={styles.pizza__box}>
					<button
						className={clsx(styles.pizza__tab, styles.pizza__tab_size, {
							[styles.pizza__tab_active]: activeSize === 25,
							[styles.pizza__tab_disable]: !sizes[25],
						})}
						onClick={() => setActiveSize(25)}
					>
						25 см.
					</button>
					<button
						className={clsx(styles.pizza__tab, styles.pizza__tab_size, {
							[styles.pizza__tab_active]: activeSize === 30,
							[styles.pizza__tab_disable]: !sizes[30],
						})}
						onClick={() => setActiveSize(30)}
					>
						30 см.
					</button>
					<button
						className={clsx(styles.pizza__tab, styles.pizza__tab_size, {
							[styles.pizza__tab_active]: activeSize === 35,
							[styles.pizza__tab_disable]: !sizes[35],
						})}
						onClick={() => setActiveSize(35)}
					>
						35 см.
					</button>
				</div>
			</div>

			<div className={styles.pizza__bottom}>
				<span className={styles.pizza__prise}>{prise} ₽</span>
				<PizzaButton count={count} />
			</div>
		</div>
	);
};
