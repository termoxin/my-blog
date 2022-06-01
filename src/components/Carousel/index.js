import React from "react"

import { Carousel as ResponsiveCarousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

export const Carousel = ({ items }) => (
  <ResponsiveCarousel dynamicHeight>
    {items.map(item => (
      <div key={item.alt}>
        <img src={item.url} alt={item.alt} />
      </div>
    ))}
  </ResponsiveCarousel>
)
