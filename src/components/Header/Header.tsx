import React from 'react';

import styles from './Header.module.scss';

import { LogoIcon, CartIcon } from '../../assets/icons';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
	return (
		<>
			<div className="container">
				<header className={styles.header}>
					<Link to="/" className={styles.logo}>
						<img src={LogoIcon} alt="logo" />
						<div className={styles.logo__text}>
							<h2 className={styles.logo__title}>REACT PIZZA</h2>
							<span className={styles.logo__description}>
								самая вкусная пицца во вселенной
							</span>
						</div>
					</Link>

					<Link to="/cart" className={styles.button}>
						<div className={styles.button__left}>520 ₽</div>
						<div className={styles.line}></div>
						<div className={styles.button__right}>
							<img src={CartIcon} alt="cart" /> 3
						</div>
					</Link>
				</header>
			</div>
			<div className={styles.divider}></div>
		</>
	);
};
