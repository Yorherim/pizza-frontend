import clsx from 'clsx';
import React, { useState } from 'react';

import styles from './PizzaButton.module.scss';

import { PlusIcon } from '../../../assets/icons/components-icons/PlusIcon';

type PizzaButtonPropsType = {
	count: number;
};

export const PizzaButton: React.FC<PizzaButtonPropsType> = ({ count }) => {
	const [hover, setHover] = useState<boolean>(false);

	return (
		<button
			className={styles.button}
			onMouseOver={() => setHover(true)}
			onMouseOut={() => setHover(false)}
		>
			<PlusIcon />
			Добавить
			<div className={clsx(styles.button__circle, { [styles.button__circle_hover]: hover })}>
				{count}
			</div>
		</button>
	);
};
