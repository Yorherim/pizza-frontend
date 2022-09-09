import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PizzaCart } from '..';
import { useActions } from '../../hooks';
import { cartSelectors } from '../../store/slices';
import { ArrowIcon, CartBlackIcon, TrashIcon } from '../icons';

import styles from './Cart.module.scss';

type CartPropsType = {};

export const Cart: React.FC<CartPropsType> = () => {
	const pizzas = useSelector(cartSelectors.selectPizzas);
	const { totalCount, totalPrice } = useSelector(cartSelectors.selectCart);
	const {
		cart: { deleteAllPizzas },
	} = useActions();

	const options = {
		pizzasKeys: Object.keys(pizzas),
	};

	const callbacks = {
		deleteAllPizzas: () => {
			if (window.confirm('Вы действительно хотите очистить корзину?')) {
				deleteAllPizzas();
			}
		},
	};

	return (
		<div className={styles.cart}>
			<div className={styles.cart__top}>
				<div className={styles.cart__top_left}>
					<CartBlackIcon />
					<h2 className={styles.cart__title}>Корзина</h2>
				</div>

				<div className={styles.cart__clear} onClick={callbacks.deleteAllPizzas}>
					<TrashIcon />
					Очистить корзину
				</div>
			</div>

			<div className={styles.cart__pizzas}>
				{Object.values(pizzas).map((pizza, i) => {
					return (
						<PizzaCart
							key={options.pizzasKeys[i]}
							{...pizza}
							id={options.pizzasKeys[i]}
							price={pizza.count * pizza.price}
						/>
					);
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
