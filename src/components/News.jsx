import React, { useState } from "react";
import { Typography, Row, Col, Card } from "antd";
import moment from "moment";

import { useGetCryptoNewsQuery } from "../services/crptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";

const { Title, Text } = Typography;
// const { Option } = Select;

const demoImage =
  "http://coinrevolous.com/wp-content/uploads/2020/06/cryptonews.jpg";

const News = ({ simplified }) => {
  const [newCategory, setNewCategory] = useState("Cyptocurrency");
  const count = simplified ? 12 : 24;
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newCategory,
    count,
  });
  const { data } = useGetCryptosQuery(100);
  console.log(data, setNewCategory);

  if (isFetching) return "Loading...";

  return (
    <Row gutter={[24, 24]}>
      {/* {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-name"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )} */}
      {cryptoNews?.data?.map((news) => (
        <Col xs={24} sm={12} lg={8} key={news.id}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.title}
                </Title>
                <img
                  src={news?.thumbnail || demoImage}
                  alt="newsImage"
                  style={{ maxWidth: "120px", maxHeight: "120px" }}
                />
              </div>
              <p>
                {news.description > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <Text>{moment(news.createdAt).startOf("ss").fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
