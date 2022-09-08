import React from 'react';

import styles from './CartEmpty.module.scss';

import HumanImg from '../../assets/img/human.png';
import { Link, useLocation } from 'react-router-dom';
import { LocationStateType } from '../../utils/types/location-state';

export const CartEmpty: React.FC = () => {
	const location = useLocation();
	const fromPage = (location.state as LocationStateType)?.from?.pathname || '/';

	return (
		<div className={styles.cartEmpty}>
			<h2 className={styles.cartEmpty__title}>Корзина пустая 😕</h2>
			<p className={styles.cartEmpty__text}>
				Вероятней всего, вы не заказывали ещё пиццу.
				<br /> Для того, чтобы заказать пиццу, перейдите на главную страницу.
			</p>
			<img src={HumanImg} alt="human with empty cart" className={styles.cartEmpty__img} />
			<Link to={fromPage} className={styles.cartEmpty__button}>
				Вернуться назад
			</Link>
		</div>
	);
};
