import React, { useState } from "react";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
    max-width: 800px;
    margin: auto;
    padding: 25px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Title = styled.h1`
    text-align: center;
    color: #2c3e50;
    margin-bottom: 20px;
`;

const Label = styled.label`
    display: block;
    margin-top: 10px;
    font-weight: bold;
    color: #7f8c8d;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px 12px;
    margin-top: 5px;
    border: 1px solid #bdc3c7;
    border-radius: 5px;
    font-size: 16px;
    transition: border 0.2s ease;
    &:focus {
        border-color: #3498db;
        outline: none;
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 12px;
    margin-top: 25px;
    background: linear-gradient(45deg, #2ecc71, #27ae60);
    color: white;
    font-size: 18px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    &:hover {
        transform: scale(1.03);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }
    &:active {
        transform: scale(0.98);
    }
`;

const ComparisonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    flex-wrap: wrap;
    gap: 20px;
`;

const Box = styled.div`
    flex: 1;
    min-width: 250px;
    padding: 15px;
    background: #ecf0f1;
    border-radius: 8px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: ${props => props.soda ? "#e74c3c" : "#3498db"};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SaveMoneyBox = styled(Box)`
    width: 100%;
    background: #ffffff;
    color: #2c3e50;
    font-size: 22px;
`;

// Main Component
export const WaterVsSodaCalculator = () => {
    const [sodaPrice, setSodaPrice] = useState("1.50"); // Price per soda bottle
    const [sodasPerDay, setSodasPerDay] = useState("2");
    const [daysPerYear, setDaysPerYear] = useState("365");

    const [sodaAnnualCost, setSodaAnnualCost] = useState(null);
    const [waterAnnualCost, setWaterAnnualCost] = useState(null);
    const [annualSavings, setAnnualSavings] = useState(null);
    const [futureSavings, setFutureSavings] = useState(null);

    const calculateSavings = () => {
        const sodaCost = parseFloat(sodaPrice) * parseFloat(sodasPerDay) * parseFloat(daysPerYear);
        const waterCost = 0.10 * parseFloat(sodasPerDay) * parseFloat(daysPerYear); // Assuming tap water costs $0.10 per day
        const savings = sodaCost - waterCost;

        // Future value if invested at 8% annually for 5 years
        const interestRate = 0.08;
        const years = 5;
        const futureValue = savings * Math.pow(1 + interestRate, years);

        setSodaAnnualCost(sodaCost.toFixed(2));
        setWaterAnnualCost(waterCost.toFixed(2));
        setAnnualSavings(savings.toFixed(2));
        setFutureSavings(futureValue.toFixed(2));
    };

    return (
        <Container>
            <Title>🥤 Water vs. Soda Savings Calculator</Title>

            <Label>💲 Soda Price per Bottle</Label>
            <Input 
                type="number" 
                value={sodaPrice} 
                onChange={(e) => setSodaPrice(e.target.value)}
                placeholder="e.g., 1.50" 
            />

            <Label>🥤 Sodas Consumed per Day</Label>
            <Input 
                type="number" 
                value={sodasPerDay} 
                onChange={(e) => setSodasPerDay(e.target.value)}
                placeholder="e.g., 2" 
            />

            <Label>📅 Days per Year</Label>
            <Input 
                type="number" 
                value={daysPerYear} 
                onChange={(e) => setDaysPerYear(e.target.value)}
                placeholder="e.g., 365" 
            />

            <Button onClick={calculateSavings}>🚀 Calculate Savings</Button>

            {annualSavings !== null && (
                <>
                    <ComparisonContainer>
                        <Box soda>
                            Soda Annual Cost <br /> 💲{sodaAnnualCost}
                        </Box>
                        <Box>
                            Water Annual Cost <br /> 💲{waterAnnualCost}
                        </Box>
                    </ComparisonContainer>
                    <SaveMoneyBox>
                        💰 Annual Savings: <strong>$ {annualSavings}</strong> <br />
                        📈 Future Value (5 yrs @ 8%): <strong>$ {futureSavings}</strong>
                    </SaveMoneyBox>
                </>
            )}
        </Container>
    );
};
