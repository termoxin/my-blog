import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import styled, { createGlobalStyle, keyframes } from "styled-components"
import { EBikeRangeCalculator } from "../components/BikeRangeCalculator"

const GlobalReset = createGlobalStyle`
  *, *:after, *:before {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
    line-height: 1.6;
    padding: 0 !important;
    color: #1e293b;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    border: none;
    text-decoration: none;
  }
`

const EBikeWrapper = styled.div`
  min-height: 100vh;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
  color: #1e293b;
  -webkit-font-smoothing: antialiased;
`

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e2e8f0;
`

const HeaderContent = styled.div`
  margin: 0 auto;
  max-width: 80rem;
  padding: 0 1rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`

const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
`

const LogoIcon = styled.div`
  display: inline-flex;
  height: 2rem;
  width: 2rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background-color: #10b981;
  color: white;
  font-weight: 700;
  font-size: 1.25rem;
`

const Nav = styled.nav`
  display: none;
  align-items: center;
  gap: 1.5rem;
  font-size: 0.875rem;

  @media (min-width: 768px) {
    display: flex;
  }

  a {
    color: #1e293b;
    
    &:hover {
      color: #10b981;
    }
  }
`

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.75rem;
  background-color: #10b981;
  padding: 0.5rem 1rem;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #059669;
    text-decoration: none;
  }
`

const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #dcfce7 100%);
`

const HeroContent = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 80rem;
  padding: 4rem 1rem;

  @media (min-width: 640px) {
    padding: 4rem 1.5rem;
  }

  @media (min-width: 768px) {
    padding: 6rem 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 6rem 2rem;
  }
`

const HeroGrid = styled.div`
  display: grid;
  gap: 2.5rem;
  align-items: center;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

const HeroText = styled.div``

const HeroTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.025em;

  @media (min-width: 768px) {
    font-size: 3rem;
  }

  .highlight {
    color: #10b981;
  }
`

const HeroSubtitle = styled.p`
  margin-top: 1.25rem;
  font-size: 1.125rem;
  color: #475569;

  .bold {
    font-weight: 500;
    color: #1e293b;
  }
`

const HeroButtons = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
`

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  background-color: #10b981;
  padding: 0.75rem 1.25rem;
  color: white;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #059669;
    text-decoration: none;
  }
`

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  border: 1px solid #cbd5e1;
  padding: 0.75rem 1.25rem;
  font-weight: 600;
  color: #374151;
  cursor: pointer;

  &:hover {
    background-color: #f8fafc;
    text-decoration: none;
  }
`

const HeroNote = styled.p`
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: #64748b;
`

const FeatureCards = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  margin-top: 2rem;
`

const FeatureCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  
  .icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    display: block;
  }
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 0.75rem 0;
    color: #1e293b;
  }
  
  p {
    color: #64748b;
    margin: 0;
    line-height: 1.5;
  }
`

const Section = styled.section`
  padding: 4rem 0;

  @media (min-width: 768px) {
    padding: 5rem 0;
  }

  &.bg-gray {
    background-color: #f8fafc;
  }
`

const Container = styled.div`
  margin: 0 auto;
  max-width: 80rem;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`

const SectionTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 800;
  text-align: center;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`

const SectionSubtitle = styled.p`
  margin-top: 0.75rem;
  color: #475569;
  text-align: center;
  margin-bottom: 0;
`

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;

  &.cols-3 {
    @media (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &.cols-2 {
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`

const Card = styled.div`
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  padding: 1.5rem;
  background: white;

  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0;
  }

  p {
    margin-top: 0.5rem;
    color: #475569;
    margin-bottom: 0;
  }

  ul {
    margin-top: 0.75rem;
    list-style: none;
    padding: 0;

    li {
      color: #374151;
      margin-bottom: 0.5rem;
    }
  }
`

const TestimonialsSection = styled(Section)`
  background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
`

const TestimonialCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  position: relative;
  height: auto;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  &:before {
    content: '"';
    position: absolute;
    top: 0.75rem;
    left: 1rem;
    font-size: 2.5rem;
    color: #10b981;
    font-weight: 700;
    line-height: 1;
    z-index: 1;
  }
`

const TestimonialText = styled.p`
  font-style: italic;
  margin: 0.75rem 0 1.5rem 0;
  color: #374151;
  line-height: 1.6;
  font-size: 1rem;
  flex-grow: 1;
  
  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 0.5rem;
  
  .avatar {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 0.875rem;
    flex-shrink: 0;
  }
  
  .info {
    flex-grow: 1;
    
    .name {
      font-weight: 600;
      color: #1e293b;
      margin: 0;
      font-size: 0.95rem;
    }
    
    .role {
      font-size: 0.875rem;
      color: #64748b;
      margin: 0;
      margin-top: 0.125rem;
    }
  }
`

const CalculatorSection = styled(Section)`
  background: white;
`

const Footer = styled.footer`
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
`

const FooterContent = styled.div`
  margin: 0 auto;
  max-width: 80rem;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  @media (min-width: 640px) {
    padding: 2rem 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 2rem 2rem;
  }
`

const FooterText = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
`

const FooterLinks = styled.div`
  font-size: 0.875rem;
  color: #64748b;

  a {
    color: #64748b;
    
    &:hover {
      color: #10b981;
    }
  }

  span {
    margin: 0 0.5rem;
  }
`

const EBikeCalculatorPage = () => {
  const [currentYear, setCurrentYear] = useState(2024)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <EBikeWrapper>
      <Helmet>
        <title>E-Bike Range Calculator | Plan Your Electric Bike Journey | EBike Distance Calculator</title>
        <meta name="description" content="Calculate your e-bike range with precision. Upload GPX routes, factor in weight, wind, and terrain. Advanced e-bike range calculator for accurate trip planning." />
        <meta name="keywords" content="e-bike range calculator, electric bike range calculator, ebike distance calculator, e-bike trip planner, electric bike battery calculator, ebike range estimation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="E-Bike Range Calculator | Plan Your Electric Bike Journey" />
        <meta property="og:description" content="Calculate your e-bike range with precision. Upload GPX routes and get accurate range estimates for your electric bike journey." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <GlobalReset />

      {/* Header */}
      <Header>
        <HeaderContent>
          <Logo href="#" onClick={() => scrollToSection('hero')}>
            <LogoIcon>🚴</LogoIcon>
            <span>E-Bike Calculator</span>
          </Logo>
          <Nav>
            <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features') }}>Features</a>
            <a href="#use-cases" onClick={(e) => { e.preventDefault(); scrollToSection('use-cases') }}>Use Cases</a>
            <a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollToSection('testimonials') }}>Reviews</a>
            <a href="#calculator" onClick={(e) => { e.preventDefault(); scrollToSection('calculator') }}>Calculator</a>
          </Nav>
          <CTAButton href="#calculator" onClick={(e) => { e.preventDefault(); scrollToSection('calculator') }}>
            Try Calculator
          </CTAButton>
        </HeaderContent>
      </Header>

      {/* Hero */}
      <HeroSection id="hero">
        <HeroContent>
          <HeroGrid>
            <HeroText>
              <HeroTitle>
                Plan your perfect <span className="highlight">e-bike journey</span><br />
                with precision range calculation.
              </HeroTitle>
              <HeroSubtitle>
                Upload your GPX route and get accurate range estimates. 
                <span className="bold"> Factor in weight, wind, terrain</span> — never run out of battery unexpectedly again.
              </HeroSubtitle>
              <HeroButtons>
                <PrimaryButton href="#calculator" onClick={(e) => { e.preventDefault(); scrollToSection('calculator') }}>
                  Calculate Range Now
                </PrimaryButton>
                <SecondaryButton href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features') }}>
                  See Features
                </SecondaryButton>
              </HeroButtons>
              <HeroNote>Free to use • Works with any GPX route • No registration required</HeroNote>
            </HeroText>

            <FeatureCards>
              <FeatureCard>
                <span className="icon">📍</span>
                <h3>GPX Route Upload</h3>
                <p>Upload your planned route and get instant range analysis</p>
              </FeatureCard>
              <FeatureCard>
                <span className="icon">⚡</span>
                <h3>Battery Optimization</h3>
                <p>Plan charging stops and maximize your ride time</p>
              </FeatureCard>
              <FeatureCard>
                <span className="icon">🌟</span>
                <h3>Real-World Factors</h3>
                <p>Accounts for weight, wind, elevation, and more</p>
              </FeatureCard>
            </FeatureCards>
          </HeroGrid>
        </HeroContent>
      </HeroSection>

      {/* Features */}
      <Section id="features">
        <Container>
          <SectionTitle>Everything You Need for Perfect Trip Planning</SectionTitle>
          <SectionSubtitle>Advanced features designed for real-world e-bike adventures</SectionSubtitle>
          
          <div style={{
            display: 'grid',
            gap: '1.5rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            marginTop: '2rem'
          }}>
            <Card>
              <h3>🗺️ GPX Route Analysis</h3>
              <p>Upload GPX files from Komoot, Strava, or any route planner. Get detailed elevation profiles and distance analysis.</p>
            </Card>
            <Card>
              <h3>⚖️ Weight Calculations</h3>
              <p>Factor in your weight, bike weight, luggage, and even your dog's weight for accurate range estimates.</p>
            </Card>
            <Card>
              <h3>🌬️ Weather Conditions</h3>
              <p>Adjust for wind speed and direction to see how weather affects your battery consumption.</p>
            </Card>
            <Card>
              <h3>🔋 Battery Management</h3>
              <p>Set your battery capacity and get warnings about when to recharge during long trips.</p>
            </Card>
            <Card>
              <h3>📊 Visual Analytics</h3>
              <p>See power consumption charts, elevation profiles, and detailed route visualizations.</p>
            </Card>
            <Card>
              <h3>⏰ Trip Timeline</h3>
              <p>Plan your departure time and see when you'll arrive, including recommended rest stops.</p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Use Cases */}
      <Section id="use-cases" className="bg-gray">
        <Container>
          <SectionTitle>Perfect for Every Type of Rider</SectionTitle>
          <Grid className="cols-2" style={{ marginTop: '2rem' }}>
            <Card>
              <h3>🏢 Daily Commuters</h3>
              <ul>
                <li>• Plan your work commute with confidence</li>
                <li>• Factor in hills and headwinds on your route</li>
                <li>• Know exactly when to charge at the office</li>
                <li>• Never arrive late due to dead battery</li>
              </ul>
            </Card>
            <Card>
              <h3>🏔️ Adventure Riders</h3>
              <ul>
                <li>• Plan multi-day touring routes with charging stops</li>
                <li>• Calculate range for mountain trails and long distances</li>
                <li>• Factor in camping gear and equipment weight</li>
                <li>• Visualize elevation profiles before you ride</li>
              </ul>
            </Card>
            <Card>
              <h3>🚚 Cargo Bike Users</h3>
              <ul>
                <li>• Calculate range with heavy loads and trailers</li>
                <li>• Plan delivery routes efficiently</li>
                <li>• Factor in trailer dimensions and drag</li>
                <li>• Optimize for family trips with kids and gear</li>
              </ul>
            </Card>
            <Card>
              <h3>🔧 E-Bike Enthusiasts</h3>
              <ul>
                <li>• Test different motor power settings</li>
                <li>• Compare battery performance over time</li>
                <li>• Fine-tune pedaling assistance levels</li>
                <li>• Analyze power consumption patterns</li>
              </ul>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Testimonials */}
      <TestimonialsSection id="testimonials">
        <Container>
          <SectionTitle>Loved by E-Bike Riders Worldwide</SectionTitle>
          <SectionSubtitle>Real feedback from riders who plan smarter with our calculator</SectionSubtitle>
          
          <div style={{
            display: 'grid',
            gap: '1.5rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            marginTop: '2rem'
          }}>
            <TestimonialCard>
              <TestimonialText>
                This calculator saved my weekend trip! I was planning a 60km route through the mountains and it showed I'd need a charging stop. Without it, I would have been stranded halfway.
              </TestimonialText>
              <TestimonialAuthor>
                <div className="avatar">MK</div>
                <div className="info">
                  <p className="name">Marco K.</p>
                  <p className="role">Weekend Adventurer</p>
                </div>
              </TestimonialAuthor>
            </TestimonialCard>
            
            <TestimonialCard>
              <TestimonialText>
                As a bike messenger, I need to know exactly how far I can go. The weight calculations with my cargo load are spot-on. Best range calculator I've used.
              </TestimonialText>
              <TestimonialAuthor>
                <div className="avatar">LR</div>
                <div className="info">
                  <p className="name">Lisa R.</p>
                  <p className="role">Bike Messenger</p>
                </div>
              </TestimonialAuthor>
            </TestimonialCard>
            
            <TestimonialCard>
              <TestimonialText>
                Perfect for planning family bike tours! I can factor in our trailer weight, my wife's weight, and even our dog. The visualizations help convince the family the route is doable.
              </TestimonialText>
              <TestimonialAuthor>
                <div className="avatar">DH</div>
                <div className="info">
                  <p className="name">David H.</p>
                  <p className="role">Family Touring</p>
                </div>
              </TestimonialAuthor>
            </TestimonialCard>
            
            <TestimonialCard>
              <TestimonialText>
                The wind factor is incredibly accurate! I commute along the coast and headwinds can drain my battery 30% faster. This calculator predicts it perfectly.
              </TestimonialText>
              <TestimonialAuthor>
                <div className="avatar">AC</div>
                <div className="info">
                  <p className="name">Anna C.</p>
                  <p className="role">Daily Commuter</p>
                </div>
              </TestimonialAuthor>
            </TestimonialCard>
            
            <TestimonialCard>
              <TestimonialText>
                I use this for bikepacking trips across Europe. The multi-day planning with charging stops is invaluable. Much better than guessing range from manufacturer specs.
              </TestimonialText>
              <TestimonialAuthor>
                <div className="avatar">TP</div>
                <div className="info">
                  <p className="name">Thomas P.</p>
                  <p className="role">Bikepacking Enthusiast</p>
                </div>
              </TestimonialAuthor>
            </TestimonialCard>
            
            <TestimonialCard>
              <TestimonialText>
                Finally, a calculator that considers real-world conditions! The elevation analysis helped me realize I needed a bigger battery for my mountain commute.
              </TestimonialText>
              <TestimonialAuthor>
                <div className="avatar">SK</div>
                <div className="info">
                  <p className="name">Sarah K.</p>
                  <p className="role">Mountain Commuter</p>
                </div>
              </TestimonialAuthor>
            </TestimonialCard>
          </div>
        </Container>
      </TestimonialsSection>

      {/* Calculator */}
      <CalculatorSection id="calculator">
        <Container>
          <SectionTitle>E-Bike Range Calculator</SectionTitle>
          <SectionSubtitle>Upload your GPX route and get accurate range estimates</SectionSubtitle>
          
          <div style={{ marginTop: '3rem' }}>
            <EBikeRangeCalculator />
          </div>
        </Container>
      </CalculatorSection>

      {/* Footer */}
      <Footer>
        <FooterContent>
          <FooterText>© {currentYear} E-Bike Range Calculator. Made with ❤️ for the e-bike community.</FooterText>
          <FooterLinks>
            <a href="mailto:rostyslav.futornyi@gmail.com">Contact</a>
            <span>·</span>
            <a href="https://t.me/termoxin">@termoxin</a>
          </FooterLinks>
        </FooterContent>
      </Footer>
    </EBikeWrapper>
  )
}

export default EBikeCalculatorPage
