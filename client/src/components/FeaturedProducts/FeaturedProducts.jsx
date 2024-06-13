import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./FeatureProducts.css";
import { Link } from "react-router-dom";
import { EffectCoverflow, Pagination, A11y, Autoplay } from "swiper/modules";
import { useAuth } from "../Context/Auth_context";

const FeaturedProducts = () => {
  const scrollToTop = (e) => {
    window.scrollTo(0, 0);
  };

  const { displayProducts } = useAuth();

  // Check if displayProducts is defined and filter featured products
  const featuredProducts = displayProducts ? displayProducts.filter(
    (product) => product.featuredProduct === true
  ) : [];

  return (
    <>
      <div className="p-4 py-6">
        <div className="text-gray-300 text-3xl mb-4 text-center font-medium">
          Featured Products
        </div>
        <div className="relative">
          <Swiper
            modules={[EffectCoverflow, Pagination, A11y, Autoplay]}
            loop={true}
            speed={400}
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "rgb(193, 5, 5)",
            }}
            spaceBetween={100}
            slidesPerView={"auto"}
            pagination={{ clickable: true }}
            effect={"coverflow"}
            centeredSlides={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 70,
              modifier: 3,
              slideShadows: false,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 200,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 250,
              },
            }}
            className="mySwiper1"
          >
            {featuredProducts.map((item) => (
              <SwiperSlide className="feature mb-[4em] lg:mb-[6em]" key={item._id}>
                <div className="flex flex-col items-center justify-evenly lg:w-[100%] lg:gap-8 gap-2 h-[50%]">
                  <div className="text-gray-400 text-sm font-medium">
                    {item.name}
                  </div>
                  <Link to={`/product-details/${item.slug}/${item._id}`} onClick={scrollToTop} className="w-[90%] lg:w-[80%]">
                    <img
                      src={item.photo[0]}
                      alt={item.name}
                      className=""
                    />
                  </Link>
                  <div>
                    <div className="text-2xl font-medium text-white">
                      &#8377; {item.finalprice}{" "}
                      <span className="text-sm text-gray-400">
                        <strike>&#8377; {item.originalprice}</strike>
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default FeaturedProducts;
