import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSearch } from '../../store/slices/filter-pizza/filter-pizza';
import { RootState } from '../../store/store';
import { ClearIcon, SearchIcon } from '../icons';

import styles from './Search.module.scss';

export const Search: React.FC = () => {
	const search = useSelector((state: RootState) => state.filterPizza.search);
	const dispatch = useDispatch();

	return (
		<div className={styles.wrapper}>
			<SearchIcon className={clsx(styles.icon, styles.icon__loop)} />
			<input
				value={search}
				placeholder="Поиск пиццы..."
				className={styles.input}
				onChange={(e) => dispatch(changeSearch(e.currentTarget.value.toLowerCase()))}
			/>
			{search && (
				<ClearIcon
					className={clsx(styles.icon, styles.icon__clear)}
					onClick={() => dispatch(changeSearch(''))}
				/>
			)}
		</div>
	);
};
