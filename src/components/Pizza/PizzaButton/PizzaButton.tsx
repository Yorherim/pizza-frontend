import clsx from 'clsx';
import React, { useState } from 'react';
import { PlusIcon } from '../../icons';

import styles from './PizzaButton.module.scss';

type PizzaButtonPropsType = {
	count?: number;
	addPizza: () => void;
};

export const PizzaButton: React.FC<PizzaButtonPropsType> = ({ count, addPizza }) => {
	const [hover, setHover] = useState<boolean>(false);

	return (
		<button
			className={styles.button}
			onMouseOver={() => setHover(true)}
			onMouseOut={() => setHover(false)}
			onClick={addPizza}
		>
			<PlusIcon />
			Добавить
			<div
				className={clsx(styles.button__circle, {
					[styles.button__circle_hover]: hover,
				})}
			>
				{count}
			</div>
		</button>
	);
};
