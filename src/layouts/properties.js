import React from "react"
import { Helmet } from "react-helmet"
import styled, { createGlobalStyle } from "styled-components"

const PropertiesGlobalStyles = createGlobalStyle`
  *, *:after, *:before {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
  }

  a {
    border: none;
    color: #667eea;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
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

const MainContent = styled.main`
  flex: 1;
  width: 100%;
`

const PropertiesFooter = styled.footer`
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
  padding: 2rem 0;
  text-align: center;
  color: #666;
`

const PropertiesLayout = ({ children }) => {
  return (
    <PropertiesWrapper>
      <Helmet>
        <title>Properties App</title>
        <meta name="description" content="Properties management application" />
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

      <MainContent>
        {children}
      </MainContent>

      <PropertiesFooter>
        <p>&copy; 2024 Properties App. Все права защищены.</p>
      </PropertiesFooter>
      
      <PropertiesGlobalStyles />
    </PropertiesWrapper>
  )
}

export default PropertiesLayout
