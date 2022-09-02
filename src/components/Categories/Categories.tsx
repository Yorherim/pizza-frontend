import React from 'react';

import styles from './Categories.module.scss';

import { Category } from './Category/Category';
import { CategoriesPropsType } from './types';

export const Categories: React.FC<CategoriesPropsType> = ({
	categories,
	activeCategoryId,
	setActiveCategoryId,
}) => {
	return (
		<div className={styles.categories}>
			{categories.map((category, i) => (
				<Category
					key={`${category}-${i}`}
					title={category}
					isActive={i === activeCategoryId}
					setActive={() => setActiveCategoryId(i)}
				/>
			))}
		</div>
	);
};
