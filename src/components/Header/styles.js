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

export const ChristmasHat = styled.img`
  position: absolute;
  left: 40px;
  bottom: 70px;
  scale: 1.1;
  transform: rotate(-40deg);
`

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

export const IdeasButton = styled.button`
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  color: #fff;
  font-weight: bold;
  padding: 12px 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  width: 220px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  position: relative;

  &:hover {
    background: linear-gradient(to right, #feb47b, #ff7e5f);
    transform: scale(1.1);
  }

  &:active {
    top: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`
