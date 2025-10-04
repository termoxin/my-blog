import React, { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
`

const shimmer = keyframes`
  0% { left: -100%; }
  100% { left: 100%; }
`

// Styled Components
const DemoContainer = styled.div`
  margin: 2rem 0;
  background: white;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`

const DemoHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1.5rem;
  color: white;
  text-align: center;
`

const DemoTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
`

const DemoSubtitle = styled.p`
  margin: 0;
  opacity: 0.9;
  font-size: 1rem;
`

const NotificationBanner = styled.div`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  .icon {
    font-size: 1rem;
  }
`

const DemoControls = styled.div`
  background: #f8fafc;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`

const ControlButton = styled.button`
  background: ${props => props.active ? '#667eea' : 'white'};
  color: ${props => props.active ? 'white' : '#374151'};
  border: 1px solid ${props => props.active ? '#667eea' : '#d1d5db'};
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.active ? '#5a67d8' : '#f9fafb'};
    border-color: ${props => props.active ? '#5a67d8' : '#9ca3af'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(248, 250, 252, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  opacity: ${props => props.show ? 1 : 0};
  pointer-events: ${props => props.show ? 'auto' : 'none'};
  z-index: 10;
`

const Spinner = styled.div`
  width: 2rem;
  height: 2rem;
  border: 2px solid #e2e8f0;
  border-top: 2px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const LoadingText = styled.div`
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  animation: ${pulse} 2s ease-in-out infinite;
`

const PropertiesGrid = styled.div`
  position: relative;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  min-height: 400px;
`

const PropertyCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  overflow: hidden;
  transition: all 0.3s ease;
  opacity: 0;
  animation: ${fadeIn} 0.6s ease forwards;
  animation-delay: ${props => props.index * 150}ms;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }

  ${props => props.filtered && `
    opacity: 0.3;
    transform: scale(0.95);
  `}
`

const PropertyImage = styled.div`
  height: 160px;
  position: relative;
  overflow: hidden;
  background: #f1f5f9;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    animation: ${shimmer} 2s infinite;
    z-index: 1;
  }
`

const PropertyBadge = styled.div`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: ${props => props.type === 'undervalued' ? '#10b981' : props.type === 'new' ? '#f59e0b' : '#6b7280'};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  z-index: 2;
`

const PriceTag = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 2;
`

const PropertyContent = styled.div`
  padding: 1rem;
`

const PropertyTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.3;
`

const PropertyDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`

const PropertyPrice = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
`

const PropertySize = styled.div`
  font-size: 0.875rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

const PropertyFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`

const FeatureBadge = styled.span`
  background: #f1f5f9;
  color: #475569;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
`

const SavingsIndicator = styled.div`
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  border: 1px solid #a7f3d0;
  border-radius: 0.5rem;
  padding: 0.5rem;
  text-align: center;
  
  .amount {
    font-size: 0.875rem;
    font-weight: 700;
    color: #059669;
    margin-bottom: 0.125rem;
  }
  
  .label {
    font-size: 0.75rem;
    color: #047857;
  }
`

const StatsBar = styled.div`
  background: #f8fafc;
  padding: 1rem 1.5rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-around;
  text-align: center;
`

const StatItem = styled.div`
  .number {
    font-size: 1.5rem;
    font-weight: 700;
    color: #667eea;
    display: block;
    line-height: 1;
  }
  
  .label {
    font-size: 0.75rem;
    color: #64748b;
    margin-top: 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.025em;
  }
`

// Mock property data adapted for the demo with real images
const mockProperties = [
  {
    id: 1,
    title: "Modern Apartment, 70m²",
    area: "Nea Smyrni",
    price: 170000,
    size: 70,
    pricePerSqm: 2428,
    floor: "1st Floor",
    year: 2018,
    features: ["Elevator", "Balcony", "Renovated"],
    undervalued: true,
    savings: 65183,
    image: "https://m1.spitogatos.gr/315233946_900x675.jpg?v=20130730"
  },
  {
    id: 2,
    title: "Cozy Apartment, 58m²",
    area: "Nea Smyrni",
    price: 145000,
    size: 58,
    pricePerSqm: 2500,
    floor: "2nd Floor",
    year: 2020,
    features: ["Elevator", "Modern", "Bright"],
    undervalued: true,
    savings: 49866,
    image: "https://m2.spitogatos.gr/316033084_900x675.jpg?v=20130730"
  },
  {
    id: 3,
    title: "Compact Studio, 52m²",
    area: "Nea Smyrni",
    price: 135000,
    size: 52,
    pricePerSqm: 2596,
    floor: "3rd Floor",
    year: 2019,
    features: ["Elevator", "Storage", "Quiet"],
    undervalued: true,
    savings: 39707,
    image: "https://m3.spitogatos.gr/328735040_900x675.jpg?v=20130730"
  },
  {
    id: 4,
    title: "Investment Flat, 48m²",
    area: "Nea Smyrni",
    price: 125000,
    size: 48,
    pricePerSqm: 2604,
    floor: "4th Floor",
    year: 2017,
    features: ["Elevator", "City View", "Investment"],
    undervalued: true,
    savings: 36268,
    image: "https://m3.spitogatos.gr/310993715_900x675.jpg?v=20130730"
  },
  {
    id: 5,
    title: "Luxury Apartment, 95m²",
    area: "Nea Smyrni",
    price: 320000,
    size: 95,
    pricePerSqm: 3368,
    floor: "2nd Floor",
    year: 2021,
    features: ["Luxury", "Garden", "Parking"],
    undervalued: false,
    savings: 0,
    image: "https://m2.spitogatos.gr/327608614_900x675.jpg?v=20130730"
  },
  {
    id: 6,
    title: "Penthouse, 120m²",
    area: "Nea Smyrni",
    price: 450000,
    size: 120,
    pricePerSqm: 3750,
    floor: "5th Floor",
    year: 2022,
    features: ["Penthouse", "Terrace", "Premium"],
    undervalued: false,
    savings: 0,
    image: "https://m1.spitogatos.gr/322579288_900x675.jpg?v=20130730"
  }
]

const InteractivePropertyDemo = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [filteredProperties, setFilteredProperties] = useState(mockProperties)
  const [activeFilters, setActiveFilters] = useState({
    undervalued: false,
    maxPrice: false,
    minYear: false,
    maxSize: false
  })

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const applyFilters = () => {
    let filtered = [...mockProperties]

    if (activeFilters.undervalued) {
      filtered = filtered.filter(prop => prop.undervalued)
    }

    if (activeFilters.maxPrice) {
      filtered = filtered.filter(prop => prop.price <= 200000)
    }

    if (activeFilters.minYear) {
      filtered = filtered.filter(prop => prop.year >= 2018)
    }

    if (activeFilters.maxSize) {
      filtered = filtered.filter(prop => prop.size <= 70)
    }

    setFilteredProperties(filtered)
  }

  const toggleFilter = (filterName) => {
    setIsLoading(true)
    
    setTimeout(() => {
      setActiveFilters(prev => ({
        ...prev,
        [filterName]: !prev[filterName]
      }))
      setIsLoading(false)
    }, 800)
  }

  useEffect(() => {
    if (!isLoading) {
      applyFilters()
    }
  }, [activeFilters, isLoading])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const totalSavings = filteredProperties.reduce((sum, prop) => sum + prop.savings, 0)
  const avgPricePerSqm = filteredProperties.length > 0 
    ? Math.round(filteredProperties.reduce((sum, prop) => sum + prop.pricePerSqm, 0) / filteredProperties.length)
    : 0

  return (
    <DemoContainer>
      <PropertiesGrid>
        <LoadingOverlay show={isLoading}>
          <Spinner />
          <LoadingText>
            Filtering properties...<br />
            <small style={{ fontSize: '0.75rem', opacity: 0.8 }}>
              Applying smart filters
            </small>
          </LoadingText>
        </LoadingOverlay>

        {!isLoading && filteredProperties.map((property, index) => (
          <PropertyCard 
            key={property.id} 
            index={index}
            filtered={!filteredProperties.includes(property)}
          >
            <PropertyImage>
              <img 
                src={property.image} 
                alt={property.title}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.style.background = 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)';
                }}
              />
              {property.undervalued && (
                <PropertyBadge type="undervalued">Undervalued</PropertyBadge>
              )}
              <PriceTag>
                {formatPrice(property.pricePerSqm)}/m²
              </PriceTag>
            </PropertyImage>

            <PropertyContent>
              <PropertyTitle>{property.title}</PropertyTitle>
              
              <PropertyDetails>
                <PropertyPrice>{formatPrice(property.price)}</PropertyPrice>
                <PropertySize>
                  🏠 {property.size}m² • {property.floor}
                </PropertySize>
              </PropertyDetails>

              <PropertyFeatures>
                {property.features.map((feature, idx) => (
                  <FeatureBadge key={idx}>{feature}</FeatureBadge>
                ))}
                <FeatureBadge>Built {property.year}</FeatureBadge>
              </PropertyFeatures>

              {property.undervalued && (
                <SavingsIndicator>
                  <div className="amount">Save {formatPrice(property.savings)}</div>
                  <div className="label">Below market value</div>
                </SavingsIndicator>
              )}
            </PropertyContent>
          </PropertyCard>
        ))}

        {!isLoading && filteredProperties.length === 0 && (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '3rem',
            color: '#64748b'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>No properties match your filters</h3>
            <p style={{ margin: 0 }}>Try adjusting your search criteria</p>
          </div>
        )}
      </PropertiesGrid>

      <StatsBar>
        <StatItem>
          <span className="number">{filteredProperties.length}</span>
          <div className="label">Alerts Sent</div>
        </StatItem>
        <StatItem>
          <span className="number">{formatPrice(totalSavings / 1000)}K</span>
          <div className="label">Potential Savings</div>
        </StatItem>
        <StatItem>
          <span className="number">{formatPrice(avgPricePerSqm)}</span>
          <div className="label">Avg Alert Price/m²</div>
        </StatItem>
        <StatItem>
          <span className="number">{filteredProperties.filter(p => p.undervalued).length}</span>
          <div className="label">Undervalued Alerts</div>
        </StatItem>
      </StatsBar>
    </DemoContainer>
  )
}

export default InteractivePropertyDemo
