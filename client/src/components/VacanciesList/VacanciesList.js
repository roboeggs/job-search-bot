import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function VacanciesList({ vacancies, loadMore }) {
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = () => {
    loadMore().then((newVacancies) => {
      if (newVacancies.length === 0) {
        setHasMore(false);
      }
    });
  };

  return (
    <InfiniteScroll
      dataLength={vacancies.length}
      next={handleLoadMore}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      <div className="overflow-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Job Title</th>
              <th className="px-4 py-2">City</th>
              <th className="px-4 py-2">Link</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {vacancies.map((vacancy) => (
              <tr key={vacancy.id}>
                <td className="px-4 py-2">{vacancy.name}</td>
                <td className="px-4 py-2">{vacancy.area.name}</td>
                <td className="px-4 py-2">
                  <a href={vacancy.url} target="_blank" rel="noreferrer">
                    {vacancy.url}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </InfiniteScroll>
  );
}

export default VacanciesList;