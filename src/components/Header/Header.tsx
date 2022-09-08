import React from 'react';

import styles from './Header.module.scss';

import { Link, useLocation } from 'react-router-dom';
import { CartIcon, LogoIcon } from '../icons';
import { Search } from '../Search/Search';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export const Header: React.FC = () => {
	const location = useLocation();
	const { totalPrice, totalCount } = useSelector((state: RootState) => state.cart);
	const logoPath = window.location.search ? `/${window.location.search}` : '/';
	const cartPage = window.location.pathname === '/cart';

	return (
		<>
			<div className="container">
				<header className={styles.header}>
					<Link to={'/'} className={styles.logo}>
						<LogoIcon />
						<div className={styles.logo__text}>
							<h2 className={styles.logo__title}>REACT PIZZA</h2>
							<span className={styles.logo__description}>самая вкусная пицца во вселенной</span>
						</div>
					</Link>
					{!cartPage && <Search />}
					<Link to="/cart" className={styles.button} state={{ from: location }}>
						<div className={styles.button__left}>
							{totalPrice} <span>₽</span>
						</div>
						<div className={styles.line}></div>
						<div className={styles.button__right}>
							<CartIcon className={styles.svg} />
							<span>{totalCount}</span>
						</div>
					</Link>
				</header>
			</div>
			<div className={styles.divider}></div>
		</>
	);
};
