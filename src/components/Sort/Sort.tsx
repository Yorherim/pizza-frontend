import clsx from 'clsx';
import React, { useState } from 'react';

import styles from './Sort.module.scss';

const listOfSorts = ['популярности', 'по цене', 'по алфавиту'];

export const Sort: React.FC = () => {
	const [active, setActive] = useState<boolean>(false);
	const [sortBy, setSortBy] = useState<string>(listOfSorts[0]);

	return (
		<div
			className={styles.sort}
			onClick={() => setActive(!active)}
			//onBlur={() => setActive(false)}
		>
			<div
				className={clsx(styles.sort__arrow, { [styles.sort__arrow_active]: active })}
			></div>
			<span className={styles.sort__text}>Сортировка по:</span>
			<span className={styles.sort__orange}>{sortBy}</span>

			{active && (
				<ul className={styles.sort__modal}>
					{listOfSorts.map((sort, i) => (
						<li
							key={`${sort}-${i}`}
							className={clsx(styles.sort__item, {
								[styles.sort__item_active]: sortBy === sort,
							})}
							onClick={() => setSortBy(sort)}
						>
							{sort}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
