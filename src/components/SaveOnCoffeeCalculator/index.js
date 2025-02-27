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

const SectionTitle = styled.h2`
    margin-top: 30px;
    color: #34495e;
    border-bottom: 2px solid #ecf0f1;
    padding-bottom: 5px;
    display: flex;
    align-items: center;
    gap: 8px;
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
    background: linear-gradient(45deg, #3498db, #2980b9);
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
    color: ${props => props.shop ? "#e74c3c" : "#3498db"};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SaveMoneyBox = styled(Box)`
    width: 100%;
    background: #ffffff;
    color: #2c3e50;
    font-size: 22px;
`;

export const SaveOnCoffeeCalculator = () => {
    // Basic Coffee Inputs (with defaults)
    const [coffeeShopPrice, setCoffeeShopPrice] = useState("3.50"); // Price per cup in $
    const [homeCoffeePrice, setHomeCoffeePrice] = useState("0.50"); // Price per cup in $
    const [cupsPerDay, setCupsPerDay] = useState("2");
    const [daysPerYear, setDaysPerYear] = useState("260"); // e.g., workdays
    
    // Results
    const [shopAnnualCost, setShopAnnualCost] = useState(null);
    const [homeAnnualCost, setHomeAnnualCost] = useState(null);
    const [annualSavings, setAnnualSavings] = useState(null);
    const [futureSavings, setFutureSavings] = useState(null);

    const calculateCoffeeSavings = () => {
        const shopCost = parseFloat(coffeeShopPrice) * parseFloat(cupsPerDay) * parseFloat(daysPerYear);
        const homeCost = parseFloat(homeCoffeePrice) * parseFloat(cupsPerDay) * parseFloat(daysPerYear);
        const savings = shopCost - homeCost;
        
        // Future value if you invest your savings at 10% compounded annually for 5 years
        const interestRate = 0.10;
        const years = 5;
        const futureValue = savings * Math.pow(1 + interestRate, years);
        
        setShopAnnualCost(shopCost.toFixed(2));
        setHomeAnnualCost(homeCost.toFixed(2));
        setAnnualSavings(savings.toFixed(2));
        setFutureSavings(futureValue.toFixed(2));
    };
    
    return (
        <Container>
            <Title>☕️ Save on Coffee Simulator</Title>
            
            <SectionTitle>📋 Basic Coffee Inputs</SectionTitle>
            <Label>💲 Coffee Shop Price per Cup</Label>
            <Input 
                type="number" 
                value={coffeeShopPrice} 
                onChange={(e) => setCoffeeShopPrice(e.target.value)}
                placeholder="e.g., 3.50" />
            
            <Label>💲 Home Brew Price per Cup</Label>
            <Input 
                type="number" 
                value={homeCoffeePrice} 
                onChange={(e) => setHomeCoffeePrice(e.target.value)}
                placeholder="e.g., 0.50" />
            
            <Label>☕️ Cups Consumed per Day</Label>
            <Input 
                type="number" 
                value={cupsPerDay} 
                onChange={(e) => setCupsPerDay(e.target.value)}
                placeholder="e.g., 2" />
            
            <Label>📅 Days per Year</Label>
            <Input 
                type="number" 
                value={daysPerYear} 
                onChange={(e) => setDaysPerYear(e.target.value)}
                placeholder="e.g., 260" />
            
            <Button onClick={calculateCoffeeSavings}>🚀 Calculate Savings</Button>
            
            {/* Results */}
            {annualSavings !== null && (
                <>
                    <ComparisonContainer>
                        <Box shop>
                            Coffee Shop Annual Cost <br /> 💲{shopAnnualCost}
                        </Box>
                        <Box>
                            Home Coffee Annual Cost <br /> 💲{homeAnnualCost}
                        </Box>
                    </ComparisonContainer>
                    <SaveMoneyBox>
                        💰 Annual Savings: <strong>$ {annualSavings}</strong> <br />
                        📈 Future Value (5 yrs @ 10%): <strong>$ {futureSavings}</strong>
                    </SaveMoneyBox>
                </>
            )}
        </Container>
    );
};
