/* eslint-disable react/prop-types */
import './News.css'
import { useGetCryptosNewsQuery } from '../../Services/cryptoNewsApi'
import { useGetCryptosQuery } from '../../Services/cryptoApi'
import { Avatar, Card, Col, Row, Select, Typography } from 'antd'
import moment from 'moment/moment'
import { useState } from 'react'



const { Text, Title } = Typography
const { Option } = Select

const News = ({ simplified }) => {

  const imageUrls = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2Ik8WWUTPyZNrTcNb8lV98HG7aevhgFFB5g&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM1D9I4DR0WgBA6eGkkTf7bRXQ5QGddWxWBQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg5JeUR117EQXc3wwJF0i42YamAVEV_jjeOA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6bvEHAsimpEFJkIM8c-T3ojVtViobjbi5zw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsoMxIqT4MsG9Xi33g5ndaq6qIiaPG0X1wMw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqbh_SK8Blt21zU91x_JgjJEQQp-dZeNwvjg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeN4Qeq9aLAxMgzsFRoAmN_LPpNEJuJuIpOw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkxKJR6yMIBqKfibQOV7qVxhYtOQiNwYN2Pw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVmMLtte-n4_0ZpUAuoRvar7wZc7iOHccOiA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzovUjVfW_6jMNZXN96cr5I_sGkbSIhNuyTQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrZ8tsNWwWXc5JkS5cf_KeutGQvDgDFbog6g&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZSxvttkRFI1PUicFDXxL-qPhFIObGqUq3-w&usqp=CAU',
  ]

  function getRandomImageUrl() {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
  }



  const { data } = useGetCryptosQuery(100)

  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')

  const { data: cryptoNews } = useGetCryptosNewsQuery({
    newsCategory: newsCategory,
    count: simplified ? 10 : 100
  })

  if (!cryptoNews?.value) return 'Loading...'

  return (
    <div >
      <Row className="news" gutter={[24, 24]}>
        {
          !simplified &&
          (
            <Col style={{ width: '100vw' }} >
              <Select
                style={{ width: '60vw', margin: 'auto', display: 'block' }}
                showSearch
                size='large'
                className='selectNews'
                placeholder="Select a crypto"
                onChange={(value) => { setNewsCategory(value) }}
              // optionFilterProp='children'
              // filterOption = {(input, option)=>{
              //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              // }}
              >

                <Option value='Cryptocurrency'>Cryptocurrency</Option>
                {
                  data?.data?.coins.map((c, i) => {
                    return <Option key={i} value={c.name} >
                      {c.name}
                    </Option>
                  })
                }
              </Select>
            </Col>
          )

        }

        {
          cryptoNews?.value.map((news, i) => {
            return <Col className='mainContainer' key={i} xs={24} sm={24} md={24} lg={24}>
              <Card hoverable>
                <a href={news.url} target="_blank" rel='noreferrer' >
                  <div className="newsContainer">

                    <div className="title_Desc">
                      <Title className='newsTitle' level={3}>{news.name}</Title>
                      <p style={{ color: 'rgba(0, 0, 0, 0.7)', fontWeight: 'bolder' }}>
                        {news.description.length > 250 ? `${news.description.substring(0, 250)}...` : news.description}
                      </p>
                    </div>
                    <img width='150px' src={news?.image?.thumbnail?.contentUrl || getRandomImageUrl()} alt="news" />
                  </div>

                  <div className="providerContainer">
                    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                      <Avatar style={{ marginRight: '10px' }} src={news.provider[0]?.image?.thumbnail?.contentUrl || getRandomImageUrl()} alt='news' />
                      <Text style={{ fontSize: '10px' }} className='providerName'>{news.provider[0]?.name}</Text>
                    </div>
                    <Text style={{ marginTop: '10px', float: 'right', fontSize: '10px' }}>
                      - {moment(news.datePublished).startOf('ss').fromNow()}
                    </Text>
                  </div>
                </a>
              </Card>
            </Col>
          })
        }
      </Row>

    </div>
  )
}

export default News