import React, { useState } from "react";
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

const AccordionTitle = styled.button`
    width: 100%;
    padding: 1rem;
    background-color: #3182ce;
    color: #fff;
    cursor: pointer;
    font-size: 1.125rem;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: none;
    text-align: left;

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
    color: #2d3748;
    font-weight: 300;
    padding: ${({ isOpen }) => (isOpen ? "1rem" : "0 1rem")};
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const Chevron = styled.span`
    font-size: 1.5rem;
    transform: ${({ isOpen }) => (isOpen ? "rotate(90deg)" : "rotate(0deg)")};
    transition: transform 0.3s ease;
`;

const recommendations = [
    {
        title: "🚲 Key factors affecting e-bike range",
        content: "Your e-bike's range depends on factors like terrain (flat vs hilly), rider weight, speed, and battery size. For instance, riding on flat roads with a 15Ah battery can give you 50-70 km, while steep hills might reduce it to 30-40 km."
    },
    {
        title: "⚖️ How weight impacts your ride",
        content: "The heavier the load (rider + luggage), the lower the range. For example, adding a 10kg backpack might reduce your range by 10-15%. Keeping your e-bike and luggage as light as possible helps save battery life."
    },
    {
        title: "⚙️ Best motor power for your needs",
        content: "Choose motor power based on your route. For city rides, a 250W motor works great. For hills or off-road trails, opt for 500W or higher. A 500W motor on mixed terrain typically offers a range of 40-60 km."
    },
    {
        title: "🔋 Picking the right battery capacity",
        content: "Match battery capacity to your distance needs: 10Ah (15-30 km), 15Ah (30-60 km), or 20Ah+ (60+ km). For example, a 15Ah battery is perfect for a moderate 50 km ride on flat terrain."
    },
    {
        title: "🌡️ How weather affects range",
        content: "Cold weather can reduce range by up to 30%. To minimize this, store your battery indoors and plan shorter trips in the winter. For example, a 15Ah battery might drop from 50 km to 35 km in freezing conditions."
    },
    {
        title: "🛠️ Tips to extend battery life",
        content: "Avoid draining your battery completely and recharge it after every ride. Store it in a cool, dry place. For example, keeping the battery charged between 20-80% can extend its lifespan by 50%."
    },
    {
        title: "🏎️ Why speed matters",
        content: "Riding at 20 km/h instead of 25 km/h can increase your range by 10-20%. Maintaining a steady pace and using pedal assist sparingly helps conserve battery life."
    },
    {
        title: "💨 Wind resistance and its impact",
        content: "Headwinds can significantly drain the battery. For example, strong winds might reduce your range by 15-20%. Plan routes with sheltered paths or ride during calmer weather for better efficiency."
    },
    {
        title: "⛰️ Elevation's role in battery usage",
        content: "Climbing hills requires more power, reducing range. For example, a 500W motor might cover 50 km on flat terrain but only 30 km in a hilly area. Use lower assist levels to conserve battery on climbs."
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
                    <AccordionTitle onClick={() => toggleAccordion(index)} aria-expanded={openIndex === index}>
                        <span>{rec.title}</span>
                        <Chevron isOpen={openIndex === index}>{openIndex === index ? "▶" : "▼"}</Chevron>
                    </AccordionTitle>
                    <AccordionContent isOpen={openIndex === index} aria-hidden={openIndex !== index}>
                        <div>{rec.content}</div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </AccordionContainer>
    );
};
