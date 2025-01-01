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

    a {
        border-bottom: none !important;
    }
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
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  color: #856404;
  border-radius: 0.375rem;
  padding: 1rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  & p {
    margin: 0.5rem 0;
  }

  .warning-header {
    font-weight: bold;
    font-size: 1.25rem;
  }

  .suggestion {
    background-color: #c3e6cb;
    color: #155724;
    border: 1px solid #b1dfbb;
    padding: 0.5rem;
    border-radius: 0.375rem;
    margin-top: 1rem;
    font-size: 0.9rem;
    display: inline-block;
  }
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

export const ToggleButton = styled.button`
    background-color: #e2e8f0;
    color: #2d3748;
    border: none;
    border-radius: 0.375rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
    font-weight: bold;

    &:hover {
        background-color: #cbd5e0;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
    }
`;

export const AdvancedSettingsContainer = styled.div`
    background-color: #edf2f7;
    border: 1px solid rgb(187, 216, 255);
    color: #1a202c;
    border-radius: 0.375rem;
    padding: 1rem;
    margin-top: 1rem;
    text-align: center;
    box-sizing: border-box;
`;

export const KmAndWhChart = styled.div`
    margin-top: 2rem;
`;
