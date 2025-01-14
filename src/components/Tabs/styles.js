import styled from "styled-components";

export const TabContainer = styled.div`
    display: flex;
    border-bottom: 2px solid #ddd;
    margin-bottom: 16px;
`;

export const Tab = styled.button`
    flex: 1;
    padding: 10px 16px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    background: ${(props) => (props.active ? "#fff" : "#f8f8f8")};
    border: none;
    border-bottom: ${(props) => (props.active ? "2px solid #007bff" : "none")};
    color: ${(props) => (props.active ? "#007bff" : "#555")};

    &:hover {
        background: #e8e8e8;
    }

    &:focus {
        outline: none;
    }
`;

export const TabContent = styled.div`
    display: ${(props) => (props.hidden ? "none" : "block")};
    padding: 16px;
    background: #fff;
    border: 1px solid #ddd;
    border-top: none;
    border-radius: 0 0 4px 4px;
    opacity: ${(props) => (props.hidden ? 0 : 1)};
    transition: opacity 0.3s ease-in-out;
`;