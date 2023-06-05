import React, { useEffect, useState } from "react";
import Map from "./Map";
import Charts from "./Charts";
import axios from "axios";
import { useQuery } from "react-query";

const ChartsMaps = () => {
  const [apiData, setApiData] = useState<any>(null);
  const [geoData, setGeoData] = useState<any>(null);
  const [country, setCountry] = useState<string>("");

  const allData = useQuery("repoData", () =>
    axios.get("https://disease.sh/v3/covid-19/all").then((res) => res.data)
  );

  const countryData = useQuery("country", () =>
    axios
      .get("https://disease.sh/v3/covid-19/countries")
      .then((res) => res.data)
  );

  const perDayData = useQuery("perday", () =>
    axios
      .get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
      .then((res) => res.data)
  );

  useEffect(() => {
    if (geoData) {
      axios
        .get(
          `https://api.opencagedata.com/geocode/v1/json?q=${geoData.lat}+${geoData.lng}&key=cb319bee81d843de93db1ad711228b9c`
        )
        .then((res) => {
          const country = res.data.results[0].components.country;
          setCountry(country);
          return country;
        });
    }
  }, [geoData]);


  useEffect(() => {
    if(country) {
      const info = countryData.data.find((co :any) => co.country === country)
      setApiData(info)
    }
  }, [country])

  console.log(apiData)
  return (
    <div className="w-full flex flex-col px-6 overflow-y-auto">
      <div className="w-full my-4 h-[560px] ">
        <Map setGeoData={setGeoData} apiData={apiData}/>
      </div>
      {perDayData.isFetched && (
        <div className="w-full my-4">
          <Charts perDayData={perDayData} />
        </div>
      )}
    </div>
  );
};

export default ChartsMaps;
