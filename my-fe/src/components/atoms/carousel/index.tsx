import React from "react";
import { Carousel, Image } from "antd";
const contentStyle: React.CSSProperties = {
  height: "550px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

export default function CarouselCourses() {
  return (
    <Carousel autoplay style={{ padding: "50px 0" }}>
      <div>
        <h3 style={contentStyle}>
          <Image
            src="https://www.ryrob.com/wp-content/uploads/2020/01/101-Best-Online-Business-Courses-to-Learn-and-Grow-This-Year-Hero-Image.jpg"
            height={"95%"}
            style={{ marginTop: "2.5%" }}
          />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          {" "}
          <Image
            src="https://hackr.io/blog/best-python-courses/thumbnail/large?ezimgfmt=ng%3Awebp%2Fngcb1%2Frs%3Adevice%2Frscb1-2"
            height={"95%"}
            style={{ marginTop: "2.5%" }}
          />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          {" "}
          <Image
            src="https://s14308.pcdn.co/wp-content/uploads/2020/01/the-best-wordpress-training-courses-beaver-builder-blog.jpeg"
            height={"95%"}
            style={{ marginTop: "2.5%" }}
          />
        </h3>
      </div>
    </Carousel>
  );
}
