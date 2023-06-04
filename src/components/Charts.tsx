import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
const data = [
  { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 300, pv: 2400, amt: 2400 },
  { name: "Page C", uv: 500, pv: 2400, amt: 2400 },
  { name: "Page D", uv: 200, pv: 2400, amt: 2400 },
];

interface IChart {
  perDayData: any;
}
const Charts = ({ perDayData }: IChart) => {
  const [totalCases, setTotalCases] = useState<any>([]);
  const { cases, deaths, recovered } = perDayData.data;

  function transformJson(jsonObj: any) {
    const transformedArr = [];

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

    console.log(first20Data);

    if (first20Data) {
      const updatedCases = updatedTransformJson(first20Data);
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

    console.log(first20Data);

    if (first20Data) {
      const updatedCases = updatedTransformJson(first20Data);
      setTotalCases(updatedCases);
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

    console.log(first20Data);

    if (first20Data) {
      const updatedCases = updatedTransformJson(first20Data);
      setTotalCases(updatedCases);
    }
  }, [deaths]);

  //   console.log(totalCases)
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={560}>
        <LineChart width={700} height={500} data={totalCases}>
          <Line type="monotone" dataKey="data" stroke="#8884d8" />
          <Line type="monotone" dataKey="data" stroke="#8884d8" />
          {/* <CartesianGrid stroke="#ccc" /> */}
          <XAxis dataKey="name" />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
