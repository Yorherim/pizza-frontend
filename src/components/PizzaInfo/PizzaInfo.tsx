import React from 'react';

import styles from './PizzaInfo.module.scss';
import { PizzaInfoPropsType } from './types';

export const PizzaInfo: React.FC<PizzaInfoPropsType> = ({ imageUrl, title, price }) => {
	return (
		<div className={styles.pizzaInfo}>
			<img className={styles.img} src={imageUrl} alt="pizza" />
			<h2 className={styles.title}>{title}</h2>
			<div className={styles.price}>{`цена: ${price} ₽`}</div>
		</div>
	);
};
