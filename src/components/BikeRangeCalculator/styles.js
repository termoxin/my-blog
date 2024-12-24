import styled from 'styled-components';

export const Container = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Card = styled.div`
    background-color: #fff;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 60rem;
    width: 100%;
`;

export const Label = styled.label`
    display: block;
    font-size: 1rem;
    font-weight: 500;
    color: #4a5568;
    margin-bottom: 0.5rem;
`;

export const Input = styled.input`
    width: 100%;
    border: 1px solid #cbd5e0;
    border-radius: 0.375rem;
    padding: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1rem;
    color: #4a5568;
    background-color: #f7fafc;
    transition: border-color 0.2s;

    &:focus {
        border-color: #3182ce;
        outline: none;
    }

    &::file-selector-button {
        border: 1px solid #cbd5e0;
        border-radius: 0.375rem;
        padding: 0.5rem;
        margin-right: 1rem;
        background-color: #edf2f7;
        color: #4a5568;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
            background-color: #e2e8f0;
        }
    }
`;

export const Slider = styled.input`
    width: 100%;
    margin-bottom: 1rem;
`;

export const Results = styled.div`
    color: #4a5568;
`;

export const Warning = styled.div`
    background-color: #fef2f2;
    border: 1px solid #fecaca;
    color: #991b1b;
    border-radius: 0.375rem;
    padding: 1rem;
    margin-top: 1rem;
`;

export const Notice = styled.div`
    background-color: #e2e8f0;
    border: 1px solid #cbd5e0;
    color: #2d3748;
    border-radius: 0.375rem;
    padding: 1rem;
    margin-bottom: 1rem;
    text-align: center;
`;