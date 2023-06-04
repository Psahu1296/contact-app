import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import Map from './Map'
import Charts from './Charts'
import axios from 'axios'
import { useQuery } from "react-query";

const ChartsMaps = () => {
const [apiData, setApiData] = useState<any>()

const allData = useQuery('repoData', () =>
    axios.get('https://disease.sh/v3/covid-19/all').then(res =>
      res.data
    )
  )

  const countryData = useQuery('country', () => axios.get('https://disease.sh/v3/covid-19/countries').then(res =>
  res.data
))

  const perDayData = useQuery('perday', () => axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all').then(res =>
  res.data
))


  console.log(perDayData.data)
  return (
    <div className='w-full flex flex-col px-6'>
      <div className="w-full my-4 h-[560px] "><Map /></div>
      {perDayData.isFetched && <div className="w-full my-4"><Charts  perDayData={perDayData}/></div>}
    </div>
  )
}

export default ChartsMaps