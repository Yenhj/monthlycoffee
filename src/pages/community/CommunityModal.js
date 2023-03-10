import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import axios from "api/axios";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import CommunityModalCss from "styles/CommunityModalCss";
import CommuLike from "./CommuLike";
import Comment from "./Comment";

const CommunityModal = ({
  listDetail,
  like,
  clickData,
  setListDetail,
  setLike,
  modalIsOpen,
  setModalIsOpen,
  setToast,
}) => {
  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: "99",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "40%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "transparent",
      border: "none",
    },
  };
  const userData = useSelector((state) => state.user);
  let [update, setUpdate] = useState(1);
  const [detail, setDetail] = useState([]);
  const [comment, setComment] = useState([]);

  const { register, handleSubmit, reset } = useForm({
    // resolver: yupResolver(schema),
    mode: "onChange", // mode 가 onChange 면 실행하라..
  });
  const inputRef = useRef(null);

  // console.log(detail);
  const getPosts = async () => {
    const posts = await axios.get(`posts/${listDetail.id}`);
    // console.log(posts.data);
    setDetail(posts.data);
    setLike(posts.data.isLiked);
    if (posts.data.comments) {
      setComment(posts.data.comments);
    }
  };
  useEffect(() => {
    getPosts();
  }, [listDetail, like, update]);

  const likeData = clickData[0];

  const postLikes = async () => {
    await axios.post(`postlikes/${listDetail.id}`).then((res) => {
      setLike(res.data.isLiked);
    });
  };

  const onSubmit = (data) => {
    const body = {
      postId: listDetail.id,
      content: data.content,
    };
    axios
      .post("comments", body)
      .then((res) => {
        console.log(res);
        reset();
        setToast(true);
        setUpdate(++update);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(comment);
  return (
    <Modal
      isOpen={modalIsOpen}
      ariaHideApp={false}
      onRequestClose={() => setModalIsOpen(false)}
      style={customStyles}
    >
      <CommunityModalCss>
        <div className="bg-stone-100 p-7 overflow-x-auto">
          <div className="flex items-center mb-5">
            <img
              className="h-[55px] w-[55px] rounded-full"
              src="./images/profile.png"
              alt="pic"
            />
            <span className="ml-3 text-xl font-semibold antialiased block leading-tight">
              {detail.nickname}
            </span>
          </div>
          {/* <p className="my-7 text-3xl font-bold text-center">MONTHLY COFFEE</p> */}
          <div className="flex justify-center mb-5">
            <div className="w-[65%] bg-black flex justify-center items-center drop-shadow">
              <img className="w-[98%] h-[98%]" src={listDetail.src} alt="pic" />
            </div>
          </div>
          <hr className="border-black border-dashed" />
          <div className="m-5 flex justify-around items-center text-2xl">
            <span className="font-bold">{detail.category}</span>
            <span className="text-lg">{detail.brand}</span>
          </div>
          <hr className=" border-black border-dashed" />
          <div className="flex justify-between items-center my-5 font-bold">
            <CommuLike postLikes={postLikes} like={like} likeData={likeData} />
            <div className="flex justify-end gap-1 text-xl">
              {detail.taste && (
                <span className="text-blue-600">#{detail.taste}</span>
              )}
              {detail.mood && (
                <span className="text-blue-600">#{detail.mood}</span>
              )}
              {detail.bean && (
                <span className="text-blue-600">#{detail.bean}</span>
              )}
            </div>
          </div>
          <p className="w-full p-2 text-2xl">{detail.content}</p>
          <hr className=" border-black border-dashed" />
          <form
            className="flex justify-between text-xl mt-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              className="w-[90%] border-2 px-2"
              {...register("content")}
            />
            <button type="submit">등록</button>
          </form>
          <div className="comments flex flex-wrap max-h-[5rem] mt-2 mx-2 gap-1 overflow-y-auto">
            {comment &&
              comment
                .sort((a, b) => {
                  if (a.id > b.id) return -1;
                  if (a.id < b.id) return 1;
                  return 0;
                })
                .map((item) => (
                  <Comment
                    key={item.id}
                    item={item}
                    update={update}
                    setUpdate={setUpdate}
                  />
                ))}
          </div>
        </div>
        {/* <button onClick={() => setModalIsOpen(false)}>Modal close</button> */}
      </CommunityModalCss>
    </Modal>
  );
};

export default CommunityModal;
