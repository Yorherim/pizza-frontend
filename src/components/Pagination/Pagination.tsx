import React from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks';
import { RootState } from '../../store/store';

import styles from './Pagination.module.scss';

const Pagination: React.FC = () => {
	const { changeCurrentPageIndex } = useActions();
	const { pagesCount, currentPageIndex } = useSelector((state: RootState) => state.filterPizza);

	const callbacks = {
		changePage: (pageIndex: number) => changeCurrentPageIndex(pageIndex),
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
			forcePage={currentPageIndex}
		/>
	);
};

export default React.memo(Pagination);
