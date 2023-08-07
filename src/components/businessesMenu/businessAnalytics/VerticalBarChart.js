import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

const VerticalBarChart = ({ totalPaymentByMonth, id }) => {
    const [ totalIncomeData, setTotalIncomeData ] = useState(Array(12).fill(0));
    const [ expensesData, setExpensesData ] = useState(Array(12).fill(0));
    const [ monthTotalIncome, setMonthTotalIncome ] = useState(0);
    const [ totalIncomeAmount, setTotalIncomeAmount ] = useState(0);
    const [ monthExpenses, setMonthExpenses ] = useState(0);
    const [ expensesAmount, setExpensesAmount ] = useState(0);
    const [ isChartRendered, setIsChartRendered ] = useState(false); // State variable to track chart rendering status

    const barRef = useRef(null); // Ref to get a reference to the Bar component

    useEffect(() => {
        // ChartJS setup and registration
        ChartJS.register(
            CategoryScale,
            LinearScale,
            BarController, // Use BarController instead of BarElement
            Title,
            Tooltip,
            Legend
        );

        // Set the chart rendered status to true after a brief timeout to ensure rendering is complete
        const timeoutId = setTimeout(() => {
            setIsChartRendered(true);
        }, 100);

        return () => clearTimeout(timeoutId); // Clear the timeout on unmount
    }, []);


    const handleExportPDF = () => {
        if (barRef.current && isChartRendered) {
            const barChartElement = barRef.current.chartInstance.canvas; // Get the canvas element
            const dataURL = barChartElement.toDataURL('image/png');
            // Use dataURL for PDF export logic
            console.log(dataURL);
        } else {
            console.log("Chart not rendered yet");
        }
    };

    const handleAddTotalIncome = (month, amount) => {
        setTotalIncomeData((prevData) => {
            const newData = [ ...prevData ];
            newData[ month ] += amount;
            return newData;
        });
    };

    const handleAddExpenses = (month, amount) => {
        setExpensesData((prevData) => {
            const newData = [ ...prevData ];
            newData[ month ] += amount;
            return newData;
        });
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'revenues and expenses',
            },
        },
    };

    const labels = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

    const data = {
        labels,
        datasets: [
            {
                label: 'App Income',
                data: totalPaymentByMonth,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Total Income',
                data: totalIncomeData,
                backgroundColor: 'rgba(126, 234, 174, 0.7)',
            },
            {
                label: 'Expenses',
                data: expensesData,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <div className="d-flex flex-row   justify-content-center ">
            <div style={ { width: '600px', height: '320px' } }>
                <Bar id={ id } ref={ barRef } options={ options } data={ data } />
            </div>
            <div className="">
                <div className='form-check'>
                    <h4>Add Total Income:</h4>
                    <label className='p-2'>
                        Month:
                    </label>
                    <select className="custom-select text-center  form-select-sm" onChange={ (e) => setMonthTotalIncome(e.target.value) }>
                        { labels.map((label, index) => (
                            <option key={ index } value={ index }>
                                { label }
                            </option>
                        )) }
                    </select>
                    <label className='p-2'>
                        Amount:
                    </label>
                    <input className="mb-2 mr-sm-1 form-control-sm w-25  m-1" type="number" value={ totalIncomeAmount } onChange={ (e) => setTotalIncomeAmount(e.target.value) } />
                    <button className='btn btn-outline-success btn-sm' onClick={ () => handleAddTotalIncome(monthTotalIncome, totalIncomeAmount) }>Add</button>
                </div>
                <div className='form-check'>
                    <h4>Add Expenses:</h4>
                    <label className='p-2'>
                        Month:
                    </label>
                    <select className="custom-select text-center form-select-sm" onChange={ (e) => setMonthExpenses(e.target.value) }>
                        { labels.map((label, index) => (
                            <option key={ index } value={ index }>
                                { label }
                            </option>
                        )) }
                    </select>
                    <label className='p-2'>
                        Amount:
                    </label>
                    <input className="mb-2 mr-sm-1 form-control-sm w-25" type="number" value={ expensesAmount } onChange={ (e) => setExpensesAmount(e.target.value) } />
                    <button className='btn btn-outline-danger btn-sm m-1' onClick={ () => handleAddExpenses(monthExpenses, expensesAmount) }>Add</button>
                </div>
            </div>
        </div>
    );
};

export default VerticalBarChart;
