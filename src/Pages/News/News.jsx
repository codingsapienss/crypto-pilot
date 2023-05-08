/* eslint-disable react/prop-types */
import './News.css'
// import moment from 'moment/moment'
import { useGetCryptosNewsQuery } from '../../Services/cryptoNewsApi'
import { useGetCryptosQuery } from '../../Services/cryptoApi'
import { Avatar, Card, Col, Row, Select, Typography } from 'antd'
import moment from 'moment/moment'
import { useState } from 'react'



const {Text, Title} = Typography
const{ Option} = Select


// const demoImageUrl = `www.analyticsinsight.net/wp-content/uploads/2021/05/AdobeStock_288803828-1-scaled.jpeg`

const News = ({simplified }) => {
  const { data } = useGetCryptosQuery(100)

  const[newsCategory, setNewsCategory] = useState('Cryptocurrency')

    const {data : cryptoNews } = useGetCryptosNewsQuery({
    newsCategory : newsCategory,
    count : simplified ? 15 : 100
  })

  // console.log(cryptoNews)
  // console.log(data)

  if(!cryptoNews?.value) return 'Loading...'

  return (
    <div className='mainContainer'>
      <Row className="news" gutter={[24 , 24]}>
      {
        !simplified  && 
        (
          <Col style={{width : '100vw'}} >
            <Select 
              style={{width: '60vw' ,margin: 'auto' , display: 'block' }}
              showSearch
              size='large'
              className='selectNews'
              placeholder="Select a crypto"
              onChange={(value)=>{setNewsCategory(value)}}
              // optionFilterProp='children'
              // filterOption = {(input, option)=>{
              //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              // }}
            >

                <Option value='Cryptocurrency'>Cryptocurrency</Option>
                {
                  data?.data?.coins.map((c, i)=> {
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
          cryptoNews?.value.map((news, i)=>{
            return <Col className='newsContainer' key={i} xs={24} sm={24} md={24} lg={8}>
              <Card hoverable className='newsCard' >
                  <a href={news.url} target="_blank" rel='noreferrer' >
                      <div className="newsImgContainer">
                        <Title className='newsTitle' level={4}>{news.name}</Title> 
                        <img width='100px' src={news?.image?.thumbnail?.contentUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAQzR9Z9c916u2TpkXeGuLgShTco5s29Wn4jCaCwBZ4CZ56Gd7d913NPiUQbHf5q652SM&usqp=CAU'} alt="news" />
                      </div>

                      <p>
                        {news.description.length > 300 ?  `${news.description.substring(0, 300)}...` : news.description}
                      </p>
                      <div className="providerContainer">
                        <div style={{margin:'10px'}}>
                          <Avatar style={{marginRight: '20px'}} src={news.provider[0]?.image?.thumbnail?.contentUrl || 'https://cdn.gobankingrates.com/wp-content/uploads/2018/03/bitcoin-ethereum-cryptocurrency-taxes-blockchain-iStock-886921308.jpg' } alt='news' />
                          <Text className='providerName'>{news.provider[0]?.name}</Text>
                        </div> 
                          <Text style={{float:'right'}}>
                            - {moment(news.datePublished).startOf('ss').fromNow() }
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