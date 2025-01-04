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
        title: "🚲 What factors impact the range of an e-bike?",
        content: "The range of an e-bike is influenced by several factors: 🏔️ Terrain (steep inclines consume more battery), 💨 Wind resistance (strong headwinds reduce range), 🧳 Rider weight and load (heavier riders or extra luggage decrease efficiency), ⚡ Pedal assist level (higher assist uses more power), and 🚦 Riding style (smooth, consistent riding optimizes battery use). For example, a 250W motor on flat terrain might give you 50-70 km, but only 30-40 km on hilly terrain."
    },
    {
        title: "⚖️ How do weight and tire pressure impact e-bike performance?",
        content: "The total weight (bike, rider, and cargo) directly affects range and efficiency. 🏋️‍♂️ Lighter loads increase range, while heavier loads reduce it. Proper tire pressure is equally important: 🔧 Under-inflated tires increase rolling resistance and drain the battery faster. Always check and maintain the recommended tire pressure for optimal performance. ✅ For instance, maintaining proper tire pressure can improve range by 10-15%."
    },
    {
        title: "⚙️ What motor power should I choose for my e-bike?",
        content: "Your ideal motor power depends on your typical riding conditions: 🏙️ 250W is best for city commuting or flat terrains, ⛰️ 500W or 750W is ideal for hilly regions or hauling cargo, and 🛞 1000W is essential for off-road trails or heavy-duty tasks. Choose a motor that matches your riding needs without overloading your battery. 🔋 For example, a 500W motor might provide 40-60 km on mixed terrain."
    },
    {
        title: "🔋 What battery capacity (Ah) should I choose for my e-bike?",
        content: "Choose a battery capacity based on your planned distances: 🚶‍♂️ 10Ah (360Wh) covers 15–30 km for short city commutes, 🚴 15Ah (540Wh) is perfect for moderate trips of 30–60 km, and 🚵‍♀️ 20Ah or higher (720Wh+) provides 60+ km, ideal for long-distance adventures. Note that higher-capacity batteries are heavier ⚖️ and may affect handling. 🏁 For instance, a 20Ah battery might give you up to 100 km on flat terrain."
    },
    {
        title: "🌡️ How does temperature affect e-bike performance?",
        content: "Battery performance decreases in extreme temperatures. ❄️ Cold weather reduces battery capacity, while 🔥 very hot conditions may damage the battery. Store your e-bike indoors 🏠 and avoid exposing the battery to extreme temperatures for extended periods to preserve its lifespan. For example, battery range can drop by 20-30% in cold weather."
    },
    {
        title: "🛠️ How can I extend the lifespan of my e-bike battery?",
        content: "To extend battery life, avoid letting it drain completely 🚫🔋 and recharge it after each ride. 🔌 Store the battery in a cool, dry place 🌬️ and follow the manufacturer's recommended charging practices. Regular maintenance 🧽, such as cleaning terminals and checking for damage, also helps. For instance, keeping the battery charged between 20-80% can extend its lifespan by 50%."
    },
    {
        title: "🏎️ How does speed affect the range of an e-bike?",
        content: "Higher speeds drain the battery faster due to increased wind resistance 💨 and motor power usage. Riding at a moderate, steady speed is more energy-efficient and maximizes the range. For optimal results, use pedal assist wisely ⚡ and avoid excessive throttle use. For example, riding at 20 km/h instead of 25 km/h can increase your range by 10-20%."
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
                        <div dangerouslySetInnerHTML={{ __html: rec.content }} />
                    </AccordionContent>
                </AccordionItem>
            ))}
        </AccordionContainer>
    );
};
