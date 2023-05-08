/* eslint-disable react/prop-types */
import './LineChart.css'
import { Col, Row, Typography } from "antd"
import { Line } from "react-chartjs-2"
import 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    // zoomPlugin,
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin
  );

// const { Title } = Typography
const LineChart = ({ coinHistory, currentPrice, coinName, timePeriod }) => {

    // console.log(coinHistory)

    const coinPrice = []
    const coinTimeStamp = []

    for (let i = 0; i < coinHistory?.data?.history?.length; i+= 1) {
        coinPrice.unshift(coinHistory.data.history[i].price);
        coinTimeStamp.unshift(new Date(coinHistory?.data?.history[i].timestamp * 1000).toLocaleDateString())
    }

    const data = {
        labels: coinTimeStamp,
        datasets: [
          {
            label: 'Price In USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
          },
        ],
      };

     const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text:`${coinName} chart`,
          },
          zoom: {
            pan: {
                enabled: true,
                mode: 'x'
            },
            zoom: {
                pinch: {
                    enabled: true  
                },
                wheel: {
                    enabled: true 
                },
                mode: 'x',}
            }
        },
      };
      
    return (
        <>
            <Row className="chartHeader">

                <div className="div">
                    <Typography.Title  level={2} className="chartTitle" >
                          {coinName} Price Chart </Typography.Title>
                </div>

               <div className="div">
                    <Row sm={24} md={24} lg={12} className="priceContainer" >
                          <Col>
                              <Typography.Title level={4} className="priceChange">
                                Total change in {timePeriod} : {coinHistory?.data?.change} %
                              </Typography.Title>
                          </Col>

                          <Col>
                            <Typography.Title level={4} className="currentPrice">
                                {coinName} current price : ${currentPrice}
                            </Typography.Title>
                          </Col>

                      </Row>
               </div>

            </Row>

            <Line data={data} options={options} />

        </>
    )
}

export default LineChart