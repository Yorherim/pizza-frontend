import clsx from 'clsx';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { sortTitles } from '../../data';
import { useActions } from '../../hooks';
import { RootState } from '../../store/store';

import styles from './Sort.module.scss';

const Sort: React.FC = () => {
	const { changeSortBy } = useActions();
	const sortBy = useSelector((state: RootState) => state.filterPizza.sortBy);
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
					{Object.values(sortTitles).map((sort, i) => (
						<li
							key={`${sort}-${i}`}
							className={clsx(styles.sort__item, {
								[styles.sort__item_active]: sortBy === sort,
							})}
							onClick={() => changeSortBy(sort)}
						>
							{sort.value}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default React.memo(Sort);
