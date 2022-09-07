import React from 'react';
import { useSelector } from 'react-redux';
import { categoriesList } from '../../data';
import { useActions } from '../../hooks';
import { RootState } from '../../store/store';

import styles from './Categories.module.scss';

import { Category } from './Category/Category';

const Categories: React.FC = () => {
	const {
		filterPizza: { changeActiveCategoryId },
	} = useActions();
	const activeCategoryId = useSelector((state: RootState) => state.filterPizza.activeCategoryId);

	return (
		<div className={styles.categories}>
			{categoriesList.map((category, i) => (
				<Category
					key={`${category}-${i}`}
					title={category}
					isActive={i === activeCategoryId}
					setActive={() => changeActiveCategoryId(i)}
				/>
			))}
		</div>
	);
};

export default React.memo(Categories);
