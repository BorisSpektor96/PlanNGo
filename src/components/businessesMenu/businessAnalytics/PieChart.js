import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
ChartJS.register(ArcElement, Tooltip, Legend);


const PieChart = ({ id, business }) => {
  // Function to count the number of pieces sold for each product
  const countProductPiecesSold = (business) => {
    const productsMap = new Map();

    business.products.forEach((product) => {
      const { name, quantity } = product;
      productsMap.set(name, { initialQuantity: Number(quantity), sold: 0 });
    });

    business.appointmentsDef.appointments.forEach((appointment) => {
      if (appointment.purchase) {
        appointment.purchase.forEach((purchase) => {
          const { name, amount } = purchase;
          if (productsMap.has(name)) {
            const productData = productsMap.get(name);
            productData.sold += Number(amount);
          }
        });
      }
    });

    const result = [];
    productsMap.forEach((data, name) => {
      result.push({ name, sold: data.sold });
    });

    return result;
  };

  const [ productPiecesSold, setProductPiecesSold ] = useState([]);

  useEffect(() => {
    setProductPiecesSold(countProductPiecesSold(business));
  }, [ business ]);


  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Product Pieces Sold',
      },
    },
  };

  const data = {
    labels: productPiecesSold.map((product) => product.name),
    datasets: [
      {
        label: 'Product Pieces Sold',
        data: productPiecesSold.map((product) => product.sold),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={ { width: '400px', height: '400px' } }>
      <Pie id={ id } options={ options } data={ data } />
    </div>
  );
};

export default PieChart;