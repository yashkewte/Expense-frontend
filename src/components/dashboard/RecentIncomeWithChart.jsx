import React, { useEffect, useState } from 'react'
import CustomPieChart from '../cards/CustomPieChart'

const COLORS = ["#875Cf5","#FA2C37", "#FF6900", "#4f39f6"]

function RecentIncomeWithChart({data, totalIncome}) {

    const [chartData, setCharData] = useState([])

    const prepareChartData = () =>{
        const dataArr = data?.map((item)=>({
            name:item?.source.charAt(0).toUpperCase() + item?.source.slice(1),
            amount:item?.amount
        }))
        setCharData(dataArr)
    }

    useEffect(()=>{
        prepareChartData()
    },[data])
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Last 60 Days Income</h5>
        </div>
        <CustomPieChart
          data={chartData}
          label='Total Income'
          totalAmount={`${totalIncome}`}
          showTextAnchor
          colors={COLORS}
        />
      
    </div>
  )
}

export default RecentIncomeWithChart
