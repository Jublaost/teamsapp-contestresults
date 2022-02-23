import * as React from "react";
import { Provider, Flex, Text, Button, Header } from "@fluentui/react-northstar";
import { useState, useEffect } from "react";
import { useTeams } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

/**
 * Implementation of the Contest Results content page
 */
export const ContestResultsTab = () => {

    const [{ inTeams, theme, context }] = useTeams();
    const [entityId, setEntityId] = useState<string | undefined>();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [contestresults, setResult] = useState([]);

    useEffect(() => {
        fetch("https://kulti22.azurewebsites.net/api/GetBandCompetitionVotes?code=zWMAc4ksGCGmQDin1O2d1BTvx4Y0jz2Q23vWByWFAEQl7zMNA39Hyg==")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setResult(result);
                },
                // Note: it"s important to handle errors here
                // instead of a catch() block so that we don"t swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);

    const options = {
        indexAxis: "y" as const,
        elements: {
            bar: {
                borderWidth: 3
            }
        },
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false
            }
        }
    };

    const labels = contestresults!.map((item: any) => item.name);

    const data = {
        labels,
        datasets: [
            {
                data: contestresults!.map((item: any) => item.count),
                borderColor: "rgb(240,113,0)",
                backgroundColor: "rgba(240,113,0, 0.7)"
            }
        ]
    };

    /**
     * The render() method to create the UI of the tab
     */
    return (
        <Provider theme={theme}>
            <Flex fill={true} column hAlign="center" vAlign="center" styles={{
                padding: ".8rem 0 .8rem .5rem", backgroundColor: "transparent"
            }}>
                <Flex.Item>
                    <Header content="Act Competition Results" />
                </Flex.Item>
                <Flex.Item>
                    <div>
                        <div>
                            <Text content={entityId} />
                        </div>
                        <Bar options={options} data={data} />;
                    </div>
                </Flex.Item>
                <Flex.Item styles={{
                    padding: ".8rem 0 .8rem .5rem"
                }}>
                    <Text size="smaller" content="© Copyright Jublaost - Developed by Nilda" />
                </Flex.Item>
            </Flex>
        </Provider>
    );
};
