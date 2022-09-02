import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowIcon, CartBlackIcon, TrashIcon } from '../icons';
import { PizzaCart } from '../PizzaCart/PizzaCart';

import styles from './Cart.module.scss';

type CartPropsType = {};

export const Cart: React.FC<CartPropsType> = () => {
	return (
		<div className={styles.cart}>
			<div className={styles.cart__top}>
				<div className={styles.cart__top_left}>
					<CartBlackIcon />
					<h2 className={styles.cart__title}>Корзина</h2>
				</div>

				<div className={styles.cart__clear}>
					<TrashIcon />
					Очистить корзину
				</div>
			</div>

			<div className={styles.cart__pizzas}>
				<PizzaCart />
				<PizzaCart />
			</div>

			<div className={styles.cart__bottom}>
				<div className={styles.cart__info}>
					<div className={styles.cart__count}>
						Всего пицц: <span>3 шт.</span>
					</div>
					<div className={styles.cart__price}>
						Сумма заказа: <span>900 ₽</span>
					</div>
				</div>
				<div className={styles.buttons}>
					<Link to="/" className={clsx(styles.buttons__button, styles.buttons__button_gray)}>
						<ArrowIcon />
						Вернуться назад
					</Link>
					<button className={clsx(styles.buttons__button, styles.buttons__button_orange)}>
						Оплатить сейчас
					</button>
				</div>
			</div>
		</div>
	);
};
