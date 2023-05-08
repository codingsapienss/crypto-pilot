import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import dotenv from 'dotenv';
// dotenv.config();

const cryptoApiHeaders = {
    'X-RapidAPI-Key': 'dd2648283emsh4741c93ec039a38p1ea717jsn988df7f17593',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequest = (url) => ({url , headers: cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath : 'cryptoApi' ,
    baseQuery : fetchBaseQuery({baseUrl}),
    endpoints : (builder) => ({
        getCryptos : builder.query({
            query : (count) => createRequest(`/coins?limit=${count}`)
         }), 
         getCryptoDetails :  builder.query({
            query : (coinId) => createRequest(`/coin/${coinId}`)
         }) ,
         getCryptoHistory : builder.query({
            query : ({coinId, timePeriod}) => createRequest(`coin/${coinId}/history?timePeriod=${timePeriod}`)
         })
    }) 
})

export const {useGetCryptosQuery, useGetCryptoDetailsQuery ,useGetCryptoHistoryQuery } = cryptoApi ;
