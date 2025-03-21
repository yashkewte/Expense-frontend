import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import CustomTooltip from './CustomTooltip'
import CustomLegend from './CustomLegend'

function CustomPieChart({ data, label, totalAmount, colors, showTextAnchor }) {
    return (
        <ResponsiveContainer width='100%' height={400}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    innerRadius={100}
                    labelLine={false}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell ${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip/>} wrapperStyle={{outline:'none'}} />
                <Legend content={<CustomLegend/>} wrapperStyle={{outline:'none'}} />

                {
                    showTextAnchor && (
                        <g>
                            <text
                                x="50%"
                                y="50%"
                                dy={-25}
                                textAnchor='middle'
                                fill='#666'
                                fontSize="14px"
                                dominantBaseline="middle"
                            >{label}</text>


                            <text
                                x="50%"
                                y="50%"
                                dy={8}
                                textAnchor='middle'
                                fill='#333'
                                fontSize="24px"
                                dominantBaseline="middle"
                            >₹ {totalAmount}</text>
                        </g>
                    )
                }
            </PieChart>
        </ResponsiveContainer>
    )
}

export default CustomPieChart
