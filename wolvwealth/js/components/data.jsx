import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import { PieChart } from '@mui/x-charts/PieChart';

function Data({ name }) {
    const algorithms = [
        "Mean Variance",
        "Black-Litterman",
        "Hierarchical Risk Parity",
        "Critical Line"
    ]
    const riskModels = [
        "Sample Covariance",
        "Semicovariance",
        "Exp Covariance",
        "Ledoit Wolf",
        "Ledoit Wolf Constant Variance",
        "Ledoit Wolf Single Factor",
        "Ledoit Wolf Constant Correlation",
        "Oracle Approximating"
    ];
    const outputTypes = [
        "Shares", "Weights"
    ]

    const [moneyInAccount, setMoneyInAccount] = useState(0.00);
    const [algorithmSelection, setAlgorithmSelection] = useState(algorithms[0]);
    const [riskModelSelection, setRiskModelSelection] = useState(algorithms[0]);
    const [outputType, setOutputType] = useState("weights"); // "weights" || "shares"
    const [algoArgs, setAlgoArgs] = useState(""); // i.e. "{'risk_aversion': 1.0}"
    const [hasOptimized, setHasOptimized] = useState(false);
    const [portfolioJSON, setPortfolioJSON] = useState({}); 

    const parseJSONEntry = (e) => {
        let json = JSON.parse(e.target.value);
        setPortfolioJSON(json);
        console.log(json);
        setMoneyInAccount(json["initial_cash"]);
        setAlgorithmSelection(json["algorithm"]);
    }

    const handleAlgorithmChange = (e) => {
        setAlgorithmSelection(e.target.value);
    }
    const handleInitialCashChange = (e) => {
        setMoneyInAccount(e.target.value);
    }
    const handleRiskModelChange = (e) => {
        console.log(e.target.value);
    }
    const handleOutputTypeChange = (e) => {
        setOutputType(e.target.value);
    }
    const handleAlgoArgsChange = (e) => {
        setAlgoArgs(e.target.value);
    }

    const handleOptimizeSubnit = (e) => {
        console.log("Optimize button clicked!");
        console.log("Algorithm: " + algorithmSelection);
        console.log("Risk Model: " + riskModelSelection);
        console.log("Output Type: " + outputType);
        console.log("Algo Args: " + algoArgs);
        console.log("Money in Account: " + moneyInAccount);
        console.log("Portfolio JSON: " + portfolioJSON);
        setHasOptimized(true);
        fetch("/api/optimize", {
            method: "POST",
            body: JSON.stringify({
                "algorithm": algorithmSelection,
                "risk_model": riskModelSelection,
                "output_type": outputType,
                "algo_args": algoArgs,
                "money_in_account": moneyInAccount,
                "portfolio_json": portfolioJSON
            })
        }).then((list) => {
            console.log(list);
        })
        .except((err) => {
            console.log(err);
        })
    }

    const data = [
        { id: 0, label: 'META', value: 10 },
        { id: 1, label: 'AAPL', value: 20 },
        { id: 2, label: 'AMZN', value: 30 },
        { id: 3, label: 'NFLX', value: 40 },
        { id: 4, label: 'GOOGL', value: 50 },
    ];

    const options = {
        title: "My Daily Activities",
        pieHole: 0.4,
        is3D: false,
    };

    return (
        <div className="flex flex-col p-10 bg-gray h-screen">
            <div className="flex flex-col">
                <div id="contentHeader" className="flex flex-row mb-8">
                    <h1 className="text-4xl font-bold mr-auto">
                        Your dashboard
                    </h1>
                </div>
                <div className="flex flex-grow flex-col">
                    <div id="inputRow" className="flex">
                        {/* Inputs: Money in account, Algorithm selection (dropdown), and optimize button */}
                        <div className="flex flex-row flex-wrap">
                            <div className="flex flex-col flex-grow mr-4 text-xl">
                                {/* upload button */}
                                <label htmlFor="portfolioJSON" className="text-xl">Upload Portfolio</label>
                                <input type="text" id="portfolioJSON" placeholder="paste json here" className="rounded-lg p-5 bg-gray-dark fira w-[auto]"></input>
                            </div>
                            <div className="flex flex-col flex-grow mr-4">
                                <label htmlFor="moneyInAccount" className="text-xl">Initial Cash</label>
                                <span className="flex flex-row text-xl fira rounded-lg bg-gray-dark">
                                    <span className="pl-5 py-5">$</span>
                                    <input type="number" id="moneyInAccount" className="bg-gray-dark rounded-lg py-5 pr-5 w-[auto]" placeholder="0.00" value={moneyInAccount}></input>
                                </span>
                            </div>
                            <div className="flex flex-col flex-grow mr-4 fira text-xl">
                                <label htmlFor="algorithmSelection" className="text-xl">Algorithm</label>
                                <select id="algorithmSelection" className="rounded-lg bg-gray-dark p-5 w-[auto]" 
                                defaultValue={algorithms[0]} onChange={handleAlgorithmChange}>
                                    {
                                    algorithms.map((algorithm) => 
                                        (<option key={algorithm} value={algorithm}>{algorithm}</option>)
                                    )
                                    }
                                </select>
                            </div>
                            <div className="flex flex-col flex-grow mr-4 fira text-xl">
                                <label htmlFor="riskModelSelection" className="text-xl">Risk Model</label>
                                <select id="riskModelSelection" className="rounded-lg bg-gray-dark p-5 w-[auto]" 
                                defaultValue={riskModels[0]} onChange={handleRiskModelChange}>
                                    {
                                    riskModels.map((riskModel) => 
                                        (<option key={riskModel} value={riskModel}>{riskModel}</option>)
                                    )
                                    }
                                </select>
                            </div>
                            <div className="flex flex-col flex-grow mr-4 fira text-xl">
                                <label htmlFor="outputTypeSelection" className="text-xl">Output Type</label>
                                <select id="outputTypeSelection" className="rounded-lg bg-gray-dark p-5 w-[auto]" 
                                defaultValue={outputTypes[0]} onChange={handleOutputTypeChange}>
                                    {outputTypes.map((outputType) => 
                                        (<option key={outputType} value={outputType}>{outputType}</option>))
                                    }
                                </select>
                            </div>
                            <div className="flex flex-col flex-grow mr-4 text-xl">
                                {/* upload button */}
                                <label htmlFor="algoArgs" className="text-xl">Upload Portfolio</label>
                                <input type="text" id="algoArgs" placeholder="paste json here" className="rounded-lg p-5 bg-gray-dark fira w-[auto]"></input>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="optimizeButton" className="text-xl">Optimize</label>
                                <button className="text-xl rounded-lg bg-gray-dark p-5 fira  hover:bg-blue">
                                    <span className="pr-3">Optimize</span>
                                    <FontAwesomeIcon icon={faBoltLightning} />
                                </button>
                            </div>
                            <div className="flex flex-col text-xl m-10">
                                {
                                    (hasOptimized ?
                                        <span>
                                            We've optimized your portfolio!
                                        </span>
                                        :
                                        <span className="text-red">
                                            You have not optimized your portfolio yet!
                                        </span>)
                                }
                            </div>
                        </div>
                    </div>
                    <hr className="bg-gray-dark text-gray-dark font-bold"></hr>
                    <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-1 gap-8">
                        <div id="before" className="">
                            <span>Ticker</span>
                            <div className="w-[100%] h-[100%] bg-blue">
                                
                            </div>
                        </div>
                        <div id="after" className="">
                            <span>Insights</span>
                            <div className="text-white w-[50%] bg-gray mx-auto">

                                <PieChart
                                    series={[
                                        {
                                        data: [
                                            { id: 0, label: 'META', value: 10 },
                                            { id: 1, label: 'AAPL', value: 20 },
                                            { id: 2, label: 'AMZN', value: 30 },
                                            { id: 3, label: 'NFLX', value: 40 },
                                            { id: 4, label: 'GOOGL', value: 50 },
                                        ],
                                        highlightScope: { faded: 'global', highlighted: 'item' },
                                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                        innerRadius: 60,
                                        outerRadius: 120,
                                        paddingAngle: 1,
                                        cornerRadius: 3,
                                        startAngle: -180,
                                        endAngle: 180,
                                        cx: 150,
                                        cy: 150,
                                        }
                                    ]}
                                    width={400}
                                    height={400}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Data;