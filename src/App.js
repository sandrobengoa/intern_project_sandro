import React, { useState, useEffect } from "react";
import { Bar, Column, Pie } from "@ant-design/plots";
import { Select, Card, Row, Col } from "antd";
import CountUp from "react-countup";


const { Option } = Select;

const BarChart = () => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://3w2fa7obil.execute-api.us-east-2.amazonaws.com/test/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        setData(transformData(result.data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (value) => {
    setSelectedData(value);
  };

  const chartData = data[selectedData];

  const barConfig = {
    data: chartData,
    xField: "YData",
    yField: "XData",
    seriesField: "XData",
    legend: {
      position: "right",
      itemName: {
        style: {
          fontSize: 16,
          fontWeight: "normal",
          fontFamily: "Helvetica Neue, sans-serif",
        },
      },
    },
    height: 400,
    geomStyle: (d) => {
      const color = d[0].color;
      return {
        fill: color,
        stroke: "#FFFFFF",
        lineWidth: 1,
        opacity: 0.8,
        radius: 4,
      };
    },
    yAxis: {
      label: {
        style: {
          fontFamily: "Arial",
          fill: "#000000",
        },
      },
    },
  };
  
  
  const pieConfig = {
    appendPadding: 10,
    data: chartData,
    angleField: "YData",
    colorField: "XData",
    radius: 0.9,
    label: {
      type: "outer",
      content: "{percentage}",
      style: {
        fontSize: 16,
        fontWeight: "normal",
        fontFamily: "Helvetica Neue, sans-serif",
      },
    },
    legend: {
      position: "right",
      itemName: {
        style: {
          fontSize: 16,
          fontWeight: "normal",
          fontFamily: "Helvetica Neue, sans-serif",
        },
      },
    },
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
  };
  
  const columnConfig = {
    data: chartData,
    xField: "XData",
    yField: "YData",
    seriesField: "XData",
    legend: {
      position: "right",
      itemName: {
        style: {
          fontSize: 16,
          fontWeight: "normal",
          fontFamily: "Helvetica Neue, sans-serif",
        },
      },
    },
    height: 400,
    barStyle: {
      fill: ["#84DCC6", "#008080"],
    },
    geomStyle: {
      fillOpacity: 0.7,
      stroke: "#FFFFFF",
      lineWidth: 2,
      radius: 4,
    },
    xAxis: {
      label: {
        style: {
          fontSize: 18,
          fontFamily: "Helvetica",
          fill: "#555555",
        },
      },
    },
  };

  const [productCount, setProductCount] = useState(0);
  const [memberCount, setMemberCount] = useState(0);

  useEffect(() => {
    // simulate API call to fetch product count and member count
    setTimeout(() => {
      setProductCount(195559);
      setMemberCount(63930);
    }, 2000);
  }, []);
  
  

  function transformData(data) {
    const transformedData = {};

    Object.keys(data).forEach((level) => {
      const levelData = data[level];
      const xData = levelData.XData;
      const yData = levelData.YData;

      const levelTransformedData = [];

      xData.forEach((type, index) => {
        levelTransformedData.push({
          XData: type,
          YData: yData[index],
        });
      });

      transformedData[level] = levelTransformedData;
    });

    return transformedData;
  }


  return (
    <div style={{ backgroundColor: "#EEEEEE", height: "100%" }}>
    <div
      style={{
        backgroundColor: "#FFFFFF",
        padding: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <a href="https://www.linkedin.com/in/sandrobengoa/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Linkedin.svg/1200px-Linkedin.svg.png"
          alt="LinkedIn Logo"
          style={{ height: "60px" }}
        />
      </a>
      <h1 style={{ margin: 0, fontFamily: "Helvetica Neue, sans-serif", fontSize: "60px", fontWeight: "bold", letterSpacing: "2px" }}>Sandro Bengoa Intern Project</h1>
      <Select
        value={selectedData}
        onChange={handleChange}
        style={{ minWidth: "300px", height: "30px" }}
        size = "large"
        defaultValue="Levels"
      >
        <Option value="">Select Data</Option>
        {Object.keys(data).map((key) => (
          <Option key={key} value={key}>
            {key}
          </Option>
        ))}
      </Select>
    </div>
  
    <div style={{ padding: "24px", margin: "0 10%", backgroundColor: "#EEEEEE" }}>
    <Card style={{ marginBottom: "30px" }}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div style={{ textAlign: "center" }}>
                <h2 style={{ fontFamily: "Arial, sans-serif", fontSize: "30px" }}>Total Product Count</h2>
                <CountUp start={0} end={productCount} duration={2.5}>
                  {({ countUpRef }) => (
                    <p style={{ fontFamily: "Arial, sans-serif", fontSize: "50px" }}>
                      <span ref={countUpRef} />
                    </p>
                  )}
                </CountUp>
              </div>
            </Col>
            <Col span={12}>
              <div style={{ textAlign: "center" }}>
                <h2 style={{ fontFamily: "Arial, sans-serif", fontSize: "30px" }}>Total Member Count</h2>
                <CountUp start={0} end={memberCount} duration={2.5}>
                  {({ countUpRef }) => (
                    <p style={{ fontFamily: "Arial, sans-serif", fontSize: "50px" }}>
                      <span ref={countUpRef} />
                      </p>
                      )}
                      </CountUp>
                    </div>
                  </Col>
                </Row>
              </Card>

      
      {selectedData && (
        <Card title={<h2 style={{ fontFamily: "Arial, sans-serif", fontSize: "24px" }}>Bar Chart</h2>} style={{ marginBottom: "30px" }}>
          <Bar {...barConfig} />
        </Card>
      )}
      {selectedData && (
        <Card title={<h2 style={{ fontFamily: "Arial, sans-serif", fontSize: "24px" }}>Pie Chart</h2>} style={{ marginBottom: "30px" }}>
          <Pie {...pieConfig} />
        </Card>
      )}
      {selectedData && (
        <Card title={<h2 style={{ fontFamily: "Arial, sans-serif", fontSize: "24px" }}>Column Chart</h2>} style={{ marginBottom: "30px" }}>
          <Column {...columnConfig} />
        </Card>
      )}
    </div>
  </div>
  
  );

};
export default BarChart;
