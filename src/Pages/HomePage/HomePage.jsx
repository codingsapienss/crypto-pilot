import { Col, Row, Statistic, Typography } from "antd";
import "./HomePage.css";
import millify from "millify";
import { useGetCryptosQuery } from "../../Services/cryptoApi";
// import { Link } from "react-router-dom";
import Cryptocurrencies from "../Cryptocurrencies/Cryptocurrencies";
import News from "../News/News";


const { Title } = Typography;

const HomePage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);

  const globalStats = data?.data?.stats;

  if (isFetching) {
    return "Loading";
  }

  return (
    <>
      <div className="globalStats">
        <Title level={1} className="heading">
          {" "}
          Global Crypto Stats{" "}
        </Title>
        <Row>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            {" "}
            <Statistic
              title="Total Crypto-Currencies"
              value={globalStats?.total}
            />{" "}
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            {" "}
            <Statistic
              title="Total Exchanges"
              value={millify(globalStats.totalExchanges)}
            />{" "}
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            {" "}
            <Statistic
              title="Total Market Cap"
              value={millify(globalStats.totalMarketCap)}
            />{" "}
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            {" "}
            <Statistic
              title="Total 24 hr volume"
              value={millify(globalStats.total24hVolume)}
            />{" "}
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            {" "}
            <Statistic
              title="Total Markets"
              value={millify(globalStats.totalMarkets)}
            />{" "}
          </Col>
        </Row>
      </div>

      <div className="homeHeadingContainer">
        <Title level={1} className="home-title">
          Top 10 cryptocurrencies in the world
        </Title>
        <Cryptocurrencies simplified={true} />
        {/* <Title level={5} className="showMore">
          <Link to="/cryptocurrencies">...Show More</Link>
        </Title> */}
      </div>

      <div className="homeHeadingContainer">
        <Title level={1} className="home-title">
          Top 10 latest crypto news
        </Title>
        <News simplified />
        {/* <Title level={5} className="showMore">
          <Link to="/news">...Show More</Link>
        </Title> */}
      </div>

    </>
  );
};

export default HomePage;
