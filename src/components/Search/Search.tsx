import clsx from 'clsx';
import React from 'react';
import { ClearIcon, SearchIcon } from '../icons';

import styles from './Search.module.scss';

export const Search: React.FC = () => {
	return (
		<div className={styles.wrapper}>
			<SearchIcon className={clsx(styles.icon, styles.icon__loop)} />
			<input placeholder="Поиск пиццы..." className={styles.input} />
			<ClearIcon className={clsx(styles.icon, styles.icon__clear)} />
		</div>
	);
};
