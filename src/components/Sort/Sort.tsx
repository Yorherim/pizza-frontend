import clsx from 'clsx';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortTitles } from '../../data';
import { changeSortBy } from '../../store/slices/filter-pizza/filter-pizza';
import { RootState } from '../../store/store';

import styles from './Sort.module.scss';

const Sort: React.FC = () => {
	const sortBy = useSelector((state: RootState) => state.filterPizza.sortBy);
	const dispatch = useDispatch();
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
							onClick={() => dispatch(changeSortBy(sort))}
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
