
import axios from 'axios'
import './App.css'
import { useEffect, useState } from 'react';
import CustomPagination from './CustomPagination';

function App() {

  const [datas, setDatas] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [SucessGettingData, setSucessGettingData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const getData = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setDatas(response.data);

    setSucessGettingData(true);

    setTotalCount(response.data.length);
  }

  useEffect(() => {
    getData();
  }, []);

  // 페이지 당 아이템 수
  const itemsCountPerPage = 10;

  // 한 그룹당 표시할 페이지 수
  const pageRangeDisplayed = 5;

  /**
   * 현재 페이지에 해당하는 데이터만 표시하기 위해
   * 인덱스 기준이라 0 부터 시작
   */

  // 한 페이지의 마지막 아이템
  const indexOfLastItem = currentPage * itemsCountPerPage;

  // 한 페이지의 처음 아이템
  const indexOfFirstItem = indexOfLastItem - itemsCountPerPage;

  // 가져온 아이템 자르기
  const currentItems = datas.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <h1>페이지네이션</h1>

      <h2>{totalCount}</h2>

      <ul>
        {currentItems.map((data) => (
          <li
            key={data.id}

          >
            <ul>
              <li>아이디: {data.id}</li>
              <li>제목: {data.title}</li>
            </ul>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 컴포넌트 */}

      {/*
       총 아이템 수
        한 페이지에 보여줄 아이템 수
        페이지 변경 함수
        현재 페이지
        그룹의 페이지 범위
      */}

      <CustomPagination
        totalItemsCount={totalCount}
        itemsCountPerPage={itemsCountPerPage}
        onPageChange={setCurrentPage}
        currentPage={currentPage}  // 현재 페이지 번호 전달
        pageRangeDisplayed={pageRangeDisplayed} // 그룹의 페이지 범위
      />
    </>
  )
}

export default App
