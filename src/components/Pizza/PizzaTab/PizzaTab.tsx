import clsx from 'clsx';
import React from 'react';
import { PizzaSizesType } from '../types';

import styles from './PizzaTab.module.scss';

type PizzaTabPropsType = {
	title: string;
	tabType: 'size' | 'width';
	activeTab: number;
	activeValue: PizzaSizesType | number;
	disable: boolean;
	setActiveSize?: (activeValue: PizzaSizesType) => void;
	setActiveWidth?: (activeValue: number) => void;
};

const PizzaTab: React.FC<PizzaTabPropsType> = ({
	title,
	tabType,
	activeTab,
	activeValue,
	disable,
	setActiveSize,
	setActiveWidth,
}) => {
	const stylesObj = {
		['size']: styles.tab__size,
		['width']: styles.tab__width,
	};

	const callbacks = {
		['size']: setActiveSize && (() => setActiveSize(activeValue as PizzaSizesType)),
		['width']: setActiveWidth && (() => setActiveWidth(activeValue)),
	};

	return (
		<button
			className={clsx(styles.tab, stylesObj[tabType], {
				[styles.active]: activeTab === activeValue,
				[styles.disable]: disable,
			})}
			onClick={callbacks[tabType]}
		>
			{title}
		</button>
	);
};

export default React.memo(PizzaTab);
