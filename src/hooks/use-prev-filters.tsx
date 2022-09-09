import { useState } from 'react';
import { sortTitles } from '../data';

import { SortByType } from '../store/slices/filter-pizza/types';
import { shallowEqual } from 'react-redux';

export type FiltersType = {
	activeCategoryId: number;
	sortBy: SortByType;
	currentPageIndex: number;
	search: string;
};

/**
 * хук для проверки предыдущих фильтров с нынешними
 *
 * возвращаемая функция нужна для корректного добавления ids в cart
 *
 * @returns функция сравнения предыдущих фильтров с нынешними
 */
export const usePrevFilters = () => {
	const [activeCategoryId, setActiveCategoryId] = useState<number>(0);
	const [sortBy, setSortBy] = useState<SortByType>(sortTitles.rating);
	const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
	const [search, setSearch] = useState<string>('');

	/**
	 * функция для проверки предыдущих фильтров с нынешними
	 *
	 * значение - уникальный id, сгенерированный nanoid
	 * @param {FiltersType} filters - фильтры для отображения пицц
	 * @returns {boolean} `true` - если те же самые, `false` - если изменились
	 */
	const checkCurrentFiltersWithPrevFilteres = (filters: FiltersType) => {
		let flag = true;

		if (activeCategoryId !== filters.activeCategoryId) {
			setActiveCategoryId(filters.activeCategoryId);
			flag = false;
		}
		if (!shallowEqual(sortBy, filters.sortBy)) {
			setSortBy(filters.sortBy);
			flag = false;
		}
		if (currentPageIndex !== filters.currentPageIndex) {
			setCurrentPageIndex(filters.currentPageIndex);
			flag = false;
		}
		if (search !== filters.search) {
			setSearch(filters.search);
			flag = false;
		}

		return flag;
	};

	return { checkCurrentFiltersWithPrevFilteres };
};
