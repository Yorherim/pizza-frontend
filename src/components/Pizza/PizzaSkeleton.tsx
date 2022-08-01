import React from 'react';
import ContentLoader from 'react-content-loader';

export const PizzaSkeleton: React.FC = () => (
	<ContentLoader
		speed={2}
		width={280}
		height={480}
		viewBox="0 0 280 480"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
	>
		<circle cx="139" cy="136" r="137" />
		<rect x="0" y="284" rx="10" ry="10" width="280" height="24" />
		<rect x="0" y="324" rx="10" ry="10" width="280" height="103" />
		<rect x="3" y="446" rx="10" ry="10" width="75" height="27" />
		<rect x="155" y="437" rx="25" ry="25" width="125" height="41" />
	</ContentLoader>
);
