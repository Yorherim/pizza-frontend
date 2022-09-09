import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { pizzaSelectors } from '../../store/slices';

import styles from './PizzaInfo.module.scss';

export const PizzaInfoPage: React.FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const pizza = useSelector(pizzaSelectors.selectPizzaById(id!));

	// TODO сделать запрос пиццы по id

	if (!pizza) {
		return <Navigate to="/" />;
	}

	return (
		<div>
			<div className="container">pizza info</div>
		</div>
	);
};
