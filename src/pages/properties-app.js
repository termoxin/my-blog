import React from "react"
import { Helmet } from "react-helmet"
import styled, { createGlobalStyle } from "styled-components"

const GlobalReset = createGlobalStyle`
  *, *:after, *:before {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    padding: 0 !important; /* Убираем padding от блога */
  }

  a {
    border: none;
    text-decoration: none;
  }
`

const PropertiesWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const PropertiesHeader = styled.header`
  background: rgba(102, 126, 234, 0.1);
  border-bottom: 1px solid rgba(102, 126, 234, 0.2);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
`

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.h1`
  font-size: 1.5rem;
  color: #667eea;
  margin: 0;
`

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  
  a {
    color: #666;
    font-weight: 500;
    
    &:hover {
      color: #667eea;
    }
  }
`

const PropertiesContainer = styled.div`
  flex: 1;
  min-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  text-align: center;
  opacity: 0.9;
`

const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 500px;
  width: 90%;
  text-align: center;
`

const PropertiesFooter = styled.footer`
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
  padding: 2rem 0;
  text-align: center;
  color: #666;
`

const PropertiesApp = () => {
  return (
    <PropertiesWrapper>
      <Helmet>
        <title>Properties App - Hello World</title>
        <meta name="description" content="Properties application - coming soon" />
      </Helmet>
      
      <PropertiesHeader>
        <HeaderContent>
          <Logo>Properties App</Logo>
          <Nav>
            <a href="/">Главная</a>
            <a href="/search">Поиск</a>
            <a href="/about">О нас</a>
          </Nav>
        </HeaderContent>
      </PropertiesHeader>

      <PropertiesContainer>
        <Card>
          <Title>Hello World!</Title>
          <Subtitle>Добро пожаловать в Properties App</Subtitle>
          <p>Это новое приложение для работы с недвижимостью.</p>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: '0.8' }}>
            Домен: properties.futornyi.com
          </p>
        </Card>
      </PropertiesContainer>

      <PropertiesFooter>
        <p>&copy; 2024 Properties App. Все права защищены.</p>
      </PropertiesFooter>
      
      <GlobalReset />
    </PropertiesWrapper>
  )
}

export default PropertiesApp
