import clsx from 'clsx';
import React from 'react';

import styles from './index.module.scss';

type PizzaTabPropsType = {
	activeSize: boolean;
	checkedSizes: boolean;
	setActiveSize: () => void;
	tabType: 'size' | 'price';
};

export const PizzaTab: React.FC<PizzaTabPropsType> = ({
	activeSize,
	checkedSizes,
	setActiveSize,
	tabType,
}) => {
	return (
		<button
			className={clsx(styles.pizza__tab, styles.pizza__tab_size, {
				[styles.pizza__tab_active]: activeSize,
				[styles.pizza__tab_disable]: checkedSizes,
			})}
			onClick={setActiveSize}
		>
			25 см.
		</button>
	);
};
