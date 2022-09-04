import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';
import { PaginationPropsType } from './types';

const Pagination: React.FC<PaginationPropsType> = ({ pagesCount, setCurrentPageIndex }) => {
	return (
		<ReactPaginate
			className={styles.pagination}
			breakLabel="..."
			nextLabel=">"
			onPageChange={(e) => setCurrentPageIndex(e.selected)}
			pageRangeDisplayed={3}
			marginPagesDisplayed={1}
			pageCount={pagesCount}
			previousLabel="<"
			renderOnZeroPageCount={() => null}
		/>
	);
};

export default React.memo(Pagination);
