import React, { useState, useEffect } from 'react';
import { getStatisticalAnalysis } from '../../redux/departmentsSlice';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Tooltip,
  DateTime,
  MultiColoredLineSeries,
} from "@syncfusion/ej2-react-charts";

import { useDispatch, useSelector } from 'react-redux';



const LineChart = () => {
    const dispatch = useDispatch()
    const {analysis} = useSelector((state) => state.departments)
    console.log(analysis)
    let dataValues = [];
    let colors = [
  "navy",
  "green",
  "#ff0097",
  "crimson",
  "blue",
  "darkorange",
  "deepskyblue",
  "mediumvioletred",
  "violet",
  "peru",
  "gray",
  "deeppink",
  "red",
    ];
    
    useEffect(() => {
        dispatch(getStatisticalAnalysis())     
      }, [])


//     rainFallData.map((value, index) => {
//   dataValues.push({
//     x: new Date(2017, -index, 1),
//     y: value.toFixed(2),
//     color: colors[Math.floor(index / 16)],
//   });
// });
  return (
    <div className="control-pane" style={{ padding: "10px" }}>
      <div className="control-section">
        <ChartComponent
          id="line-charts"
          style={{ textAlign: "center" }}
          primaryXAxis={{
            valueType: "DateTime",
            labelFormat: "y",
            intervalType: "Years",
            edgeLabelPlacement: "Shift",
            majorGridLines: { width: 0 },
          }}
          primaryYAxis={{
            rangePadding: "None",
            minimum: 4,
            maximum: 10,
            title: "Particulate Matter(PM)",
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
          }}
          tooltip={{ enable: true, shared: true, enableAnimation: false }}
          legendSettings={{ visible: false }}
          chartArea={{ border: { width: 0 } }}
          load={() => {}}
          title="Particulate Levels in Rainfall"
          loaded={() => {}}
          width="100%"
          height="180"
        >
          <Inject services={[MultiColoredLineSeries, DateTime, Tooltip]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={dataValues}
              width={1.4}
              xName="x"
              yName="y"
              name="Rainfall"
              type="MultiColoredLine"
              pointColorMapping="color"
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default LineChart;