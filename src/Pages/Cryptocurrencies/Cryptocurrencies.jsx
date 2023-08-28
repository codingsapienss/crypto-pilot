/* eslint-disable react/prop-types */
import './Cryptocurrencies.css'
import millify from 'millify'

import { useGetCryptosQuery } from '../../Services/cryptoApi'
import { useEffect, useState } from 'react'
import { Card, Col, Input, Row } from 'antd'
import { Link } from 'react-router-dom'


const Cryptocurrencies = ({ simplified }) => {

  const [searchTerm, setSearchTerm] = useState('')
  const count = simplified ? 10 : 100


  const { data: cryptosList, isFetching } = useGetCryptosQuery(count)

  const [cryptos, setCryptos] = useState([])

  // console.log(cryptos)

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()))

    setCryptos(filteredData)
  }, [cryptosList, searchTerm])


  if (isFetching) return 'Loading...'
  return (
    <>
      {
        !simplified &&
        (
          <div className="serachCrypto">
            <Input style={{ height: '4rem' }} placeholder='Search Cryptocurrencies '
              onChange={(e) => { setSearchTerm(e.target.value) }}
            />
          </div>
        )
      }


      <Row gutter={[32, 32]} className='cryptoCardContainer' >
        {
          cryptos?.map((coin) => {
            return <Col className='cryptoCard' xs={24} sm={24} lg={6} key={coin.uuid}>
              {/* console.log(coin); */}
              <Link to={`/crypto/${coin.uuid}`} state={{ data: coin.iconUrl }}  >
                <Card title={`${coin.rank}. ${coin.name} `}
                  extra={<img style={{ width: '2.5rem' }} className='crypto-img'
                    src={coin.iconUrl} />}
                  hoverable
                >
                  <p>Price : {millify(coin.price)} </p>
                  <p>Market Cap : {millify(coin.marketCap)} </p>
                  <p>Daily Change : {millify(coin.change)}% </p>

                </Card>
              </Link>
            </Col>
          })
        }
      </Row>

    </>
  )
}

export default Cryptocurrencies