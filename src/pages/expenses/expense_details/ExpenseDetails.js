import React, { useState } from "react";
import { useSelector } from "react-redux";
import ExpenseDetailsCss from "styles/ExpenseDetailsCss";
import { txtShadow } from "utils/colors";
import MonthlyDetail from "./MonthlyDetail";
import Statistics from "../../statistics/Statistics";

const ExpenseDetails = () => {
  const [page, setPage] = useState(true);
  const userData = useSelector((state) => state.user);

  return (
    <ExpenseDetailsCss>
      <div className="my-7 mx-auto">
        <p
          className="text-4xl font-bold text-white"
          style={{ textShadow: `${txtShadow}` }}
        >
          <span className="text-yellow-300">{userData.nickname} </span>
          님의 커피
        </p>
        <div className="expenseDetail bg-[#F5E7DB] block w-[94vw] md:w-[60vw] p-10 mt-5 space-y-5 rounded-lg md:h-[70vh] md:overflow-y-scroll">
          <MonthlyDetail />
        </div>
      </div>
    </ExpenseDetailsCss>
  );
};

export default ExpenseDetails;
