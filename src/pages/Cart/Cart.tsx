import clsx from 'clsx';
import React, { useState } from 'react';

import styles from './Cart.module.scss';

import { CartBlackIcon, ArrowIcon, TrashIcon } from '../../assets/icons';
import { CartEmpty, PizzaCart } from '../../components';
import { Link } from 'react-router-dom';

export const CartPage: React.FC = () => {
	const [empty, setEmpty] = useState(false);

	return (
		<main className={styles.cart}>
			<div className="container">
				{!empty ? (
					<div className={styles.cart__inner}>
						<div className={styles.cart__top}>
							<div className={styles.cart__top_left}>
								<img src={CartBlackIcon} alt="black cart icon" />
								<h2 className={styles.cart__title}>Корзина</h2>
							</div>

							<div className={styles.cart__clear}>
								<img src={TrashIcon} alt="trash icon" />
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
								<Link
									to="/"
									className={clsx(
										styles.buttons__button,
										styles.buttons__button_gray,
									)}
								>
									<img src={ArrowIcon} alt="arrow icon" />
									Вернуться назад
								</Link>
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
