import React from 'react';

import styles from './NotFound.module.scss';

export const NotFoundPage: React.FC = () => {
	return (
		<div className="container">
			<div className={styles.message}>
				<span>😕</span>
				<h1 className={styles.title}>Ничего не найдено</h1>
				<h2 className={styles.text}>Данная страница отсутствует в нашем интернет-магазине</h2>
			</div>
		</div>
	);
};
