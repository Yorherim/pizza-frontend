import React from 'react';
import clsx from 'clsx';

import styles from './PizzaCart.module.scss';

import { MinusIcon, PlusIcon } from '../icons';
import { useActions } from '../../hooks';
import { PizzaCartPropsType } from './types';

const PizzaCart: React.FC<PizzaCartPropsType> = ({
	imageUrl,
	count,
	price,
	size,
	title,
	width,
	id,
}) => {
	const {
		cart: { incrementPizzaInCart, decrementPizzaInCart, deletePizzasByIdInCart },
	} = useActions();

	return (
		<div className={styles.pizzaCart}>
			<div className={styles.pizzaCart__body}>
				<div className={styles.pizza}>
					<img src={imageUrl} alt="pizza" className={styles.pizza__img} />
					<div className={styles.pizza__text}>
						<span className={styles.pizza__title}>{title}</span>
						<span className={styles.pizza__description}>{`${width} тесто, ${size} см.`}</span>
					</div>
				</div>

				<div className={styles.pizza__functions}>
					<div className={styles.addButtons}>
						<button
							className={clsx(styles.button, styles.addButtons__button)}
							onClick={() => decrementPizzaInCart(id)}
						>
							<MinusIcon />
						</button>
						{count}
						<button
							className={clsx(styles.button, styles.addButtons__button)}
							onClick={() => incrementPizzaInCart(id)}
						>
							<PlusIcon />
						</button>
					</div>
					<span className={styles.price}>{`${price} ₽`}</span>
					<button
						className={clsx(styles.button, styles.clear)}
						onClick={() => deletePizzasByIdInCart(id)}
					>
						<PlusIcon />
					</button>
				</div>
			</div>
		</div>
	);
};

export default React.memo(PizzaCart);
