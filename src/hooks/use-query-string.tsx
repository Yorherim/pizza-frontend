import qs from 'qs';
import { shallowEqual, useSelector } from 'react-redux';
import { filterSelectors } from '../store/slices';
import { QsParamsType } from '../store/slices/filter-pizza/types';

export const useQueryString = () => {
	const { activeCategoryId, sortBy, currentPageIndex, search } = useSelector(
		filterSelectors.selectAllFilters,
		shallowEqual,
	);

	// меняем desc на asc, если сортировка сделана по названию из-за особенностей апи
	// то есть апи c sortBy=title&order=desc работает наоборот
	const orderParam = sortBy.sort === 'title' ? 'asc' : 'desc';

	const qsParams = {} as QsParamsType;
	if (activeCategoryId) qsParams.category = activeCategoryId.toString();
	if (orderParam) qsParams.order = orderParam;
	if (search) qsParams.search = search;
	qsParams.limit = `4`;
	qsParams.sortBy = sortBy.sort;
	qsParams.page = (currentPageIndex + 1).toString();

	const queryString = qs.stringify(qsParams);

	return queryString;
};
