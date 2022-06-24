import React from 'react';

import styles from './CartEmpty.module.scss';

import HumanImg from '../../assets/img/human.png';

export const CartEmpty: React.FC = () => {
	return (
		<div className={styles.cartEmpty}>
			<h2 className={styles.cartEmpty__title}>Корзина пустая 😕</h2>
			<p className={styles.cartEmpty__text}>
				Вероятней всего, вы не заказывали ещё пиццу.
				<br /> Для того, чтобы заказать пиццу, перейди на главную страницу.
			</p>
			<img src={HumanImg} alt="human with empty cart" className={styles.cartEmpty__img} />
			<button className={styles.cartEmpty__button}>Вернуться назад</button>
		</div>
	);
};
