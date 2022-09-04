import React from 'react';

import styles from './Header.module.scss';

import { Link } from 'react-router-dom';
import { CartIcon, LogoIcon } from '../icons';
import { Search } from '../Search/Search';

export const Header: React.FC = () => {
	return (
		<>
			<div className="container">
				<header className={styles.header}>
					<Link to="/" className={styles.logo}>
						<LogoIcon />
						<div className={styles.logo__text}>
							<h2 className={styles.logo__title}>REACT PIZZA</h2>
							<span className={styles.logo__description}>самая вкусная пицца во вселенной</span>
						</div>
					</Link>
					<Search />
					<Link to="/cart" className={styles.button}>
						<div className={styles.button__left}>520 ₽</div>
						<div className={styles.line}></div>
						<CartIcon />
					</Link>
				</header>
			</div>
			<div className={styles.divider}></div>
		</>
	);
};
