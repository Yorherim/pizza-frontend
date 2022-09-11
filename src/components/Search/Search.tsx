import clsx from 'clsx';
import React, { useCallback, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

import { ClearIcon, SearchIcon } from '../icons';

import styles from './Search.module.scss';
import { useActions } from '../../hooks';

export const Search: React.FC = () => {
	const {
		filterPizza: { changeSearch },
	} = useActions();
	const inputRef = useRef<HTMLInputElement>(null);
	const [inputValue, setInputValue] = useState<string>('');

	const callbacks = {
		debounce: useCallback(
			debounce((value: string) => {
				changeSearch(value);
			}, 500),
			[],
		),
		onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => {
			setInputValue(e.currentTarget.value);
			callbacks.debounce(e.currentTarget.value);
		},
		clearInput: () => {
			setInputValue('');
			changeSearch('');
			inputRef.current?.focus();
		},
	};

	return (
		<div className={styles.wrapper}>
			<SearchIcon className={clsx(styles.icon, styles.icon__loop)} />
			<input
				ref={inputRef}
				value={inputValue}
				placeholder="Поиск пиццы..."
				className={styles.input}
				onChange={callbacks.onChangeInput}
			/>
			{inputValue && (
				<ClearIcon
					className={clsx(styles.icon, styles.icon__clear)}
					onClick={callbacks.clearInput}
				/>
			)}
		</div>
	);
};
