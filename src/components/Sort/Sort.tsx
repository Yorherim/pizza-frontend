import clsx from 'clsx';
import React, { useState } from 'react';

import styles from './Sort.module.scss';
import { SortPropsType } from './types';

export const Sort: React.FC<SortPropsType> = ({ sortList, sortBy, setSortBy }) => {
	const [active, setActive] = useState<boolean>(false);

	return (
		<div
			className={styles.sort}
			onClick={() => setActive(!active)}
			//onBlur={() => setActive(false)}
		>
			<div className={clsx(styles.sort__arrow, { [styles.sort__arrow_active]: active })}></div>
			<span className={styles.sort__text}>Сортировка по:</span>
			<span className={styles.sort__orange}>{sortBy.value}</span>

			{active && (
				<ul className={styles.sort__modal}>
					{sortList.map((sort, i) => (
						<li
							key={`${sort}-${i}`}
							className={clsx(styles.sort__item, {
								[styles.sort__item_active]: sortBy === sort,
							})}
							onClick={() => setSortBy(sort)}
						>
							{sort.value}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
