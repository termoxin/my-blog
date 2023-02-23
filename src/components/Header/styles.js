import styled from "styled-components"

export const Avatar = styled.img`
  border: 5px solid #fff;
  border-radius: 100%;
  box-sizing: border-box;
  color: #000;
  display: inline-block;
  font-size: 1.5em;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  width: 120px;
  height: auto;
`

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
`

export const TakeCarLink = styled.a`
  position: relative;
  bottom: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const PausedMark = styled.div`
  background: #ff8773;
  position: relative;
  bottom: 44px;
  left: 69px;
  color: #ffffff;
  border-radius: 7px;
  padding: 0px 3px;
  font-size: 6px;
  font-weight: 900;
`
