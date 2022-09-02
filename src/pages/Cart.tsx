import React, { useState } from 'react';

import { Cart, CartEmpty } from '../components';

export const CartPage: React.FC = () => {
	const [empty, setEmpty] = useState(false);

	return <div className="container">{!empty ? <Cart /> : <CartEmpty />}</div>;
};
