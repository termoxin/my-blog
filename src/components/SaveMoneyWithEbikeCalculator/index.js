import React, { useState } from "react";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
    max-width: 800px;
    margin: auto;
    padding: 25px;
    background: #fefefe;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Title = styled.h1`
    text-align: center;
    color: #333;
    margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
    margin-top: 30px;
    color: #444;
    border-bottom: 2px solid #ccc;
    padding-bottom: 5px;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Label = styled.label`
    display: block;
    margin-top: 10px;
    font-weight: bold;
    color: #555;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px 12px;
    margin-top: 5px;
    border: 1px solid #bbb;
    border-radius: 5px;
    font-size: 16px;
    transition: border 0.2s ease;
    &:focus {
        border-color: #28a745;
        outline: none;
    }
`;

const Select = styled.select`
    width: 100%;
    padding: 10px 12px;
    margin-top: 5px;
    border: 1px solid #bbb;
    border-radius: 5px;
    font-size: 16px;
    transition: border 0.2s ease;
    &:focus {
        border-color: #28a745;
        outline: none;
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 12px;
    margin-top: 25px;
    background: linear-gradient(45deg, #28a745, #32c759);
    color: white;
    font-size: 18px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    &:hover {
        transform: scale(1.03);
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
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
    background: white;
    border-radius: 8px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: ${props => props.car ? "#d9534f" : "#5cb85c"};
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const SaveMoneyBox = styled(Box)`
    width: 100%;
    background: #fff;
    color: #333;
    font-size: 22px;
`;

const HowItWorks = styled.div`
    margin-top: 30px;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    font-size: 16px;
    line-height: 1.6;
`;

export const SaveMoneyWithEbikeCalculator = () => {
    // Basic Inputs (defaults set)
    const [fuelConsumption, setFuelConsumption] = useState("25"); // mpg by default
    const [fuelCost, setFuelCost] = useState("3.50"); // per gallon
    const [electricityCost, setElectricityCost] = useState("0.15"); // per kWh
    const [dailyCommute, setDailyCommute] = useState("20"); // km per day
    const [unit, setUnit] = useState("mpg");

    // Additional Car Expenses (annual defaults)
    const [insuranceCar, setInsuranceCar] = useState("1200");
    const [maintenanceCar, setMaintenanceCar] = useState("500");
    const [depreciationCar, setDepreciationCar] = useState("1500");
    const [parkingFees, setParkingFees] = useState("600");
    const [financingCar, setFinancingCar] = useState("0");

    // Additional E-bike Expenses (annual defaults)
    const [insuranceBike, setInsuranceBike] = useState("100");
    const [maintenanceBike, setMaintenanceBike] = useState("100");
    const [depreciationBike, setDepreciationBike] = useState("200");
    const [financingBike, setFinancingBike] = useState("0");

    // Results
    const [carCost, setCarCost] = useState(null);
    const [ebikeCost, setEbikeCost] = useState(null);
    const [savings, setSavings] = useState(null);
    const [futureSavings, setFutureSavings] = useState(null);

    const calculateSavings = () => {
        const daysPerYear = 260; // 5 days/week * 52 weeks

        // Convert fuel consumption to L/100km if needed
        let fuelLitersPer100km =
            unit === "mpg" ? 235.21 / parseFloat(fuelConsumption) : parseFloat(fuelConsumption);

        // Fuel cost per km for car
        const fuelCostPerKm = (fuelLitersPer100km / 100) * parseFloat(fuelCost);
        const yearlyFuelCost = fuelCostPerKm * parseFloat(dailyCommute) * daysPerYear;

        // E-bike energy cost per km (assumes 1kWh per 60km)
        const ebikeEnergyCostPerKm = parseFloat(electricityCost) / 60;
        const yearlyEbikeEnergyCost = ebikeEnergyCostPerKm * parseFloat(dailyCommute) * daysPerYear;

        // Sum up additional costs for car (annual amounts)
        const carAdditional =
            parseFloat(insuranceCar || 0) +
            parseFloat(maintenanceCar || 0) +
            parseFloat(depreciationCar || 0) +
            parseFloat(parkingFees || 0) +
            parseFloat(financingCar || 0);

        // Sum up additional costs for e-bike (annual amounts)
        const ebikeAdditional =
            parseFloat(insuranceBike || 0) +
            parseFloat(maintenanceBike || 0) +
            parseFloat(depreciationBike || 0) +
            parseFloat(financingBike || 0);

        // Total annual cost calculations
        const totalCarCost = yearlyFuelCost + carAdditional;
        const totalEbikeCost = yearlyEbikeEnergyCost + ebikeAdditional;

        // Annual savings
        const annualSavings = totalCarCost - totalEbikeCost;

        // Future value after 5 years at 10% compounded annually
        const interestRate = 0.10;
        const years = 5;
        const futureValue = annualSavings * Math.pow(1 + interestRate, years);

        setCarCost(totalCarCost.toFixed(2));
        setEbikeCost(totalEbikeCost.toFixed(2));
        setSavings(annualSavings.toFixed(2));
        setFutureSavings(futureValue.toFixed(2));
    };

    return (
        <Container>
            <Title>💲 Save Money: E‑bike vs. Car Calculator 💲</Title>
            
            {/* Basic Inputs */}
            <SectionTitle>🚦 Basic Commute Inputs</SectionTitle>
            <Label>⛽️ Fuel Consumption</Label>
            <Input 
                type="number" 
                value={fuelConsumption} 
                onChange={(e) => setFuelConsumption(e.target.value)}
                placeholder="Enter fuel consumption (e.g., 25)" />
            
            <Label>📏 Unit</Label>
            <Select value={unit} onChange={(e) => setUnit(e.target.value)}>
                <option value="mpg">Miles per Gallon (mpg)</option>
                <option value="l/100km">Liters per 100km (L/100km)</option>
            </Select>
            
            <Label>💲 Fuel Cost (per gallon/liter)</Label>
            <Input 
                type="number" 
                value={fuelCost} 
                onChange={(e) => setFuelCost(e.target.value)}
                placeholder="Enter fuel cost (e.g., 3.50)" />
            
            <Label>🔌 Electricity Cost (per kWh)</Label>
            <Input 
                type="number" 
                value={electricityCost} 
                onChange={(e) => setElectricityCost(e.target.value)}
                placeholder="Enter electricity cost (e.g., 0.15)" />
            
            <Label>🛣️ Daily Commute Distance (km)</Label>
            <Input 
                type="number" 
                value={dailyCommute} 
                onChange={(e) => setDailyCommute(e.target.value)}
                placeholder="Enter daily commute distance (e.g., 20)" />
            
            {/* Additional Car Expenses */}
            <SectionTitle>🚗 Car Additional Expenses (Annual)</SectionTitle>
            <Label>🛡️ Insurance Cost</Label>
            <Input 
                type="number" 
                value={insuranceCar} 
                onChange={(e) => setInsuranceCar(e.target.value)}
                placeholder="Enter annual car insurance cost (e.g., 1200)" />
            
            <Label>🔧 Maintenance Costs</Label>
            <Input 
                type="number" 
                value={maintenanceCar} 
                onChange={(e) => setMaintenanceCar(e.target.value)}
                placeholder="Enter annual car maintenance cost (e.g., 500)" />
            
            <Label>📉 Depreciation Cost</Label>
            <Input 
                type="number" 
                value={depreciationCar} 
                onChange={(e) => setDepreciationCar(e.target.value)}
                placeholder="Enter annual car depreciation (e.g., 1500)" />
            
            <Label>🅿️ Parking & Registration Fees</Label>
            <Input 
                type="number" 
                value={parkingFees} 
                onChange={(e) => setParkingFees(e.target.value)}
                placeholder="Enter annual parking/registration fees (e.g., 600)" />
            
            <Label>💳 Financing Costs</Label>
            <Input 
                type="number" 
                value={financingCar} 
                onChange={(e) => setFinancingCar(e.target.value)}
                placeholder="Enter annual financing costs (e.g., 0)" />
            
            {/* Additional E-bike Expenses */}
            <SectionTitle>🚲 E-bike Additional Expenses (Annual)</SectionTitle>
            <Label>🛡️ Insurance Cost</Label>
            <Input 
                type="number" 
                value={insuranceBike} 
                onChange={(e) => setInsuranceBike(e.target.value)}
                placeholder="Enter annual e-bike insurance cost (e.g., 100)" />
            
            <Label>🔧 Maintenance Costs</Label>
            <Input 
                type="number" 
                value={maintenanceBike} 
                onChange={(e) => setMaintenanceBike(e.target.value)}
                placeholder="Enter annual e-bike maintenance cost (e.g., 100)" />
            
            <Label>📉 Depreciation Cost</Label>
            <Input 
                type="number" 
                value={depreciationBike} 
                onChange={(e) => setDepreciationBike(e.target.value)}
                placeholder="Enter annual e-bike depreciation (e.g., 200)" />
            
            <Label>💳 Financing Costs</Label>
            <Input 
                type="number" 
                value={financingBike} 
                onChange={(e) => setFinancingBike(e.target.value)}
                placeholder="Enter annual e-bike financing costs (e.g., 0)" />
            
            <Button onClick={calculateSavings}>🚀 Calculate Savings</Button>
            
            {/* Results */}
            {savings !== null && (
                <>
                    <ComparisonContainer>
                        <Box car>
                            🚗 Car Annual Cost <br /> 💲${carCost}
                        </Box>
                        <Box>
                            🚲 E-bike Annual Cost <br /> 💲${ebikeCost}
                        </Box>
                    </ComparisonContainer>
                    <SaveMoneyBox>
                        💰 Annual Savings: <strong>$ {savings}</strong> <br />
                        📈 Future Value (5 yrs @ 10%): <strong>$ {futureSavings}</strong>
                    </SaveMoneyBox>
                </>
            )}

            {/* How It Works Section */}
            <SectionTitle>ℹ️ How It Works</SectionTitle>
            <HowItWorks>
                This calculator helps you compare the annual costs of commuting by car versus an e-bike. 
                You can input your daily commute distance, fuel consumption, fuel cost, and electricity cost. 
                Additionally, you can enter annual expenses for both car and e-bike, such as insurance, maintenance, 
                depreciation, parking fees, and financing costs. The calculator then computes the total annual cost 
                for both car and e-bike, and shows you the annual savings and the future value of those savings 
                after 5 years with a 10% annual interest rate.
            </HowItWorks>
        </Container>
    );
};
