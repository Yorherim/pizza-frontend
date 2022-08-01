import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { HeaderLayout } from './layouts/HeaderLayout';
import { HomePage, CartPage, NotFoundPage } from './pages';

const App: React.FC = () => {
	return (
		<div className="wrapper">
			<Routes>
				<Route path="/" element={<HeaderLayout />}>
					<Route index element={<HomePage />} />
					<Route path="cart" element={<CartPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</div>
	);
};

export default App;
