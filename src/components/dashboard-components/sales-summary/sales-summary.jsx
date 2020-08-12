import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Col, Row } from "reactstrap";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const SalesSummary = () => {
  //Bar chart
  let barData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "iPhone",
        backgroundColor: "#1e88e5",
        borderColor: "#1e88e5",
        data: [],
      },
      {
        label: "iPad",
        backgroundColor: "#7460ee",
        borderColor: "#7460ee",
        data: [],
      },
    ],
  };

  const [sales, setSales] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:1337/sales").then((resp) => {
      setSales(resp.data);
    });
  }, []);

  //barData.labels = [...new Set(data.map((d) => d.month))];

  barData.labels.forEach((month, i) => {
    barData.datasets.forEach((dataSet) => {
      let productData = sales.filter(
        (d) => d.product === dataSet.label && d.month === month
      )[0];

      dataSet.data[i] = productData?.amount;
    });
  });

  return (
    <Card>
      <CardBody>
        <div className="d-flex align-items-center">
          <div>
            <CardTitle>Sales Summary</CardTitle>
            <CardSubtitle>summary of the month</CardSubtitle>
          </div>
          <div className="ml-auto d-flex align-items-center">
            <ul className="list-inline font-12 dl mr-3 mb-0">
              <li className="border-0 p-0 text-info list-inline-item">
                <i className="fa fa-circle"></i> Iphone
              </li>
              <li className="border-0 p-0 text-primary list-inline-item">
                <i className="fa fa-circle"></i> Ipad
              </li>
            </ul>
          </div>
        </div>
        <Row>
          <Col lg="12">
            <div className="campaign ct-charts">
              <div
                className="chart-wrapper"
                style={{ width: "100%", margin: "0 auto", height: 250 }}
              >
                <Bar
                  data={barData}
                  options={{
                    maintainAspectRatio: false,
                    legend: {
                      display: false,
                      labels: { fontFamily: "Nunito Sans" },
                    },
                    scales: {
                      yAxes: [
                        {
                          gridLines: { display: false },
                          ticks: { fontFamily: "Nunito Sans" },
                        },
                      ],
                      xAxes: [
                        {
                          gridLines: { display: false },
                          ticks: { fontFamily: "Nunito Sans" },
                          barThickness: 15,
                        },
                      ],
                    },
                  }}
                />
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default SalesSummary;
