// import './CryptoDetails.scss'
// import HTMLReactParser from 'html-react-parser' ;
import "./CryptoDetails.css";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Card, Col, Row, Select, Typography } from "antd";

const { Title } = Typography;
const { Option } = Select;
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../../Services/cryptoApi";
import { useState } from "react";
import {
  TrophyOutlined,
  NumberOutlined,
  ThunderboltOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  MoneyCollectOutlined,
  CheckOutlined,
  FundOutlined,
} from "@ant-design/icons";
import LineChart from "../../Components/LineChart/LineChart";
import { useLocation } from "react-router-dom";

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");

  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });

  const cryptoDetails = data?.data?.coin;
  // console.log(data);
  // console.log(cryptoDetails);
  // console.log(coinHistory);

  const location = useLocation();
  const img = location.state?.data;

  if (isFetching) return "Loading...";

  const time = ["1h", "3h", "12h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails["24hVolume"] && millify(cryptoDetails["24hVolume"])
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  // const genericStats = [
  //   {
  //     title: "Number Of Markets",
  //     value: cryptoDetails?.numberOfMarkets,
  //     icon: <FundOutlined />,
  //   },
  //   {
  //     title: "Number Of Exchanges",
  //     value: cryptoDetails?.numberOfExchanges,
  //     icon: <MoneyCollectOutlined />,
  //   },
  //   {
  //     title: "Aprroved Supply",
  //     value: cryptoDetails?.supply?.confirmed ? (
  //       <CheckOutlined />
  //     ) : (
  //       <StopOutlined />
  //     ),
  //     icon: <ExclamationCircleOutlined />,
  //   },
  //   {
  //     title: "Total Supply",
  //     value: `$ ${
  //       cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
  //     }`,
  //     icon: <ExclamationCircleOutlined />,
  //   },
  //   {
  //     title: "Circulating Supply",
  //     value: `$ ${
  //       cryptoDetails?.supply?.circulating &&
  //       millify(cryptoDetails?.supply?.circulating)
  //     }`,
  //     icon: <ExclamationCircleOutlined />,
  //   },
  // ];

  return (
    <Col className="coinDetailContainer">
      <Col className="coinHeadingContainer">
        <Title level={1} className="coinName">
          {cryptoDetails?.name} Price Chart
          <img
            style={{ width: "2.5rem", marginRight: "10px" }}
            src={img}
            alt={cryptoDetails?.name}
          />
        </Title>
        {/* <p>
          {cryptoDetails?.name} live price in US. <br />

          <b > View value statistics, market-cap and supply.</b>
        </p> */}
      </Col>

      <Select
        defaultValue={"7d"}
        className="selectTimePeriod"
        placeholder="Select time period"
        onChange={(value) => {
          setTimePeriod(value);
        }}
      >
        {" "}
        {time.map((date) => {
          return <Option key={date}>{date}</Option>;
        })}{" "}
      </Select>

      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails?.price)}
        coinName={cryptoDetails?.name}
        timePeriod={timePeriod}
      />

      <Row sm={24} md={24} lg={12} className="statsContainer">
        <Col className="coinValueStatictics">
          <Col className="coinValueStaticticsHeading">
            <Title level={2} className="coinDetailsHeading">
              {cryptoDetails?.name} Statistics
            </Title>
            <p>An overview showing stats of {cryptoDetails?.name}</p>
          </Col>

          <div className="statsDetail">
            {stats.map(({ icon, title, value }, i) => {
              return (
                <Card hoverable={true} key={i} className="coinStats">
                  <Col className="coinStatsName">
                    <Title className="coinStatsValue">
                      {icon} {title} : {value}
                    </Title>
                  </Col>
                </Card>
              );
            })}
          </div>
        </Col>

        {/* <Col className="otherStatsInfo">
          <Col className="coinValueStaticticsHeading">
            <Title level={2} className="coinDetailsHeading">
              Other Statistics
            </Title>
            <p>An overview showing stats of all cryptocurrencies</p>
          </Col>

          <div className="statsDetails">
            {genericStats.map(({ icon, title, value }, i) => {
              return (
                <Card hoverable={true} key={`${i}o`} className="coinStats">
                  <Col className="coinStatsName">
                    <Title className="coinStatsValue">
                      {icon} {title} : {value}
                    </Title>
                  </Col>
                </Card>
              );
            })}
          </div>
        </Col> */}
      </Row>

      {/* 
          <Col className='coinDescLink'>
            <Row className='coindesc'>
              <Title level={3} className="coinDetailsHeading">
                What is {cryptoDetails?.name}
                {HTMLReactParser(cryptoDetails?.description)}
                 </Title>
            </Row>
          </Col> */}

      <Col className="coinLinks">
        <Title level={3} className="coinDetailsHeading">
          {cryptoDetails?.name} Links
        </Title>
        <div className="linkContainer">
          {cryptoDetails?.links?.map((link) => {
            return (
              <Col
                key={link?.name}
                className="coinLink"
                style={{ width: "300px", margin: ".4rem 1rem" }}
              >
                <p>
                  <span className={"linkType"}>{link?.type} : </span>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link?.name}
                  </a>
                </p>
              </Col>
            );
          })}
        </div>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
