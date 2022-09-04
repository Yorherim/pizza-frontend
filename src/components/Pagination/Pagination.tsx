import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentPageIndex } from '../../store/slices/filter-pizza/filter-pizza';
import { RootState } from '../../store/store';

import styles from './Pagination.module.scss';

const Pagination: React.FC = () => {
	const pagesCount = useSelector((state: RootState) => state.filterPizza.pagesCount);
	const dispatch = useDispatch();

	const callbacks = {
		changePage: (pageIndex: number) => dispatch(changeCurrentPageIndex(pageIndex)),
	};

	return (
		<ReactPaginate
			className={styles.pagination}
			breakLabel="..."
			nextLabel=">"
			onPageChange={(e) => callbacks.changePage(e.selected)}
			pageRangeDisplayed={3}
			marginPagesDisplayed={1}
			pageCount={pagesCount}
			previousLabel="<"
			renderOnZeroPageCount={() => null}
		/>
	);
};

export default React.memo(Pagination);
