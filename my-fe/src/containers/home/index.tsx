import React from "react";
import BestSales from "../../components/atoms/BestSales";
import CarouselCourses from "../../components/atoms/carousel";
import Courses from "../../components/atoms/Courses";

export default function HomeContainer() {
  return (
    <div>
      <CarouselCourses />
      <BestSales />
      <Courses />
    </div>
  );
}
