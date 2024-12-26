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
        title: "How far can an e-bike go on a single charge?",
        content: "The range of an e-bike depends on factors such as battery capacity, rider weight, terrain, and assist level. On average, an e-bike can travel between 20 and 70 miles on a single charge."
    },
    {
        title: "What type of e-bike should I buy?",
        content: "There are different types of e-bikes such as city bikes, mountain bikes, and folding bikes. Choose one based on your primary use case."
    },
    {
        title: "How to maintain an e-bike?",
        content: "Regular maintenance includes checking tire pressure, cleaning the bike, lubricating the chain, and ensuring the battery is charged and stored properly."
    },
    {
        title: "What safety gear do I need?",
        content: "Always wear a helmet, use lights and reflectors, and consider additional gear like gloves and padded shorts for longer rides."
    },
    {
        title: "How fast can an e-bike go?",
        content: "Most e-bikes have a top speed of 20 mph (32 km/h) in the US, while some can reach up to 28 mph (45 km/h). Speed limits may vary based on local regulations."
    },
    {
        title: "How long does it take to charge an e-bike battery?",
        content: "Charging time varies depending on the battery capacity and charger type. On average, it takes between 3 to 6 hours to fully charge an e-bike battery."
    },
    {
        title: "What type of battery is best for an e-bike?",
        content: "Lithium-ion batteries are the most common and preferred type for e-bikes due to their high energy density, long lifespan, and lightweight properties."
    },
    {
        title: "Which motor is better for an e-bike?",
        content: "There are two main types of motors: hub motors and mid-drive motors. Hub motors are simpler and more affordable, while mid-drive motors offer better performance and efficiency, especially on hills."
    },
    {
        title: "How to choose the right battery for your e-bike?",
        content: "Consider factors such as battery capacity (measured in watt-hours), voltage, and weight. Higher capacity batteries offer longer range but may be heavier. Ensure compatibility with your e-bike's motor and controller."
    },
    {
        title: "How to choose the right motor for your e-bike?",
        content: "Consider the type of riding you'll be doing. Hub motors are great for flat terrain and casual riding, while mid-drive motors are better for hilly terrain and off-road use. Also, consider the motor's power rating (measured in watts) and torque."
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
