import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesList } from '../../data';
import { changeActiveCategoryId } from '../../store/slices/filter-pizza/filter-pizza';
import { RootState } from '../../store/store';

import styles from './Categories.module.scss';

import { Category } from './Category/Category';

const Categories: React.FC = () => {
	const activeCategoryId = useSelector((state: RootState) => state.filterPizza.activeCategoryId);
	const dispatch = useDispatch();

	return (
		<div className={styles.categories}>
			{categoriesList.map((category, i) => (
				<Category
					key={`${category}-${i}`}
					title={category}
					isActive={i === activeCategoryId}
					setActive={() => dispatch(changeActiveCategoryId(i))}
				/>
			))}
		</div>
	);
};

export default React.memo(Categories);
