import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import React from "react"
import "./style.css"

export const Timeline = (props) => {
  console.log(props.contributions)
  return (
    <div name="timeline">
      {props.contributions.length > 0 &&
      <div className="content">
        <LineChart
          width={props.width}
          height={props.height}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="category" type="category" allowDuplicatedCategory={false} />
          <YAxis dataKey="value"/>
          <CartesianGrid strokeDasharray="0" stroke="#33363f"/>
          <Tooltip contentStyle={{ backgroundColor: "#171f29", color: "#9799a0" }} />
          <Legend/>
          {props.contributions.map((year) => (
            <Line
              type="monotone"
              strokeWidth="5"
              stroke={year.color}
              animationBegin={year.yearAnimationDelay}
              connectNulls={true} dataKey="value"
              data={year.data}
              name={year.name}
              key={year.name} />
          ))}
        </LineChart>
      </div>
      }
    </div>
  )
}
