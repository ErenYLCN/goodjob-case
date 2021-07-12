import React, {useState, useEffect} from 'react'
import { Line } from 'react-chartjs-2' 
import '../components/chart.css'

export default function Charts({data}) {

    // useState hooks
    const [chartData, setChartData] = useState({});
    const [platform, setPlatform] = useState('Android');
    const [metric, setMetric] = useState('Clicks');
    const [funRace, setFunRace] = useState(true);
    const [paperFold, setPaperFold] = useState(true);
    const [jellyDye, setJellyDye] = useState(true);

    const [optionsData, setOptionsData] = useState({
        responsive: true,
        title: {text: `Number of Clicks for ${platform}`, display: true, fontSize: 24},
        scales: {
            yAxes: [
                { 
                    ticks: {
                        min: 49000,
                        max: 58000,
                        stepSize: 2000
                    },
                    gridLines: {
                        display: true
                    }
                }
            ],
            xAxes: [
                {
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10,
                    },
                    gridLines: {
                        display: false
                    }
                }
            ]
        },
        legend: {
            display: true,
            align: 'end',
            labels: {
                fontSize: 12
            }
        },
    });

    // These arrays will be filled to render the chart
    var dates = [];

    var funRaceClicks = [];
    var funRaceDaus = [];
    var funRaceImpressions = [];
    var funRaceInstalls = [];
    var funRaceRevenues = [];

    var foldPuzzleClicks = [];
    var foldPuzzleDaus = [];
    var foldPuzzleImpressions = [];
    var foldPuzzleInstalls = [];
    var foldPuzzleRevenues = [];

    var jellyDyeClicks = [];
    var jellyDyeDaus = [];
    var jellyDyeImpressions = [];
    var jellyDyeInstalls = [];
    var jellyDyeRevenues = [];

    var clicksOptions = 
    {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 6,
        title: {text: `Number of Clicks for ${platform}`, display: true, fontSize: 24},
        scales: {
            yAxes: [
                {
                    ticks: {
                        min: 49000,
                        max: 58000,
                        stepSize: 2000
                    },
                    gridLines: {
                        display: true
                    }
                }
            ],
            xAxes: [
                {
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10,
                    },
                    gridLines: {
                        display: false
                    }
                }
            ]
        },
        legend: {
            display: true,
            align: 'end',
            labels: {
                fontSize: 12
            }
        },
    };

    var dauOptions = 
    {
        responsive: true,
        title: {text: `DAU value for ${platform}`, display: true, fontSize: 24},
        scales: {
            yAxes: [
                {
                    ticks: {
                        min: 0,
                        max: 14000,
                        stepSize: 2000
                    },
                    gridLines: {
                        display: true
                    }
                }
            ],
            xAxes: [
                {
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10,
                    },
                    gridLines: {
                        display: false
                    }
                }
            ]
        },
        legend: {
            display: true,
            align: 'end',
            labels: {
                fontSize: 12
            }
        },
    };

    var impressionsOptions = 
    {
        responsive: true,
        title: {text: `Impressions for ${platform}`, display: true, fontSize: 24},
        scales: {
            yAxes: [
                {
                    ticks: {
                        min: 495000,
                        max: 545000,
                        stepSize: 10000
                    },
                    gridLines: {
                        display: true
                    }
                }
            ],
            xAxes: [
                {
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10,
                    },
                    gridLines: {
                        display: false
                    }
                }
            ]
        },
        legend: {
            display: true,
            align: 'end',
            labels: {
                fontSize: 12
            }
        },
    };

    var installsOptions = 
    {
        responsive: true,
        title: {text: `Installs for ${platform}`, display: true, fontSize: 24},
        scales: {
            yAxes: [
                {
                    ticks: {
                        min: 700,
                        max: 3300,
                        stepSize: 500
                    },
                    gridLines: {
                        display: true
                    }
                }
            ],
            xAxes: [
                {
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10,
                    },
                    gridLines: {
                        display: false
                    }
                }
            ]
        },
        legend: {
            display: true,
            align: 'end',
            labels: {
                fontSize: 12
            }
        },
    };

    //Anytime filter data changes, this function is called for re-render
    function handleChange(platform, metric) {

        setPlatform(platform);
        setMetric(metric);

        bindData(platform);
        renderChart(metric);
    }

    //This function is used for filling all the necessary data based on filter options
    function bindData(platform) {

        dates = [];

        var funRaceData = data.filter((row) => {
            return row.app == "Fun Race 3D" && row.platform == platform;
        });
        var foldPuzzleData = data.filter((row) => {
            return row.app == "Fold Puzzle" && row.platform == platform;
        });
        var jellyDyeData = data.filter((row) => {
            return row.app == "Jelly Dye" && row.platform == platform;
        });

        funRaceData.map((row) => {
            dates.push(row.date);
            funRaceClicks.push(row.clicks);
            funRaceDaus.push(row.dau);
            funRaceImpressions.push(row.impressions);
            funRaceInstalls.push(row.installs);
            funRaceRevenues.push(row.revenue);
        });

        foldPuzzleData.map((row) => {
            foldPuzzleClicks.push(row.clicks);
            foldPuzzleDaus.push(row.dau);
            foldPuzzleImpressions.push(row.impressions);
            foldPuzzleInstalls.push(row.installs);
            foldPuzzleRevenues.push(row.dau);
        });

        jellyDyeData.map((row) => {
            jellyDyeClicks.push(row.clicks);
            jellyDyeDaus.push(row.dau);
            jellyDyeImpressions.push(row.impressions);
            jellyDyeInstalls.push(row.installs);
            jellyDyeRevenues.push(row.revenue);
        });
    }

    function renderChart(metric) {
        
        if(funRace && paperFold && jellyDye) {

            if(metric == 'Clicks') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fun Race 3D',
                            data: funRaceClicks,
                            backgroundColor: [
                                'rgba(53,168,224, 0)'
                            ],
                            borderColor: [
                                'rgba(53,168,224, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 2,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(53,168,224, 0.7)',
                            pointHoverBackgroundColor: 'rgba(53,168,224, 1)'
                        },
                        {
                            label: 'Fold Puzzle',
                            data: foldPuzzleClicks,
                            backgroundColor: [
                                'rgba(224,52,168, 0)'
                            ],
                            borderColor: [
                                'rgba(224,52,168, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 8,
                            pointHoverRadius: 12,
                            pointBackgroundColor: 'rgba(24,52,168, 0.7)',
                            pointHoverBackgroundColor: 'rgba(24,52,168, 1)',
                            pointStyle: 'star',
                        },
                        {
                            label: 'JellyDye',
                            data: jellyDyeClicks,
                            backgroundColor: [
                                'rgba(168,224,52, 0)'
                            ],
                            borderColor: [
                                'rgba(168,224,52, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 6,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(168,224,52, 0.7)',
                            pointHoverBackgroundColor: 'rgba(168,224,52, 1)',
                            pointStyle: 'cross',
                        },
                    ]
                });
                setOptionsData(clicksOptions);
            }
            else if(metric == 'Dau') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fun Race 3D',
                            data: funRaceDaus,
                            backgroundColor: [
                                'rgba(53,168,224, 0)'
                            ],
                            borderColor: [
                                'rgba(53,168,224, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 2,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(53,168,224, 0.7)',
                            pointHoverBackgroundColor: 'rgba(53,168,224, 1)'
                        },
                        {
                            label: 'Fold Puzzle',
                            data: foldPuzzleDaus,
                            backgroundColor: [
                                'rgba(224,52,168, 0)'
                            ],
                            borderColor: [
                                'rgba(224,52,168, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 8,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(24,52,168, 0.7)',
                            pointHoverBackgroundColor: 'rgba(24,52,168, 1)',
                            pointStyle: 'star',
                        },
                        {
                            label: 'JellyDye',
                            data: jellyDyeDaus,
                            backgroundColor: [
                                'rgba(168,224,52, 0)'
                            ],
                            borderColor: [
                                'rgba(168,224,52, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 6,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(168,224,52, 0.7)',
                            pointHoverBackgroundColor: 'rgba(168,224,52, 1)',
                            pointStyle: 'cross',
                        }
                    ]
                });   
                setOptionsData(dauOptions);
            }
            else if(metric == 'Impressions') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fun Race 3D',
                            data: funRaceImpressions,
                            backgroundColor: [
                                'rgba(53,168,224, 0)'
                            ],
                            borderColor: [
                                'rgba(53,168,224, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 2,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(53,168,224, 0.7)',
                            pointHoverBackgroundColor: 'rgba(53,168,224, 1)'
                        },
                        {
                            label: 'Fold Puzzle',
                            data: foldPuzzleImpressions,
                            backgroundColor: [
                                'rgba(224,52,168, 0)'
                            ],
                            borderColor: [
                                'rgba(224,52,168, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 8,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(24,52,168, 0.7)',
                            pointHoverBackgroundColor: 'rgba(24,52,168, 1)',
                            pointStyle: 'star',
                        },
                        {
                            label: 'JellyDye',
                            data: jellyDyeImpressions,
                            backgroundColor: [
                                'rgba(168,224,52, 0)'
                            ],
                            borderColor: [
                                'rgba(168,224,52, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 6,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(168,224,52, 0.7)',
                            pointHoverBackgroundColor: 'rgba(168,224,52, 1)',
                            pointStyle: 'cross',
                        }
                    ]
                });   
                setOptionsData(impressionsOptions);
            }
            else if(metric == 'Installs') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fun Race 3D',
                            data: funRaceInstalls,
                            backgroundColor: [
                                'rgba(53,168,224, 0)'
                            ],
                            borderColor: [
                                'rgba(53,168,224, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 2,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(53,168,224, 0.7)',
                            pointHoverBackgroundColor: 'rgba(53,168,224, 1)'
                        },
                        {
                            label: 'Fold Puzzle',
                            data: foldPuzzleInstalls,
                            backgroundColor: [
                                'rgba(224,52,168, 0)'
                            ],
                            borderColor: [
                                'rgba(224,52,168, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 8,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(24,52,168, 0.7)',
                            pointHoverBackgroundColor: 'rgba(24,52,168, 1)',
                            pointStyle: 'star',
                        },
                        {
                            label: 'JellyDye',
                            data: jellyDyeInstalls,
                            backgroundColor: [
                                'rgba(168,224,52, 0)'
                            ],
                            borderColor: [
                                'rgba(168,224,52, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 6,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(168,224,52, 0.7)',
                            pointHoverBackgroundColor: 'rgba(168,224,52, 1)',
                            pointStyle: 'cross',
                        }
                    ]
                });   
                setOptionsData(installsOptions);
            }
            else if(metric == 'Revenue') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fun Race 3D',
                            data: funRaceRevenues,
                            backgroundColor: [
                                'rgba(53,168,224, 0)'
                            ],
                            borderColor: [
                                'rgba(53,168,224, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 2,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(53,168,224, 0.7)',
                            pointHoverBackgroundColor: 'rgba(53,168,224, 1)'
                        },
                        {
                            label: 'Fold Puzzle',
                            data: foldPuzzleRevenues,
                            backgroundColor: [
                                'rgba(224,52,168, 0)'
                            ],
                            borderColor: [
                                'rgba(224,52,168, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 8,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(24,52,168, 0.7)',
                            pointHoverBackgroundColor: 'rgba(24,52,168, 1)',
                            pointStyle: 'star',
                        },
                        {
                            label: 'JellyDye',
                            data: jellyDyeRevenues,
                            backgroundColor: [
                                'rgba(168,224,52, 0)'
                            ],
                            borderColor: [
                                'rgba(168,224,52, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 6,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(168,224,52, 0.7)',
                            pointHoverBackgroundColor: 'rgba(168,224,52, 1)',
                            pointStyle: 'cross',
                        }
                    ]
                });   
                setOptionsData(dauOptions);
            }
        }
        else if(funRace && paperFold) {
            if(metric == 'Clicks') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fun Race 3D',
                            data: funRaceClicks,
                            backgroundColor: [
                                'rgba(53,168,224, 0)'
                            ],
                            borderColor: [
                                'rgba(53,168,224, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 2,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(53,168,224, 0.7)',
                            pointHoverBackgroundColor: 'rgba(53,168,224, 1)'
                        },
                        {
                            label: 'Fold Puzzle',
                            data: foldPuzzleClicks,
                            backgroundColor: [
                                'rgba(224,52,168, 0)'
                            ],
                            borderColor: [
                                'rgba(224,52,168, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 8,
                            pointHoverRadius: 12,
                            pointBackgroundColor: 'rgba(24,52,168, 0.7)',
                            pointHoverBackgroundColor: 'rgba(24,52,168, 1)',
                            pointStyle: 'star',
                        },
                    ]
                });
                setOptionsData(clicksOptions);
            }
            else if(metric == 'Dau') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fun Race 3D',
                            data: funRaceDaus,
                            backgroundColor: [
                                'rgba(53,168,224, 0)'
                            ],
                            borderColor: [
                                'rgba(53,168,224, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 2,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(53,168,224, 0.7)',
                            pointHoverBackgroundColor: 'rgba(53,168,224, 1)'
                        },
                        {
                            label: 'Fold Puzzle',
                            data: foldPuzzleDaus,
                            backgroundColor: [
                                'rgba(224,52,168, 0)'
                            ],
                            borderColor: [
                                'rgba(224,52,168, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 8,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(24,52,168, 0.7)',
                            pointHoverBackgroundColor: 'rgba(24,52,168, 1)',
                            pointStyle: 'star',
                        },
                    ]
                });   
                setOptionsData(dauOptions);
            }
            else if(metric == 'Impressions') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fun Race 3D',
                            data: funRaceImpressions,
                            backgroundColor: [
                                'rgba(53,168,224, 0)'
                            ],
                            borderColor: [
                                'rgba(53,168,224, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 2,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(53,168,224, 0.7)',
                            pointHoverBackgroundColor: 'rgba(53,168,224, 1)'
                        },
                        {
                            label: 'Fold Puzzle',
                            data: foldPuzzleImpressions,
                            backgroundColor: [
                                'rgba(224,52,168, 0)'
                            ],
                            borderColor: [
                                'rgba(224,52,168, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 8,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(24,52,168, 0.7)',
                            pointHoverBackgroundColor: 'rgba(24,52,168, 1)',
                            pointStyle: 'star',
                        },
                    ]
                });   
                setOptionsData(impressionsOptions);
            }
            else if(metric == 'Installs') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fun Race 3D',
                            data: funRaceInstalls,
                            backgroundColor: [
                                'rgba(53,168,224, 0)'
                            ],
                            borderColor: [
                                'rgba(53,168,224, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 2,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(53,168,224, 0.7)',
                            pointHoverBackgroundColor: 'rgba(53,168,224, 1)'
                        },
                        {
                            label: 'Fold Puzzle',
                            data: foldPuzzleInstalls,
                            backgroundColor: [
                                'rgba(224,52,168, 0)'
                            ],
                            borderColor: [
                                'rgba(224,52,168, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 8,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(24,52,168, 0.7)',
                            pointHoverBackgroundColor: 'rgba(24,52,168, 1)',
                            pointStyle: 'star',
                        },
                    ]
                });   
                setOptionsData(installsOptions);
            }
            else if(metric == 'Revenue') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fun Race 3D',
                            data: funRaceRevenues,
                            backgroundColor: [
                                'rgba(53,168,224, 0)'
                            ],
                            borderColor: [
                                'rgba(53,168,224, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 2,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(53,168,224, 0.7)',
                            pointHoverBackgroundColor: 'rgba(53,168,224, 1)'
                        },
                        {
                            label: 'Fold Puzzle',
                            data: foldPuzzleRevenues,
                            backgroundColor: [
                                'rgba(224,52,168, 0)'
                            ],
                            borderColor: [
                                'rgba(224,52,168, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 8,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(24,52,168, 0.7)',
                            pointHoverBackgroundColor: 'rgba(24,52,168, 1)',
                            pointStyle: 'star',
                        },
                    ]
                });   
                setOptionsData(dauOptions);
            }
        }
        else if(funRace && jellyDye) {

            if(metric == 'Clicks') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fun Race 3D',
                            data: funRaceClicks,
                            backgroundColor: [
                                'rgba(53,168,224, 0)'
                            ],
                            borderColor: [
                                'rgba(53,168,224, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 2,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(53,168,224, 0.7)',
                            pointHoverBackgroundColor: 'rgba(53,168,224, 1)'
                        },
                        {
                            label: 'JellyDye',
                            data: jellyDyeClicks,
                            backgroundColor: [
                                'rgba(168,224,52, 0)'
                            ],
                            borderColor: [
                                'rgba(168,224,52, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 6,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(168,224,52, 0.7)',
                            pointHoverBackgroundColor: 'rgba(168,224,52, 1)',
                            pointStyle: 'cross',
                        },
                    ]
                });
                setOptionsData(clicksOptions);
            }
            else if(metric == 'Dau') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fun Race 3D',
                            data: funRaceDaus,
                            backgroundColor: [
                                'rgba(53,168,224, 0)'
                            ],
                            borderColor: [
                                'rgba(53,168,224, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 2,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(53,168,224, 0.7)',
                            pointHoverBackgroundColor: 'rgba(53,168,224, 1)'
                        },
                        {
                            label: 'JellyDye',
                            data: jellyDyeDaus,
                            backgroundColor: [
                                'rgba(168,224,52, 0)'
                            ],
                            borderColor: [
                                'rgba(168,224,52, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 6,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(168,224,52, 0.7)',
                            pointHoverBackgroundColor: 'rgba(168,224,52, 1)',
                            pointStyle: 'cross',
                        }
                    ]
                });   
                setOptionsData(dauOptions);
            }
            else if(metric == 'Impressions') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fun Race 3D',
                            data: funRaceImpressions,
                            backgroundColor: [
                                'rgba(53,168,224, 0)'
                            ],
                            borderColor: [
                                'rgba(53,168,224, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 2,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(53,168,224, 0.7)',
                            pointHoverBackgroundColor: 'rgba(53,168,224, 1)'
                        },
                        {
                            label: 'JellyDye',
                            data: jellyDyeImpressions,
                            backgroundColor: [
                                'rgba(168,224,52, 0)'
                            ],
                            borderColor: [
                                'rgba(168,224,52, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 6,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(168,224,52, 0.7)',
                            pointHoverBackgroundColor: 'rgba(168,224,52, 1)',
                            pointStyle: 'cross',
                        }
                    ]
                });   
                setOptionsData(impressionsOptions);
            }
            else if(metric == 'Installs') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fun Race 3D',
                            data: funRaceInstalls,
                            backgroundColor: [
                                'rgba(53,168,224, 0)'
                            ],
                            borderColor: [
                                'rgba(53,168,224, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 2,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(53,168,224, 0.7)',
                            pointHoverBackgroundColor: 'rgba(53,168,224, 1)'
                        },
                        {
                            label: 'JellyDye',
                            data: jellyDyeInstalls,
                            backgroundColor: [
                                'rgba(168,224,52, 0)'
                            ],
                            borderColor: [
                                'rgba(168,224,52, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 6,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(168,224,52, 0.7)',
                            pointHoverBackgroundColor: 'rgba(168,224,52, 1)',
                            pointStyle: 'cross',
                        }
                    ]
                });   
                setOptionsData(installsOptions);
            }
            else if(metric == 'Revenue') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fun Race 3D',
                            data: funRaceRevenues,
                            backgroundColor: [
                                'rgba(53,168,224, 0)'
                            ],
                            borderColor: [
                                'rgba(53,168,224, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 2,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(53,168,224, 0.7)',
                            pointHoverBackgroundColor: 'rgba(53,168,224, 1)'
                        },
                        {
                            label: 'JellyDye',
                            data: jellyDyeRevenues,
                            backgroundColor: [
                                'rgba(168,224,52, 0)'
                            ],
                            borderColor: [
                                'rgba(168,224,52, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 6,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(168,224,52, 0.7)',
                            pointHoverBackgroundColor: 'rgba(168,224,52, 1)',
                            pointStyle: 'cross',
                        }
                    ]
                });   
                setOptionsData(dauOptions);
            }
        }
        else if(paperFold && jellyDye) {

            if(metric == 'Clicks') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fold Puzzle',
                            data: foldPuzzleClicks,
                            backgroundColor: [
                                'rgba(224,52,168, 0)'
                            ],
                            borderColor: [
                                'rgba(224,52,168, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 8,
                            pointHoverRadius: 12,
                            pointBackgroundColor: 'rgba(24,52,168, 0.7)',
                            pointHoverBackgroundColor: 'rgba(24,52,168, 1)',
                            pointStyle: 'star',
                        },
                        {
                            label: 'JellyDye',
                            data: jellyDyeClicks,
                            backgroundColor: [
                                'rgba(168,224,52, 0)'
                            ],
                            borderColor: [
                                'rgba(168,224,52, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 6,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(168,224,52, 0.7)',
                            pointHoverBackgroundColor: 'rgba(168,224,52, 1)',
                            pointStyle: 'cross',
                        },
                    ]
                });
                setOptionsData(clicksOptions);
            }
            else if(metric == 'Dau') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fold Puzzle',
                            data: foldPuzzleDaus,
                            backgroundColor: [
                                'rgba(224,52,168, 0)'
                            ],
                            borderColor: [
                                'rgba(224,52,168, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 8,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(24,52,168, 0.7)',
                            pointHoverBackgroundColor: 'rgba(24,52,168, 1)',
                            pointStyle: 'star',
                        },
                        {
                            label: 'JellyDye',
                            data: jellyDyeDaus,
                            backgroundColor: [
                                'rgba(168,224,52, 0)'
                            ],
                            borderColor: [
                                'rgba(168,224,52, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 6,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(168,224,52, 0.7)',
                            pointHoverBackgroundColor: 'rgba(168,224,52, 1)',
                            pointStyle: 'cross',
                        }
                    ]
                });   
                setOptionsData(dauOptions);
            }
            else if(metric == 'Impressions') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fold Puzzle',
                            data: foldPuzzleImpressions,
                            backgroundColor: [
                                'rgba(224,52,168, 0)'
                            ],
                            borderColor: [
                                'rgba(224,52,168, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 8,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(24,52,168, 0.7)',
                            pointHoverBackgroundColor: 'rgba(24,52,168, 1)',
                            pointStyle: 'star',
                        },
                        {
                            label: 'JellyDye',
                            data: jellyDyeImpressions,
                            backgroundColor: [
                                'rgba(168,224,52, 0)'
                            ],
                            borderColor: [
                                'rgba(168,224,52, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 6,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(168,224,52, 0.7)',
                            pointHoverBackgroundColor: 'rgba(168,224,52, 1)',
                            pointStyle: 'cross',
                        }
                    ]
                });   
                setOptionsData(impressionsOptions);
            }
            else if(metric == 'Installs') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fold Puzzle',
                            data: foldPuzzleInstalls,
                            backgroundColor: [
                                'rgba(224,52,168, 0)'
                            ],
                            borderColor: [
                                'rgba(224,52,168, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 8,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(24,52,168, 0.7)',
                            pointHoverBackgroundColor: 'rgba(24,52,168, 1)',
                            pointStyle: 'star',
                        },
                        {
                            label: 'JellyDye',
                            data: jellyDyeInstalls,
                            backgroundColor: [
                                'rgba(168,224,52, 0)'
                            ],
                            borderColor: [
                                'rgba(168,224,52, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 6,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(168,224,52, 0.7)',
                            pointHoverBackgroundColor: 'rgba(168,224,52, 1)',
                            pointStyle: 'cross',
                        }
                    ]
                });   
                setOptionsData(installsOptions);
            }
            else if(metric == 'Revenue') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fold Puzzle',
                            data: foldPuzzleRevenues,
                            backgroundColor: [
                                'rgba(224,52,168, 0)'
                            ],
                            borderColor: [
                                'rgba(224,52,168, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 8,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(24,52,168, 0.7)',
                            pointHoverBackgroundColor: 'rgba(24,52,168, 1)',
                            pointStyle: 'star',
                        },
                        {
                            label: 'JellyDye',
                            data: jellyDyeRevenues,
                            backgroundColor: [
                                'rgba(168,224,52, 0)'
                            ],
                            borderColor: [
                                'rgba(168,224,52, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 6,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(168,224,52, 0.7)',
                            pointHoverBackgroundColor: 'rgba(168,224,52, 1)',
                            pointStyle: 'cross',
                        }
                    ]
                });   
                setOptionsData(dauOptions);
            }
        }
        else if(funRace) {

            if(metric == 'Clicks') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fun Race 3D',
                            data: funRaceClicks,
                            backgroundColor: [
                                'rgba(53,168,224, 0)'
                            ],
                            borderColor: [
                                'rgba(53,168,224, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 2,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(53,168,224, 0.7)',
                            pointHoverBackgroundColor: 'rgba(53,168,224, 1)'
                        },
                    ]
                });
                setOptionsData(clicksOptions);
            }
            else if(metric == 'Dau') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fun Race 3D',
                            data: funRaceDaus,
                            backgroundColor: [
                                'rgba(53,168,224, 0)'
                            ],
                            borderColor: [
                                'rgba(53,168,224, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 2,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(53,168,224, 0.7)',
                            pointHoverBackgroundColor: 'rgba(53,168,224, 1)'
                        },
                    ]
                });   
                setOptionsData(dauOptions);
            }
            else if(metric == 'Impressions') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fun Race 3D',
                            data: funRaceImpressions,
                            backgroundColor: [
                                'rgba(53,168,224, 0)'
                            ],
                            borderColor: [
                                'rgba(53,168,224, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 2,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(53,168,224, 0.7)',
                            pointHoverBackgroundColor: 'rgba(53,168,224, 1)'
                        },
                    ]
                });   
                setOptionsData(impressionsOptions);
            }
            else if(metric == 'Installs') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fun Race 3D',
                            data: funRaceInstalls,
                            backgroundColor: [
                                'rgba(53,168,224, 0)'
                            ],
                            borderColor: [
                                'rgba(53,168,224, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 2,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(53,168,224, 0.7)',
                            pointHoverBackgroundColor: 'rgba(53,168,224, 1)'
                        },
                    ]
                });   
                setOptionsData(installsOptions);
            }
            else if(metric == 'Revenue') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fun Race 3D',
                            data: funRaceRevenues,
                            backgroundColor: [
                                'rgba(53,168,224, 0)'
                            ],
                            borderColor: [
                                'rgba(53,168,224, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 2,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(53,168,224, 0.7)',
                            pointHoverBackgroundColor: 'rgba(53,168,224, 1)'
                        },
                    ]
                });   
                setOptionsData(dauOptions);
            }
        }
        else if(paperFold) {

            if(metric == 'Clicks') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fold Puzzle',
                            data: foldPuzzleClicks,
                            backgroundColor: [
                                'rgba(224,52,168, 0)'
                            ],
                            borderColor: [
                                'rgba(224,52,168, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 8,
                            pointHoverRadius: 12,
                            pointBackgroundColor: 'rgba(24,52,168, 0.7)',
                            pointHoverBackgroundColor: 'rgba(24,52,168, 1)',
                            pointStyle: 'star',
                        },
                    ]
                });
                setOptionsData(clicksOptions);
            }
            else if(metric == 'Dau') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fold Puzzle',
                            data: foldPuzzleDaus,
                            backgroundColor: [
                                'rgba(224,52,168, 0)'
                            ],
                            borderColor: [
                                'rgba(224,52,168, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 8,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(24,52,168, 0.7)',
                            pointHoverBackgroundColor: 'rgba(24,52,168, 1)',
                            pointStyle: 'star',
                        },
                    ]
                });   
                setOptionsData(dauOptions);
            }
            else if(metric == 'Impressions') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fold Puzzle',
                            data: foldPuzzleImpressions,
                            backgroundColor: [
                                'rgba(224,52,168, 0)'
                            ],
                            borderColor: [
                                'rgba(224,52,168, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 8,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(24,52,168, 0.7)',
                            pointHoverBackgroundColor: 'rgba(24,52,168, 1)',
                            pointStyle: 'star',
                        },
                    ]
                });   
                setOptionsData(impressionsOptions);
            }
            else if(metric == 'Installs') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fold Puzzle',
                            data: foldPuzzleInstalls,
                            backgroundColor: [
                                'rgba(224,52,168, 0)'
                            ],
                            borderColor: [
                                'rgba(224,52,168, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 8,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(24,52,168, 0.7)',
                            pointHoverBackgroundColor: 'rgba(24,52,168, 1)',
                            pointStyle: 'star',
                        },
                    ]
                });   
                setOptionsData(installsOptions);
            }
            else if(metric == 'Revenue') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Fold Puzzle',
                            data: foldPuzzleRevenues,
                            backgroundColor: [
                                'rgba(224,52,168, 0)'
                            ],
                            borderColor: [
                                'rgba(224,52,168, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 8,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(24,52,168, 0.7)',
                            pointHoverBackgroundColor: 'rgba(24,52,168, 1)',
                            pointStyle: 'star',
                        },
                    ]
                });   
                setOptionsData(dauOptions);
            }
        }
        else if(jellyDye) {

            if(metric == 'Clicks') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'JellyDye',
                            data: jellyDyeClicks,
                            backgroundColor: [
                                'rgba(168,224,52, 0)'
                            ],
                            borderColor: [
                                'rgba(168,224,52, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 6,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(168,224,52, 0.7)',
                            pointHoverBackgroundColor: 'rgba(168,224,52, 1)',
                            pointStyle: 'cross',
                        },
                    ]
                });
                setOptionsData(clicksOptions);
            }
            else if(metric == 'Dau') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'JellyDye',
                            data: jellyDyeDaus,
                            backgroundColor: [
                                'rgba(168,224,52, 0)'
                            ],
                            borderColor: [
                                'rgba(168,224,52, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 6,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(168,224,52, 0.7)',
                            pointHoverBackgroundColor: 'rgba(168,224,52, 1)',
                            pointStyle: 'cross',
                        }
                    ]
                });   
                setOptionsData(dauOptions);
            }
            else if(metric == 'Impressions') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'JellyDye',
                            data: jellyDyeImpressions,
                            backgroundColor: [
                                'rgba(168,224,52, 0)'
                            ],
                            borderColor: [
                                'rgba(168,224,52, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 6,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(168,224,52, 0.7)',
                            pointHoverBackgroundColor: 'rgba(168,224,52, 1)',
                            pointStyle: 'cross',
                        }
                    ]
                });   
                setOptionsData(impressionsOptions);
            }
            else if(metric == 'Installs') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'JellyDye',
                            data: jellyDyeInstalls,
                            backgroundColor: [
                                'rgba(168,224,52, 0)'
                            ],
                            borderColor: [
                                'rgba(168,224,52, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 6,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(168,224,52, 0.7)',
                            pointHoverBackgroundColor: 'rgba(168,224,52, 1)',
                            pointStyle: 'cross',
                        }
                    ]
                });   
                setOptionsData(installsOptions);
            }
            else if(metric == 'Revenue') {
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'JellyDye',
                            data: jellyDyeRevenues,
                            backgroundColor: [
                                'rgba(168,224,52, 0)'
                            ],
                            borderColor: [
                                'rgba(168,224,52, 0.7)'
                            ],
                            borderWidth: 2,
                            pointRadius: 6,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(168,224,52, 0.7)',
                            pointHoverBackgroundColor: 'rgba(168,224,52, 1)',
                            pointStyle: 'cross',
                        }
                    ]
                });   
                setOptionsData(dauOptions);
            }
        }
        else {

            if(metric == 'Clicks') {
                setChartData({
                    labels: dates,
                });
                setOptionsData(clicksOptions);
            }
            else if(metric == 'Dau') {
                setChartData({
                    labels: dates,
                });   
                setOptionsData(dauOptions);
            }
            else if(metric == 'Impressions') {
                setChartData({
                    labels: dates,
                });   
                setOptionsData(impressionsOptions);
            }
            else if(metric == 'Installs') {
                setChartData({
                    labels: dates,
                });   
                setOptionsData(installsOptions);
            }
            else if(metric == 'Revenue') {
                setChartData({
                    labels: dates,
                });   
                setOptionsData(dauOptions);
            }
        }
      }

    //useEffect hook for rendering the chart dynamically
    useEffect(() => {handleChange(platform,metric)}, [data, platform, metric, jellyDye, paperFold, funRace]);

    return (
        <>
            {/* user options */}
            <div className="flex items-center flex-wrap justify-center gap-8 xl:gap-16">
                <div className="flex flex-col items-center mt-6 xl:mt-0 pl-12 pr-12">
                    <div>
                        <span className="text-2xl font-bold uppercase text-gray-500">Metrics</span>
                    </div>
                    <div className="flex items-center justify-center flex-wrap gap-6 mt-4">
                        <button className={metric == 'Clicks' ? 'metric-btn active-metric' : 'metric-btn inactive-metric'} 
                                onClick={() => setMetric('Clicks')} > Clicks </button>
                        <button className={metric == 'Dau' ? 'metric-btn active-metric' : 'metric-btn inactive-metric'} 
                                onClick={() => setMetric('Dau')} > Dau </button>
                        <button className={metric == 'Impressions' ? 'metric-btn active-metric' : 'metric-btn inactive-metric'}
                                onClick={() => setMetric('Impressions')} > Impressions </button>
                        <button className={metric == 'Installs' ? 'metric-btn active-metric' : 'metric-btn inactive-metric'} 
                                onClick={() => setMetric('Installs')}> Installs </button>
                        <button className={metric == 'Revenue' ? 'metric-btn active-metric' : 'metric-btn inactive-metric'}
                                onClick={() => setMetric('Revenue')} > Revenue </button>
                    </div>
                </div>
                <div className="flex flex-col items-center mt-0 xl:mt-2">
                    <div>
                        <span className="text-2xl font-bold uppercase text-gray-500">Platforms</span>
                    </div>
                    <div className="mt-2">
                        <div>
                            <input type="radio" className="mr-1" id="chart-android" name="platforms-chart" checked={platform==='Android'} value={'Android'} onChange={(e) => setPlatform(e.target.value)} />
                            <label for="chart-android" className="text-lg font-semibold cursor-pointer" >Android</label>
                        </div>
                        <div>
                            <input type="radio" className="mr-1" id="chart-ios" name="platforms-chart" value={'iOS'} onChange={(e) => setPlatform(e.target.value)} />
                            <label for="chart-ios" className="text-lg font-semibold" >iOS</label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center mt-0 xl:mt-2">
                    <div className="mt-1 xl:mt-6">
                        <span className="text-2xl font-bold uppercase text-gray-500">Apps</span>
                    </div>
                    <div className="mt-2">
                        <div>
                            <input type="checkbox" className="mr-1" id="Fun Race 3D" checked={funRace}  onChange={(e) => setFunRace(e.target.checked)} />
                            <label for="Fun Race 3D" className="text-lg font-semibold" >Fun Race 3D</label>
                        </div>
                        <div>
                            <input type="checkbox" className="mr-1" id="Paper Fold" checked={paperFold} onChange={(e) => setPaperFold(e.target.checked)} />
                            <label for="Paper Fold" className="text-lg font-semibold" >Fold Puzzle</label>
                        </div>
                        <div>
                            <input type="checkbox" className="mr-1" id="Jelly Dye" checked={jellyDye} onChange={(e) => setJellyDye(e.target.checked)} />
                            <label for="Jelly Dye" className="text-lg font-semibold" >Jelly Dye</label>
                        </div>
                    </div>
                </div>
            </div>
            {/* line chart */}
            <div className="charts flex flex-wrap justify-center gap-16">
                <div className="chart shadow-xl">
                    <Line 
                        data={chartData}
                        options={optionsData}
                    />
                </div>
            </div>
        </>
    );
}