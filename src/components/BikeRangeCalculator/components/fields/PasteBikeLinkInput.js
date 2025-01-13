import React, { useState, useEffect } from "react";
import { Label, Input, InputContainer, SubmitButton } from "../../styles";

export const PasteBikeLink = ({ bikeData, onBikeDataReceived }) => {
    const [bikeLink, setBikeLink] = useState("");

    useEffect(() => {
        if (bikeData) {
            setBikeLink(bikeData.link);
        }
    }, [bikeData]);

    const handleSubmit = async () => {
        if (bikeLink) {
            try {
                const response = await fetch(bikeLink);
                if (response.ok) {
                    const html = await response.text();
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = html;

                    const extractEBikeValues = () => {
                        const bodyText = tempDiv.textContent;

                        const wattRegex = /(\d+)\s*[wW]\b/i;
                        const ampHourRegex = /(\d+)\s*[aA][hH]?\b/i;
                        const voltRegex = /(\d+)\s*[vV]\b/i;
                        const kgRegex = /(\d+)\s*[kK][gG]\b/i;

                        const watts = bodyText.match(wattRegex)?.[1];
                        const ampHours = bodyText.match(ampHourRegex)?.[1];
                        const volts = bodyText.match(voltRegex)?.[1];
                        const kilograms = bodyText.match(kgRegex)?.[1];

                        return {
                            watts,
                            ampHours: ampHours,
                            volts: volts,
                            kilograms
                        };
                    };

                    const eBikeValues = extractEBikeValues();
                    onBikeDataReceived(eBikeValues);
                } else {
                    console.error("Failed to fetch the page. Status:", response.status);
                }
            } catch (error) {
                console.error("Error fetching the page:", error);
            }
        } else {
            console.error("Bike link is empty.");
        }
    };

    return (
        <InputContainer>
            <Label htmlFor="bike-link">🔗 Paste Bike link To Extract E-bike Data</Label>
            <Input
                type="text"
                id="bike-link"
                value={bikeLink}
                onChange={(e) => setBikeLink(e.target.value)}
            />
            <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
        </InputContainer>
    );
};
