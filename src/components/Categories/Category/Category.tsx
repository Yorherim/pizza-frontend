import clsx from 'clsx';
import React from 'react';

import styles from './Category.module.scss';

type CategoryPropsType = {
	title: string;
	isActive: boolean;
	setActive: () => void;
};

export const Category: React.FC<CategoryPropsType> = ({ title, isActive, setActive }) => {
	return (
		<button
			className={clsx(styles.category, { [styles.category__active]: isActive })}
			onClick={() => setActive()}
		>
			{title}
		</button>
	);
};
