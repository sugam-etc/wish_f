import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { BACKEND_URL } from "../config/backend.js";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const GallerySection = ({ albums }) => {
  return (
    <section
      style={{
        padding: "3rem 1rem",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 300,
              letterSpacing: "-0.025em",
              color: "#111827",
            }}
          >
            Photo Albums
          </h2>
          <Link
            to="/gallery"
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#6b7280",
              transition: "color 0.2s",
            }}
            className="hover:text-gray-900"
          >
            View all albums →
          </Link>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1.2}
          breakpoints={{
            640: {
              slidesPerView: 2.2,
            },
            768: {
              slidesPerView: 2.5,
            },
            1024: {
              slidesPerView: 3.5,
            },
            1280: {
              slidesPerView: 4.5,
            },
          }}
          navigation
          pagination={{ clickable: true }}
          style={{ paddingBottom: "3rem" }}
        >
          {albums.slice(0, 5).map((album) => (
            <SwiperSlide key={album._id}>
              <div
                style={{
                  position: "relative",
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                  transition: "box-shadow 0.3s",
                  height: "100%",
                }}
                className="group hover:shadow-md"
              >
                <Link
                  to={`/gallery/${album._id}`}
                  style={{ display: "block", height: "100%" }}
                >
                  <div
                    style={{
                      aspectRatio: "1/1",
                      position: "relative",
                      backgroundColor: "#f3f4f6",
                    }}
                  >
                    <img
                      src={`${BACKEND_URL}${album.coverImage.path}`}
                      alt={album.title}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                      backgroundColor: "rgba(0, 0, 0, 0)",
                      transition: "background-color 0.2s",
                    }}
                    className="group-hover:bg-opacity-10"
                  />
                  <div
                    style={{
                      padding: "1rem",
                      backgroundColor: "white",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: 500,
                        color: "#111827",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {album.title}
                    </h3>
                    {album.description && (
                      <p
                        style={{
                          marginTop: "0.25rem",
                          fontSize: "0.875rem",
                          color: "#6b7280",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {album.description}
                      </p>
                    )}
                    <p
                      style={{
                        marginTop: "0.5rem",
                        fontSize: "0.75rem",
                        color: "#9ca3af",
                      }}
                    >
                      {new Date(album.date).toLocaleDateString()} •{" "}
                      {album.images.length} photo
                      {album.images.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default GallerySection;
