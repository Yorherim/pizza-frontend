import React from 'react';

import styles from './NotFoundText.module.scss';
import { NotFoundTextPropsType } from './types';

export const NotFoundText: React.FC<NotFoundTextPropsType> = ({ title, text }) => {
	return (
		<div className={styles.error}>
			<h2 className={styles.title}>{`${title} 😕`}</h2>
			{text ? <p className={styles.text}>{text}</p> : null}
		</div>
	);
};
