import clsx from 'clsx';
import React, { useState } from 'react';

import styles from './Pizza.module.scss';

import { PizzaButton } from './PizzaButton/PizzaButton';

type PizzaPropsType = {
	img: string;
	title: string;
	widths: number[];
	sizes: number[];
	price: number;
	count?: number;
};
type PizzaSizesType = 25 | 30 | 35;

export const Pizza: React.FC<PizzaPropsType> = ({ img, title, widths, sizes, price, count }) => {
	const [activeWidth, setActiveWidth] = useState<number>(widths[0]);
	const [activeSize, setActiveSize] = useState<PizzaSizesType>(sizes[0] as PizzaSizesType);

	const checkSizes = () => {
		const sizesObj = {} as { [key: string]: boolean };
		sizes.forEach((s) => (sizesObj[s] = true));
		return sizesObj;
	};
	const checkedSizes = checkSizes();

	const checkWidths = () => {
		const widthsObj = {} as { [key: string]: boolean };
		widths.forEach((w) => (widthsObj[w] = true));
		return widthsObj;
	};
	const checkedWidths = checkWidths();

	return (
		<div className={styles.pizza}>
			<img src={require(`../../assets/img/pizzas/${img}`)} className={styles.pizza__img} />
			<span className={styles.pizza__title}>{title}</span>
			<div className={styles.pizza__tabs}>
				<div className={styles.pizza__box}>
					<button
						className={clsx(styles.pizza__tab, styles.pizza__tab_width, {
							[styles.pizza__tab_active]: activeWidth === 0,
							[styles.pizza__tab_disable]: !checkedWidths[0],
						})}
						onClick={() => setActiveWidth(0)}
					>
						тонкое
					</button>
					<button
						className={clsx(styles.pizza__tab, styles.pizza__tab_width, {
							[styles.pizza__tab_active]: activeWidth === 1,
							[styles.pizza__tab_disable]: !checkedWidths[1],
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
							[styles.pizza__tab_disable]: !checkedSizes[25],
						})}
						onClick={() => setActiveSize(25)}
					>
						25 см.
					</button>
					<button
						className={clsx(styles.pizza__tab, styles.pizza__tab_size, {
							[styles.pizza__tab_active]: activeSize === 30,
							[styles.pizza__tab_disable]: !checkedSizes[30],
						})}
						onClick={() => setActiveSize(30)}
					>
						30 см.
					</button>
					<button
						className={clsx(styles.pizza__tab, styles.pizza__tab_size, {
							[styles.pizza__tab_active]: activeSize === 35,
							[styles.pizza__tab_disable]: !checkedSizes[35],
						})}
						onClick={() => setActiveSize(35)}
					>
						35 см.
					</button>
				</div>
			</div>

			<div className={styles.pizza__bottom}>
				<span className={styles.pizza__prise}>{price} ₽</span>
				<PizzaButton count={count} />
			</div>
		</div>
	);
};
