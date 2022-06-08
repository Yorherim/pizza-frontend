import React from 'react';

import styles from './PizzaCart.module.scss';

import { MinusIcon, PlusIcon } from './icons';
import clsx from 'clsx';

//type PizzaCartPropsType = {};

export const PizzaCart: React.FC = () => {
	return (
		<div className={styles.pizzaCart}>
			<div className={styles.pizzaCart__body}>
				<div className={styles.pizza}>
					<img
						src="/assets/img/cheese-chiken.png"
						alt="pizza"
						className={styles.pizza__img}
					/>
					<div className={styles.pizza__text}>
						<span className={styles.pizza__title}>Сырный цыпленок</span>
						<span className={styles.pizza__description}>тонкое тесто, 26 см.</span>
					</div>
				</div>

				<div className={styles.pizza__functions}>
					<div className={styles.addButtons}>
						<button className={clsx(styles.button, styles.addButtons__button)}>
							<MinusIcon />
						</button>
						Добавить
						<button className={clsx(styles.button, styles.addButtons__button)}>
							<PlusIcon />
						</button>
					</div>
					<span className={styles.price}>770 ₽</span>
					<button className={clsx(styles.button, styles.clear)}>
						<PlusIcon />
					</button>
				</div>
			</div>
		</div>
	);
};
