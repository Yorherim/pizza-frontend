import React, { useCallback, useMemo, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useActions } from '../../hooks';
import { PizzaCartType } from '../../store/slices/cart/types';
import { RootState } from '../../store/store';

import styles from './Pizza.module.scss';

import { PizzaButton } from './PizzaButton/PizzaButton';
import PizzaTab from './PizzaTab/PizzaTab';
import { PizzaPropsType, PizzaSizesType } from './types';

export const Pizza: React.FC<PizzaPropsType> = ({ imageUrl, title, widths, sizes, price, id }) => {
	const [activeWidth, setActiveWidth] = useState<number>(widths[0]);
	const [activeSize, setActiveSize] = useState<PizzaSizesType>(sizes[0] as PizzaSizesType);
	const {
		cart: { addPizza },
	} = useActions();
	const ids = useSelector((state: RootState) => state.cart.ids, shallowEqual);
	const pizzaCartId = ids[id][activeSize.toString() + activeWidth.toString()];
	const count = useSelector((state: RootState) => state.cart.pizzas[pizzaCartId]?.count || 0);

	const options = {
		checkedSizes: useMemo(() => {
			const sizesObj = {} as Record<string, boolean>;
			sizes.forEach((s) => (sizesObj[s] = true));
			return sizesObj;
		}, []),
		checkedWidths: useMemo(() => {
			const widthsObj = {} as Record<string, boolean>;
			widths.forEach((w) => (widthsObj[w] = true));
			return widthsObj;
		}, []),
	};

	const callbacks = {
		setActiveWidth: useCallback((activeValue: number) => {
			setActiveWidth(activeValue);
		}, []),
		setActiveSize: useCallback((activeValue: PizzaSizesType) => {
			setActiveSize(activeValue);
		}, []),
		addPizzaInCart: useCallback(() => {
			const pizza: Omit<PizzaCartType, 'count'> = {
				imageUrl,
				price,
				title,
				size: activeSize,
				width: activeWidth === 0 ? 'тонкое' : 'традиционное',
			};
			addPizza({ pizza, pizzaCartId });
		}, [activeSize, activeWidth]),
	};

	return (
		<div className={styles.pizza}>
			<img src={imageUrl} className={styles.pizza__img} />
			<span className={styles.pizza__title}>{title}</span>
			<div className={styles.pizza__tabs}>
				<div className={styles.pizza__box}>
					<PizzaTab
						title="тонкое"
						tabType="width"
						activeTab={activeWidth}
						activeValue={0}
						disable={!options.checkedWidths[0]}
						setActiveWidth={callbacks.setActiveWidth}
					/>
					<PizzaTab
						title="традиционное"
						tabType="width"
						activeTab={activeWidth}
						activeValue={1}
						disable={!options.checkedWidths[1]}
						setActiveWidth={callbacks.setActiveWidth}
					/>
				</div>
				<div className={styles.pizza__box}>
					<PizzaTab
						title="25 см."
						tabType="size"
						activeTab={activeSize}
						activeValue={25}
						disable={!options.checkedSizes[25]}
						setActiveSize={callbacks.setActiveSize}
					/>
					<PizzaTab
						title="30 см."
						tabType="size"
						activeTab={activeSize}
						activeValue={30}
						disable={!options.checkedSizes[30]}
						setActiveSize={callbacks.setActiveSize}
					/>
					<PizzaTab
						title="35 см."
						tabType="size"
						activeTab={activeSize}
						activeValue={35}
						disable={!options.checkedSizes[35]}
						setActiveSize={callbacks.setActiveSize}
					/>
				</div>
			</div>

			<div className={styles.pizza__bottom}>
				<span className={styles.pizza__prise}>{price} ₽</span>
				<PizzaButton count={count} addPizza={callbacks.addPizzaInCart} />
			</div>
		</div>
	);
};
