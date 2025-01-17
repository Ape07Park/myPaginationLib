
// 총 아이템 정보, 한 페이지당 아이템 수, 페이지 변경 함수, 현재 페이지
export default function CustomPagination({totalItemsCount, itemsCountPerPage, onPageChange, currentPage, pageRangeDisplayed }) {

    // 총 페이지 수
    const totalPageCount = Math.ceil(totalItemsCount / itemsCountPerPage);

    /**
     * 페이지 그룹 
     *  참고 : https://yonghwankim-dev.tistory.com/578
     */

    // 페이지 그룹의 총 개수
    const currentPageGroup = Math.ceil(currentPage / pageRangeDisplayed); 

    // 페이지 그룹의 첫 번째 페이지
    const startPage = (currentPageGroup - 1) * pageRangeDisplayed + 1;

    // 페이지 그룹의 마지막 페이지
    const endPage = Math.min(startPage + pageRangeDisplayed - 1, totalPageCount);

    /**
     * 페이지 이동 
     */

    // 맨 처음 페이지로 이동
    const goFirstPage = () => {
        onPageChange(1);
    }

    // 마지막 페이지로 이동
    const goLastPage = () => {
        onPageChange(totalPageCount);
    };

    const goPreviousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const goNextPage = () => {
        if (currentPage < totalPageCount) {
            onPageChange(currentPage + 1);
        }
    };

    // 특정 번호 클릭으로 페이지 이동
    const handlePageClick = (pageNumber) => {
        onPageChange(pageNumber);
    };

    /**
     * 페이지 번호 생성
     */

    const generatePageNumber = () => {
        const pageNumbers = [];

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                    <a onClick={() => handlePageClick(i)} href="#" className="page-link">
                        {i}
                    </a>
                </li>
            )
        }
        return pageNumbers;
    };


    return (
        <nav>

            <ul className="pagination">
                <li className="page-item">
                    <a onClick={goFirstPage} href="#!" className="page-link">
                        {'<<'}
                    </a>
                </li>

                <li className="page-item">
                    <a onClick={goPreviousPage} href="#!" className="page-link">
                        {'<'}
                    </a>
                </li>

                {/* 번호 생성 부분 */}
                {generatePageNumber()}

                <li className="page-item">
                    <a onClick={goNextPage} href="#!" className="page-link">
                        {'>'}
                    </a>
                </li>

                <li className="page-item">
                    <a onClick={goLastPage} href="#!" className="page-link">
                        {'>>'}
                    </a>
                </li>
            </ul>

        </nav>
    );
};


