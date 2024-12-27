import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const AccordionContainer = styled.div`
    width: 100%;
    max-width: 60rem;
    margin: 0 auto;
    border: 1px solid #cbd5e0;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #fff;
`;

const AccordionItem = styled.div`
    border-bottom: 1px solid #cbd5e0;

    &:last-child {
        border-bottom: none;
    }
`;

const AccordionTitle = styled.div`
    padding: 1rem;
    background-color: #3182ce;
    color: #fff;
    cursor: pointer;
    font-size: 1.125rem;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
        background-color: #2b6cb0;
    }
`;

const AccordionContent = styled.div`
    max-height: ${({ isOpen }) => (isOpen ? "1000px" : "0")};
    overflow: hidden;
    transition: max-height 0.5s ease, padding 0.5s ease;
    background-color: #f7fafc;
    font-size: 1rem;
    color: #4a5568;
    padding: ${({ isOpen }) => (isOpen ? "1rem" : "0 1rem")};
`;

const Chevron = styled.span`
    font-size: 1.5rem;
    transform: ${({ isOpen }) => (isOpen ? "rotate(90deg)" : "rotate(0deg)")};
    transition: transform 0.3s ease;
`;
const recommendations = [
    {
        title: "What factors impact the range of an e-bike?",
        content: "The range of an e-bike can be affected by various factors including wind resistance, rider weight, battery capacity, terrain, and the level of pedal assist used. For example, riding against strong winds or carrying heavy loads can reduce the range."
    },
    {
        title: "What motor power should I choose for my e-bike?",
        content: "The motor power you need depends on your riding style and terrain. A 250W motor is suitable for flat terrain and casual riding, while a 500W or 750W motor is better for hilly terrain and more demanding rides. For off-road or heavy-duty use, a 1000W motor may be appropriate."
    },
    {
        title: "What battery capacity (Ah) should I choose for my e-bike?",
        content: "Battery capacity, measured in amp-hours (Ah), determines how long your e-bike can run on a single charge. For short commutes, a 10Ah battery may suffice. For longer rides or more demanding use, consider a 15Ah or 20Ah battery. Higher capacity batteries provide longer range but are also heavier."
    }
];


export const RangeRecommendations = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <AccordionContainer>
            {recommendations.map((rec, index) => (
                <AccordionItem key={index}>
                    <AccordionTitle onClick={() => toggleAccordion(index)}>
                        <span>{rec.title}</span>
                        <Chevron isOpen={openIndex === index}>{openIndex === index ? "▶" : "▼"}</Chevron>
                    </AccordionTitle>
                    <AccordionContent
                        isOpen={openIndex === index}
                    >
                        {rec.content}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </AccordionContainer>
    );
};
