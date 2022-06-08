import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../components';

export const HeaderLayout: React.FC = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};
