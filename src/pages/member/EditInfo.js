import { Edit } from "@mui/icons-material";
import React from "react";
import { txtShadow } from "utils/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAccount } from "reducer/loggedState";
import { removeCookie } from "api/cookie";
import axios from "api/axios";
import { useForm } from "react-hook-form";

const EditInfo = () => {
  const { register, handleSubmit } = useForm({
    mode: "onChange", // mode 가 onChange 면 실행하라..
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const memberOut = () => {
    window.Kakao.API.request({
      url: "/v1/user/unlink",
      success: function (res) {
        console.log(res);
        //callback(); //연결끊기(탈퇴)성공시 서버에서 처리할 함수
        // window.location.href='/'
        removeCookie("access_token");
        alert("회원탈퇴되었습니다.");
        const uid = res.id;
        dispatch(logoutAccount(uid));
        navigate("/");
      },
      fail: function (error) {
        console.log("탈퇴 미완료");
        console.log(error);
      },
    });
  };
  const changeNickname = (data) => {
    console.log(data.nickname);
    const body = {
      nickname: data.nickname,
    };
    if (body.nickname) {
      axios
        .patch(
          `members/${userData.id}`,
          // {
          //   headers: {
          //     Authorization:
          //       "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzcxNDI4ODgsIm1lbWJlcklkIjoxfQ.s-WtKgtgxrjfVw9pX1k9kGhLSPT4sMKkInT9GPGYnzw",
          //   },
          // },
          body
        )
        .then((res) => {
          return console.log(res);
        })
        .catch((err) => {
          return console.log(err);
        });
    }
  };
  return (
    <div className="p-5">
      <span
        className="text-4xl ml-5 font-bold"
        style={{ textShadow: `${txtShadow}` }}
      >
        <Edit />
        <span className="text-yellow-400">&nbsp;내 정보 수정</span>
      </span>
      <div className="bg-[#F5E7DB] block w-[94vw] md:w-[75vw] p-5 text-3xl font-bold mt-5 space-y-5 rounded-lg">
        <div className="flex justify-between px-24 py-7 bg-white border border-black">
          <span>닉네임</span>
          <form
            className="flex gap-2 w-[35%]"
            onSubmit={handleSubmit(changeNickname)}
          >
            <input
              className="bg-stone-100 w-3/4 text-center"
              type="text"
              defaultValue={userData.nickname}
              {...register("nickname")}
            />
            <button
              className="w-1/4 text-end text-blue-800 cursor-pointer"
              type="submit"
            >
              등록
            </button>
          </form>
        </div>
        <div className="flex justify-between px-24 py-7 bg-white border border-black">
          <span>이번 달 목표</span>
          <form
            className="flex gap-2 w-[35%]"
            // onSubmit={handleSubmit(changeNickname)}
          >
            <input
              className="bg-stone-100 w-3/4 text-center"
              type="text"
              defaultValue={userData.nickname}
              {...register("budget")}
            />
            <button
              className="w-1/4 text-end text-blue-800 cursor-pointer"
              type="submit"
            >
              등록
            </button>
          </form>
        </div>
        <div
          className="text-center text-red-600 py-7 bg-white border border-black cursor-pointer"
          onClick={memberOut}
        >
          <span>회원탈퇴</span>
        </div>
      </div>
    </div>
  );
};

export default EditInfo;
