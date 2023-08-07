import React, { useContext, useState, useEffect } from "react";
import { ProfileInfoContext } from '../../../ProfileInfoContext';
import PieChart from "./PieChart";
import VerticalBarChart from './VerticalBarChart';
import LineChart from './LineChart';
import { Button } from 'react-bootstrap';
import { Chart, registerables } from 'chart.js'; // Import Chart and registerables
import { exportChartsToPDF } from './pdf-export';

Chart.register(...registerables); // Register the necessary elements

const BusinessAnalytics = () => {

    const { profileInfo, dispatch } = useContext(ProfileInfoContext);
    const [ localProfileInfo, setLocalProfileInfo ] = useState(profileInfo);


    const appointments = localProfileInfo?.appointmentsDef?.[ 0 ]?.appointments;
    if (!localProfileInfo || !appointments) return null;

    const calculateTotalPaymentByMonth = (appointments) => {
        const totalPaymentByMonth = new Array(12).fill(0); // Initialize an array to hold total payments for each month, starting with zeros.

        appointments.forEach((appointment) => {
            const date = new Date(appointment.date);
            const month = date.getMonth();
            const servicePrice = Number(appointment.service.price);

            let purchaseTotal = 0;
            if (appointment.purchase && Array.isArray(appointment.purchase)) {
                purchaseTotal = appointment.purchase.reduce((acc, item) => {
                    const itemPrice = Number(item.price);
                    return acc + itemPrice * item.amount;
                }, 0);
            }

            const totalPrice = servicePrice + purchaseTotal;
            totalPaymentByMonth[ month ] += totalPrice;
        });

        return totalPaymentByMonth;
    };

    const totalPaymentByMonth = calculateTotalPaymentByMonth(appointments);

    const chartExportDimensions = [ 10, 10, 180, 80 ]; // [x, y, width, height]

    // Function to handle the PDF export
    const handleExportPDF = () => {
        const chartIds = [ 'bar-chart', 'line-chart', 'pie-chart' ];
        const chartExportDimensions = [
            [ 10, 20, 180, 80 ], // Bar chart dimensions
            [ 10, 120, 100, 100 ], // Line chart dimensions
            [ 120, 130, 80, 80 ], // Pie chart dimensions
        ];

        exportChartsToPDF(chartIds, chartExportDimensions);
    };
    return (
        <div className="mt-5">
            <VerticalBarChart id="bar-chart" totalPaymentByMonth={ totalPaymentByMonth } />
            <div className="d-flex justify-content-center ">
                <LineChart id="line-chart" totalPaymentByMonth={ totalPaymentByMonth } />
                <div className="m-3">                <PieChart id="pie-chart" business={ localProfileInfo } />
                </div>
            </div>
            <div className="d-flex justify-content-center mb-3">
                <Button onClick={ handleExportPDF } type="button">Export PDF</Button>
            </div>
        </div>
    );
};

export default BusinessAnalytics;