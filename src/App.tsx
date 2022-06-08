import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { HeaderLayout } from './layouts/HeaderLayout';
import { HomePage, CartPage } from './pages';

const App: React.FC = () => {
	return (
		<div className="wrapper">
			<Routes>
				<Route path="/" element={<HeaderLayout />}>
					<Route index element={<HomePage />} />
					<Route path="cart" element={<CartPage />} />
					<Route path="*" element={<h1>404: PAGE NOT FOUND</h1>} />
				</Route>
			</Routes>
		</div>
	);
};

export default App;
