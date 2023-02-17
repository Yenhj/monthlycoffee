import React, { useState } from "react";
import { txtShadow } from "utils/colors";
import MonthlyDetail from "./MonthlyDetail";
import Statistics from "./Statistics";

const ExpenseDetails = () => {
  const [page, setPage] = useState(true);
  return (
    <div className="p-5">
      <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
        <button
          className={`inline-block px-4 py-2 text-3xl font-bold ${
            page
              ? "text-yellow-400 rounded-md bg-white shadow-sm"
              : "text-white hover:text-gray-100"
          }`}
          style={{ textShadow: `${txtShadow}` }}
          onClick={() => setPage(true)}
        >
          이달의 커피
        </button>
        <button
          className={`inline-block rounded-md px-4 py-2 text-3xl font-bold ${
            !page
              ? "text-yellow-400 rounded-md bg-white shadow-sm"
              : "text-white hover:text-gray-100"
          }`}
          style={{ textShadow: `${txtShadow}` }}
          onClick={() => setPage(false)}
        >
          통계
        </button>
      </div>
      <div className="bg-[#F5E7DB] block w-[94vw] md:w-[75vw] p-10 mt-5 space-y-5 rounded-lg">
        {page ? <MonthlyDetail /> : <Statistics />}
      </div>
    </div>
  );
};

export default ExpenseDetails;
