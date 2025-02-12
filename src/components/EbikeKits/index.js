import styled from "styled-components";
import { extractBatteryCapacity } from "./utils";
import React, { useState } from "react";
import { ProductImage } from "./components/ProductImage";
import {
  ProductCard,
  ProductGridContainer,
  ProductInfo,
  ProductTitle,
  ProductPrice,
  ProductReviews,
  ProductDetails,
  DetailLabel,
  ProductLink,
  ModalOverlay,
  ModalContent,
  CloseButton,
  CarouselContainer,
  CarouselImage,
  ProductSpecs,
  ProductSpecItem,
  ProductOptions,
  ProductOption,
} from "./styles";

const ProductGrid = ({ ranges, products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  // Helper function to extract specific specs
  const getSpecValue = (specs, key) => {
    const spec = specs.find(
      (s) => Object.keys(s)[0].toLowerCase() === key.toLowerCase(),
    );
    return spec ? Object.values(spec)[0] : null;
  };

  // Extract motor power (W) from title, specs, or options
  const extractMotorPower = (title, specs, options) => {
    const motorPowers = new Set();

    // Try to find in specs first
    for (const spec of specs) {
      const value = Object.values(spec)[0];
      if (typeof value === "string" && value.toLowerCase().includes("w")) {
        motorPowers.add(value.toLowerCase());
      }
    }

    for (const option of options) {
      for (const value of option.values) {
        const motorPowerMatch = value.displayName.match(/\d+w/i);
        if (motorPowerMatch) motorPowers.add(motorPowerMatch[0].toLowerCase());
      }
    }

    const motorPowerMatch = title.match(/\d+w/i);
    if (motorPowerMatch) motorPowers.add(motorPowerMatch[0].toLowerCase());

    // Ensure unique and properly formatted motor powers
    const uniqueMotorPowers = Array.from(motorPowers).map((power) =>
      power.toUpperCase(),
    );

    // Filter out combined values and keep only individual values
    const filteredMotorPowers = uniqueMotorPowers.filter(
      (power) => !power.includes(">") && !power.includes(" "),
    );

    return filteredMotorPowers.length > 0
      ? filteredMotorPowers.join("/")
      : "N/A";
  };

  return (
    <>
      <ProductGridContainer>
        {products.map((product) => {
          const motorPower = extractMotorPower(
            product.title,
            product.specs,
            product.skuOptions,
          );
          
          const batteryCapacity = extractBatteryCapacity(
            product.title,
            product.skuOptions,
          );
          const weight = getSpecValue(product.specs, "Weight");

          if (motorPower === "N/A" || batteryCapacity === "N/A") {
            return null;
          }

          const bikeRange =
            ranges.find((range) => range.id === product.id).ranges || "N/A";

          const formattedRanges = bikeRange.reduce((acc, range) => {
            return `${acc}${acc ? ", " : ""}${range.estimatedRange}km (${range.batteryCapacity})`;
          }, "");

          return (
            <ProductCard
              key={product.id}
              onClick={() => handleProductClick(product)}
            >
              <ProductImage
                style={{ objectFit: "scale-down" }}
                src={product.photos[0]}
                alt={product.title}
                onError={(e) =>
                  (e.target.src =
                    "https://www.shutterstock.com/image-vector/bike-bicycle-wheel-tire-vector-600nw-2437384221.jpg")
                }
              />
              <ProductInfo>
                <ProductTitle title={product.title}>
                  {product.title.length > 50
                    ? `${product.title.substring(0, 50)}...`
                    : product.title}
                </ProductTitle>
                <ProductPrice>{product.prices[0].discountPrice}</ProductPrice>
                <ProductReviews>
                  {product.store.positiveNum} reviews
                </ProductReviews>
                <ProductDetails>
                  <div>
                    <DetailLabel>Motor Power:</DetailLabel> {motorPower}
                  </div>
                  <div>
                    <DetailLabel>Battery Capacity:</DetailLabel>{" "}
                    {batteryCapacity}
                  </div>
                  <div>
                    <DetailLabel>Weight:</DetailLabel> {weight || "N/A"}{" "}
                    (usually ~<b>20-25kg</b>)
                  </div>
                  <div>
                    <DetailLabel>Range:</DetailLabel> {formattedRanges || "N/A"}
                  </div>
                </ProductDetails>
              </ProductInfo>
              <ProductLink
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Product
              </ProductLink>
            </ProductCard>
          );
        })}
      </ProductGridContainer>

      {selectedProduct && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <h2>{selectedProduct.title}</h2>

            <CarouselContainer>
              {selectedProduct.photos.map((photo, index) => (
                <CarouselImage
                  key={index}
                  src={photo}
                  alt={`Product Image ${index + 1}`}
                  onError={(e) =>
                    (e.target.src =
                      "https://www.shutterstock.com/image-vector/bike-bicycle-wheel-tire-vector-600nw-2437384221.jpg")
                  }
                />
              ))}
            </CarouselContainer>

            {/* Product Specifications */}
            <h3>Specifications</h3>
            <ProductSpecs>
              {selectedProduct.specs.map((spec, index) => (
                <ProductSpecItem key={index}>
                  <strong>{Object.keys(spec)[0]}:</strong>{" "}
                  {Object.values(spec)[0]}
                </ProductSpecItem>
              ))}
            </ProductSpecs>

            {/* Product Options */}
            <h3>Options</h3>
            <ProductOptions>
              {selectedProduct.skuOptions.map((option) => (
                <ProductOption key={option.id}>
                  <strong>{option.name}:</strong>{" "}
                  {option.values.map((value) => value.displayName).join(", ")}
                </ProductOption>
              ))}
            </ProductOptions>

            {/* Product Link */}
            <ProductLink
              href={selectedProduct.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Product
            </ProductLink>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default ProductGrid;
