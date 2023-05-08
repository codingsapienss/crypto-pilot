import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import dotenv from 'dotenv';
// dotenv.config();

 const cryptoNewsApiHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key':'dd2648283emsh4741c93ec039a38p1ea717jsn988df7f17593',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
  }


  const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

  const createRequest = (url) =>{
        return {
            url , headers: cryptoNewsApiHeaders
        }
  }

  export const cryptoNewsApi = createApi ({
    reducerPath : 'cryptoNewsApi' ,
    baseQuery : fetchBaseQuery({baseUrl}) ,
    endpoints : (builder) => ({
        getCryptosNews : builder.query ({
            query : ({newsCategory , count}) => createRequest (`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&count=${count}`)
        })
    })
  })

export const {useGetCryptosNewsQuery} = cryptoNewsApi