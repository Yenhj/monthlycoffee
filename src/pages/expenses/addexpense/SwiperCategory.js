import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";
import { SwiperCss } from "styles/SwiperCss";
import { Radio } from "@mui/joy";

const SwiperCategory = ({ category, setCategory }) => {
  const path = process.env.PUBLIC_URL;
  const testArr = [
    {
      id: "아메리카노",
      name: "아메리카노",
      img: `${path}/images/americano.jpg`,
    },
    {
      name: "카페라떼",
      img: `${path}/images/americano.jpg`,
    },
    {
      name: "바닐라라떼",
      img: `${path}/images/americano.jpg`,
    },
    {
      name: "초코라떼",
      img: `${path}/images/americano.jpg`,
    },
    {
      name: "카푸치노",
      img: `${path}/images/logo.png`,
    },
    {
      name: "카푸치노",
      img: `${path}/images/logo.png`,
    },
  ];

  const [arr, setArr] = useState(testArr);
  // useEffect(() => {}, [category]);
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  // const [addCategory, setAddCategory] = useState("");
  // const [bt, setBt] = useState(false);
  // const add = () => {
  //   setBt(true);
  // };
  return (
    <SwiperCss>
      <Swiper
        className="mySwiper swiper"
        slidesPerView={1}
        spaceBetween={5}
        grabCursor={true}
        navigation={true}
        modules={[Navigation]}
        // pagination={{
        //   clickable: true,
        // }}
        // 반응형 체크
        breakpoints={{
          0: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 50,
          },
        }}
      >
        <SwiperSlide className="swiperSlide ">
          <img src={`${path}/images/plus.png`} alt="" />
          추가
        </SwiperSlide>
        {/* map 추후 적용 */}
        {arr.map((item, id) => {
          return (
            <SwiperSlide className="swiperSlide" key={id}>
              <img src={item.img} alt="" />
              <Radio
                variant="plain"
                label={item.name}
                name="category"
                overlay={true}
                value={item.name}
                onClick={handleCategory}
                sx={{ paddingRight: 3 }}
                // slotProps={{
                //   action: ({ checked }) => ({
                //     sx: (theme) => ({
                //       ...(checked && {
                //         "--variant-borderWidth": "2px",
                //         "&&": {
                //           borderColor: theme.vars.palette.warning[300],
                //         },
                //       }),
                //     }),
                //   }),
                // }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </SwiperCss>
  );
};

export default SwiperCategory;
