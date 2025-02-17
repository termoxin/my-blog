import styled from 'styled-components';

export const Container = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
`;

export const Card = styled.div`
    background-color: #fff;
    padding: 2rem;
    border-radius: 0.75rem;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    max-width: 50rem;
    width: 100%;
`;

export const Label = styled.label`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.75rem;

    a {
        border-bottom: none !important;
    }
`;

export const Input = styled.input`
    width: 100%;
    border: 1px solid #cbd5e0;
    border-radius: 0.5rem;
    padding: 0.75rem;
    margin-bottom: 1.5rem;
    font-size: 1rem;
    color: #2d3748;
    background-color: #edf2f7;
    transition: border-color 0.3s, box-shadow 0.3s;

    &:focus {
        border-color: #3182ce;
        box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.3);
        outline: none;
    }

    &::file-selector-button {
        border: 1px solid #cbd5e0;
        border-radius: 0.5rem;
        padding: 0.75rem;
        margin-right: 1rem;
        background-color: #e2e8f0;
        color: #2d3748;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: #cbd5e0;
        }
    }
`;

export const Slider = styled.input`
    width: 100%;
    margin-bottom: 1.5rem;
`;

export const Results = styled.div`
    color: #2d3748;

    span {
        font-weight: 700;
    }
`;

export const Warning = styled.div`
    background-color: #fff3cd;
    border: 1px solid #ffeeba;
    color: #856404;
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 1rem;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);

    & p {
        margin: 0.5rem 0;
    }

    .warning-header {
        font-weight: bold;
        font-size: 1.25rem;
    }

    .suggestion {
        background-color: #c6f6d5;
        border: 1px solid #b1dfbb;
        color: #155724;
        padding: 0.75rem;
        border-radius: 0.5rem;
        margin-top: 1rem;
        font-size: 0.9rem;
        display: inline-block;
    }
`;

export const Notice = styled.div`
    background-color: #e2e8f0;
    border: 1px solid #cbd5e0;
    color: #2d3748;
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
`;

export const ToggleButton = styled.button`
    background-color: #fff;
    color: #3182ce;
    border: 1px solid #cbd5e0;
    border-radius: 0.5rem;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    font-weight: bold;

    &:hover {
        color: #fff;
        background-color: #2b6cb0;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
    }
`;

export const AdvancedSettingsContainer = styled.div`
    background-color: #edf2f7;
    border: 1px solid #cbd5e0;
    color: #2d3748;
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-top: 1.5rem;
    text-align: center;
    box-sizing: border-box;
`;

export const KmAndWhChart = styled.div`
    margin-top: 2rem;
`;

export const EstimatedRange = styled.p`
    display: flex;
    font-size: 1rem;
    color: #2d3748;
    margin-top: 1.5rem;

    span {
        font-weight: 500;
    }
`;

export const RecuperationRange = styled.span`
    background-color: #c6f6d5;
    border: 1px solid #b1dfbb;
    color: #22543d;
    border-radius: 0.5rem;
    display: inline-block;
    margin-left: 0.5rem;
    font-size: 0.9rem;
    height: 30px;
    padding: 0 0.5rem;
`;

export const TotalPedalingGeneratedRange = styled.span`
    background-color: #fefcbf;
    border: 1px solid #faf089;
    color: #744210;
    border-radius: 0.5rem;
    display: inline-block;
    margin-left: 0.5rem;
    font-size: 0.9rem;
    align-items: center;
    height: 30px;
    padding: 0 0.5rem;
`;

export const EstimatedRangeBreakdown = styled.div`
    display: flex;
    align-items: flex-end;
`;

export const InputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
`;

export const SubmitButton = styled.button`
    background-color: #3182ce;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-left: 1rem;
    align-self: flex-start;

    &:hover {
        background-color: #2b6cb0;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
    }
`;

export const Divider = styled.hr`
    border: 0;
    height: 1px;
    background: #e2e8f0;
    margin: 2rem 0;
`;


export const FindEBikeKitButton = styled.button`
    background-color: #48bb78;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 1.5rem;

    &:hover {
        background-color: #38a169;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.6);
    }
`;