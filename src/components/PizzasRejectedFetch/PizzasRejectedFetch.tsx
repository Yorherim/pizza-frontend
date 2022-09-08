import React from 'react';

import styles from './PizzasRejectedFetch.module.scss';

export const PizzasRejectedFetch: React.FC = () => {
	return (
		<div className={styles.error}>
			<h2 className={styles.title}>Произошла ошибка 😕</h2>
			<p className={styles.text}>
				К сожалению, не удалось загрузить пиццы. Попробуйте повторить попытку позже.
			</p>
		</div>
	);
};
