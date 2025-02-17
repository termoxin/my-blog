import styled from "styled-components";

export const ProductGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
`;

export const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
  background: white;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const ProductInfo = styled.div`
  padding: 15px;
`;

export const ProductTitle = styled.h3`
  font-size: 14px;
  margin: 0 0 10px;
  color: #333;
`;

export const ProductPrice = styled.p`
  font-size: 20px;
  color: #333;
  margin: 0 0 10px;
  font-weight: bold;
`;

export const ProductReviews = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 10px;
`;

export const ProductDetails = styled.div`
  font-size: 14px;
  color: #555;
  margin: 10px 0;
`;

export const DetailLabel = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
`;

export const CarouselContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 10px;
  margin-bottom: 20px;
`;

export const CarouselImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: contain;
  flex-shrink: 0;
`;

export const ProductSpecs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  padding: 0;
`;

export const ProductSpecItem = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`;

export const ProductOptions = styled.div`
  margin-top: 20px;
`;

export const ProductOption = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

export const ProductLink = styled.a`
  display: inline-block;
  margin: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  text-align: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
    cursor: pointer;
    color: white;
  }
`;

export const CardPropertyTitle = styled.h2`
  font-size: 0.75rem;
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 4px;
`;

export const PropertyValue = styled.p`
  font-size: 1rem;
  font-weight: 700;
  color: ${props => {
    if (props.type === "speed") return "#3b82f6";
    if (props.type === "battery") return "#10b981";
    return "#ef4444";
  }};
`;

export const MaxSpeedContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  
`