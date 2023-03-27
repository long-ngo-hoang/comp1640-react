import { BarChart, Bar } from "recharts";
import { useSelector, useDispatch } from 'react-redux'
import React , { useEffect, useState ,useCallback }from "react";
import { 
    PieChart, 
    Pie,
    Cell,     
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Sector} 
    from "recharts";
import { getStatisticalAnalysis } from "../../redux/departmentsSlice";
import Navbar1 from "../navbar/navbar1";
import { selectStatisticalAnalysis} from '../../redux/departmentsSlice'

export default function Chart() {

const dispatch = useDispatch()
const statisticalAnalysis = useSelector((state) => selectStatisticalAnalysis(state))

useEffect(()=>{
    dispatch(getStatisticalAnalysis(),[]);
  },[])

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`PV ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };


  return (
    <>    
    <Navbar1/>
    <h1>Chart</h1>
    <div style={{display: "flex"}}>
    <div>
    <h6>Bar Chart</h6>
    <BarChart
      width={500}
      height={300}
      data={statisticalAnalysis}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
      barSize={40}
    >
      <XAxis dataKey="name" scale="point" padding={{ left: 30, right: 30 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey='totalIdeas' fill="#8884d8" background={{ fill: "#eee" }} />
    </BarChart>
    </div>
    
    <div>
    <h6>Pie Chart</h6>
    <PieChart width={500} height={500}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={statisticalAnalysis}
        cx={300}
        cy={120}
        innerRadius={80}
        outerRadius={100}
        fill="#8884d8"
        dataKey="totalIdeas"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
    </div>
    </div>
    </>
  );
}