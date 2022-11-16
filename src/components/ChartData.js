import React, { useEffect } from 'react';
import c3 from 'c3';

export const ChartData = (props) => {
  const countData = [props.gameName];
  const dateData = [];

  for (var a = 0; a < props.data.length; a++) {
    console.log(props.data);

    countData.push(props.data[a].count);
    dateData.push(props.data[a].added_on);
  }

  console.log(countData);

  useEffect(() => {
    c3.generate({
      bindto: '#chart',
      data: {
        columns: [countData],
        type: 'spline',
      },
      axis: {
        x: {
          type: 'category',
          categories: dateData,
        },
      },
    });
  }, []);

  return <div id="chart" />;
};

export default ChartData;
