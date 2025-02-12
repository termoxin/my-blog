import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ProductImageComponent = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const fetchImageAsBase64 = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const ProductImage = ({ src, alt, ...props }) => {
  const [base64, setBase64] = useState('');

  useEffect(() => {
    const convertImageToBase64 = async () => {
      const base64Image = await fetchImageAsBase64(src);
      setBase64(base64Image);
    };

    convertImageToBase64();
  }, [src]);

  return <ProductImageComponent src={base64} alt={alt} {...props} />;
};