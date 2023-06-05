import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip
} from "recharts";


// * https://api.opencagedata.com/geocode/v1/json?q=LAT+LNG&key=cb319bee81d843de93db1ad711228b9c
interface IToolTip {
  active: boolean;
  payload: any;
  label: string;
}
const CustomTooltip = ({ active, payload, label }: IToolTip) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="intro">{"Date : " + label}</p>
        <p className="label">{`Cases: ${payload[0].value}`}</p>
        <p className="label">{`Recovered: ${payload[1].value}`}</p>
        <p className="label">{`Deaths: ${payload[2].value}`}</p>
      </div>
    );
  }

  return null;
};

interface IChart {
  perDayData: any;
}
const Charts = ({ perDayData }: IChart) => {
  const [totalCases, setTotalCases] = useState<any>([]);
  const { cases, deaths, recovered } = perDayData.data;

  function transformJson(jsonObj: any, type: string) {
    const transformedArr = [];

    if(type === 'recovered') {
      for (const key in jsonObj) {
        if (Object.prototype.hasOwnProperty.call(jsonObj, key)) {
          const transformedObj = {
            name: key,
            recovered: jsonObj[key],
          };
          transformedArr.push(transformedObj);
        }
      }
      return transformedArr.reverse();

    }
    if(type === 'deaths') {
      for (const key in jsonObj) {
        if (Object.prototype.hasOwnProperty.call(jsonObj, key)) {
          const transformedObj = {
            name: key,
            deaths: jsonObj[key],
          };
          transformedArr.push(transformedObj);
        }
      }
      return transformedArr.reverse();

    }
    for (const key in jsonObj) {
      if (Object.prototype.hasOwnProperty.call(jsonObj, key)) {
        const transformedObj = {
          name: key,
          data: jsonObj[key],
        };
        transformedArr.push(transformedObj);
      }
    }
    return transformedArr.reverse();

  }

  const updatedTransformJson = useCallback(transformJson, []);


  useEffect(() => {
    // Retrieve only the first 20 data entries
    const keys = Object.keys(cases);
    const first20Data = keys.slice(0, 30).reduce((result, key) => {
      // eslint-disable-next-line
      // @ts-ignore
      result[key] = cases[key];
      return result;
    }, {});

    if (first20Data) {
      const updatedCases = updatedTransformJson(first20Data, "cases");
      setTotalCases(updatedCases);
    }
  }, [cases]);

  useEffect(() => {
    // Retrieve only the first 20 data entries
    const keys = Object.keys(recovered);
    const first20Data = keys.slice(0, 30).reduce((result, key) => {
      // eslint-disable-next-line
      // @ts-ignore
      result[key] = recovered[key];
      return result;
    }, {});

    if (first20Data) {
      const updatedCases = updatedTransformJson(first20Data, "recovered");
      setTotalCases((prev: any) => {
        return prev.map((ele: any, idx: number) => ({...ele, ...updatedCases[idx]}))
      });
    }
  }, [recovered]);

  useEffect(() => {
    // Retrieve only the first 20 data entries
    const keys = Object.keys(deaths);
    const first20Data = keys.slice(0, 30).reduce((result, key) => {
      // eslint-disable-next-line
      // @ts-ignore
      result[key] = deaths[key];
      return result;
    }, {});


    if (first20Data) {
      const updatedCases = updatedTransformJson(first20Data, "deaths");
      setTotalCases((prev: any) => {
        return prev.map((ele: any, idx: number) => ({...ele, ...updatedCases[idx]}))
      });
    }
  }, [deaths]);

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={560}>
        <LineChart width={700} height={500} data={totalCases}>
          <Line type="monotone" dataKey="data" stroke="#8884d8" />
          <Line type="monotone" dataKey="deaths" stroke="#dd2c15" />
          <Line type="monotone" dataKey="recovered" stroke="#8edb5b" />
          {/* <CartesianGrid stroke="#ccc" /> */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip active={true}  payload={totalCases} label="deaths"/>} />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
