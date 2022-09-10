import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { NotFoundText, PizzaInfo } from '../../components';
import { useThunks } from '../../hooks';
import { pizzaSelectors } from '../../store/slices';

import styles from './PizzaInfo.module.scss';

export const PizzaInfoPage: React.FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const {
		pizza: { fetchPizzaById },
	} = useThunks();
	const pizza = useSelector(pizzaSelectors.selectCurrentPizza);
	const status = useSelector(pizzaSelectors.selectStatus);

	useEffect(() => {
		fetchPizzaById(id!);
	}, []);

	// TODO сделать скелетон для PizzaInfo компонента
	const renders = {
		loading:
			(status === 'rejected' && (
				<NotFoundText title="В нашем интернет магазине нет такой пиццы" />
			)) ||
			(status === 'loading' && <div>Загрузка...</div>),
	};

	return (
		<div className="container">
			<div className={styles.pizza}>
				{renders.loading ? (
					renders.loading
				) : (
					<PizzaInfo imageUrl={pizza.imageUrl} title={pizza.title} price={pizza.price} />
				)}
			</div>
		</div>
	);
};
