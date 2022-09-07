import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PizzaCart } from '..';
import { useActions } from '../../hooks';
import { RootState } from '../../store/store';
import { ArrowIcon, CartBlackIcon, TrashIcon } from '../icons';

import styles from './Cart.module.scss';

type CartPropsType = {};

export const Cart: React.FC<CartPropsType> = () => {
	const pizzas = useSelector((state: RootState) => state.cart.pizzas);
	const totalCount = useSelector((state: RootState) => state.cart.totalCount);
	const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
	const {
		cart: { deleteAllPizzasInCart },
	} = useActions();

	const options = {
		pizzasKeys: Object.keys(pizzas),
	};

	return (
		<div className={styles.cart}>
			<div className={styles.cart__top}>
				<div className={styles.cart__top_left}>
					<CartBlackIcon />
					<h2 className={styles.cart__title}>Корзина</h2>
				</div>

				<div className={styles.cart__clear} onClick={() => deleteAllPizzasInCart()}>
					<TrashIcon />
					Очистить корзину
				</div>
			</div>

			<div className={styles.cart__pizzas}>
				{Object.values(pizzas).map((pizza, i) => {
					return <PizzaCart key={options.pizzasKeys[i]} {...pizza} id={options.pizzasKeys[i]} />;
				})}
			</div>

			<div className={styles.cart__bottom}>
				<div className={styles.cart__info}>
					<div className={styles.cart__count}>
						Всего пицц: <span>{totalCount} шт.</span>
					</div>
					<div className={styles.cart__price}>
						Сумма заказа: <span>{totalPrice} ₽</span>
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
