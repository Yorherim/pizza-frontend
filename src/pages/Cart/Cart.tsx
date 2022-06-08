import clsx from 'clsx';
import React, { useState } from 'react';
import { CartEmpty, PizzaCart } from '../../components';

import styles from './Cart.module.scss';
import { ArrowIcon, CartBlackIcon, TrashIcon } from './icons';

export const CartPage: React.FC = () => {
	const [empty, setEmpty] = useState(true);

	return (
		<main className={styles.cart}>
			<div className="container">
				{!empty ? (
					<div className={styles.cart__inner}>
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
								<button
									className={clsx(
										styles.buttons__button,
										styles.buttons__button_gray,
									)}
								>
									<ArrowIcon />
									Вернуться назад
								</button>
								<button
									className={clsx(
										styles.buttons__button,
										styles.buttons__button_orange,
									)}
								>
									Оплатить сейчас
								</button>
							</div>
						</div>
					</div>
				) : (
					<CartEmpty />
				)}
			</div>
		</main>
	);
};
