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
    color: ${props => props.expensive ? "#e74c3c" : "#3498db"};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SaveMoneyBox = styled(Box)`
    width: 100%;
    background: #ffffff;
    color: #2c3e50;
    font-size: 22px;
`;

export const GymSavingsCalculator = () => {
    const [gymMembershipCost, setGymMembershipCost] = useState("50"); // Monthly cost in $
    const [homeEquipmentCost, setHomeEquipmentCost] = useState("500"); // One-time setup cost in $
    const [months, setMonths] = useState("12");

    const [gymAnnualCost, setGymAnnualCost] = useState(null);
    const [homeAnnualCost, setHomeAnnualCost] = useState(null);
    const [annualSavings, setAnnualSavings] = useState(null);

    const calculateGymSavings = () => {
        const gymCost = parseFloat(gymMembershipCost) * parseFloat(months);
        const homeCost = parseFloat(homeEquipmentCost); // Assume single-year purchase
        const savings = gymCost - homeCost;

        setGymAnnualCost(gymCost.toFixed(2));
        setHomeAnnualCost(homeCost.toFixed(2));
        setAnnualSavings(savings.toFixed(2));
    };

    return (
        <Container>
            <Title>💪 Save on Gym Membership vs Home Gym</Title>
            
            <Label>🏋️ Gym Membership Cost (Monthly $)</Label>
            <Input 
                type="number" 
                value={gymMembershipCost} 
                onChange={(e) => setGymMembershipCost(e.target.value)}
                placeholder="e.g., 50" />
            
            <Label>🏠 Home Gym Equipment Cost (One-time $)</Label>
            <Input 
                type="number" 
                value={homeEquipmentCost} 
                onChange={(e) => setHomeEquipmentCost(e.target.value)}
                placeholder="e.g., 500" />
            
            <Label>📅 Number of Months</Label>
            <Input 
                type="number" 
                value={months} 
                onChange={(e) => setMonths(e.target.value)}
                placeholder="e.g., 12" />
            
            <Button onClick={calculateGymSavings}>🚀 Calculate Savings</Button>
            
            {annualSavings !== null && (
                <>
                    <ComparisonContainer>
                        <Box expensive>
                            Gym Annual Cost <br /> 💲{gymAnnualCost}
                        </Box>
                        <Box>
                            Home Gym Cost <br /> 💲{homeAnnualCost}
                        </Box>
                    </ComparisonContainer>
                    <SaveMoneyBox>
                        💰 Savings Over {months} Months: <strong>$ {annualSavings}</strong>
                    </SaveMoneyBox>
                </>
            )}
        </Container>
    );
};
