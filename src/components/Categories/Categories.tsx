import React, { useState } from 'react';

import styles from './Categories.module.scss';

import { Category } from './Category/Category';

const listOfCategories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories: React.FC = () => {
	const [activeCategory, setActiveCategory] = useState<number>(0);

	return (
		<div className={styles.categories}>
			{listOfCategories.map((category, i) => (
				<Category
					key={`${category}-${i}`}
					title={category}
					isActive={i === activeCategory}
					setActive={() => setActiveCategory(i)}
				/>
			))}
		</div>
	);
};
