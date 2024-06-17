import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Hero.css";

// import required modules
import { Parallax, Pagination, Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import TopProducts from "../TopProducts/TopProducts";
import { useAuth } from "../Context/Auth_context";

export default function Hero() {
  const { displayProducts } = useAuth();
  const [heroProducts, setHeroProducts] = useState([]);

  useEffect(() => {
    if (displayProducts) {
      // Filter products that have topProduct set to true
      const heroProducts = displayProducts.filter(
        (product) => product.heroProduct === true
      );
      setHeroProducts(heroProducts);
    }
  }, [displayProducts]);

  if (!displayProducts) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div
          class="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }
  const scrollToTop = (e) => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="hero">
        <Swiper
          modules={[Parallax, Pagination, Navigation, Autoplay]}
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "rgb(193, 5, 5)",
          }}
          speed={600}
          parallax={true}
          pagination={{
            clickable: true,
          }}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          navigation={false}
          className="mySwiper"
        >
          {heroProducts.length > 0 &&
            heroProducts.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="w-full h-[65vh] herofont lg:p-10 lg:px-16 bg-transparent">
                  <img
                    src={item.photo[0]} // Assuming the first image in the photo array is the hero image
                    className=" -z-10 absolute lg:w-[35%] opacity-50 lg:right-[18rem] top-[4rem] md:top-0 lg:top-0"
                    alt={item.name}
                  />
                  <div className="lg:w-[50%] flex flex-col justify-center lg:gap-0 md:gap-4 z-10 h-[100%] lg:p-4">
                    <div className="text-gray-400 fontstyle lg:text-2xl text-xl md:text-4xl">
                      {item.name}
                    </div>
                    <div className="text-[#d4dad7] mt-4 md:text-7xl text-4xl lg:text-[55px]">
                      {item.info}
                    </div>
                    <div className="text-gray-400 md:text-4xl mt-6 text-2xl lg:text-3xl">
                      &#8377; {item.finalprice}{" "}
                      <span className="lg:text-xl italic text-sm md:text-2xl text-gray-500">
                        <strike>&#8377; {item.originalprice}</strike>
                      </span>
                    </div>
                    <Link
                      to={`/product-details/${item.slug}/${item._id}`}
                      onClick={scrollToTop}
                      className="text-[16px] herobuttonborder mt-8 md:w-48 w-32 lg:w-32"
                    >
                      <div className="herobutton lg:text-lg md:text-2xl rounded-[6px] text-center text-white p-3 lg:p-3 md:p-4">
                        Shop Now
                      </div>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      <FeaturedProducts />
      <TopProducts />
    </>
  );
}
