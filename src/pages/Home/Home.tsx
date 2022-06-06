import React from 'react';

import styles from './Home.module.scss';

import { Categories, Header, Sort } from '../../components';
import clsx from 'clsx';

export const HomePage: React.FC = () => {
	return (
		<div className="wrapper">
			<Header />
			<main className={styles.body}>
				<div className={clsx('container', styles.sorting)}>
					<Categories />
					<Sort />
				</div>
			</main>
		</div>
	);
};
