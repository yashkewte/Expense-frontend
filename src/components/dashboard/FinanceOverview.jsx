import React from 'react'
import CustomPieChart from '../cards/CustomPieChart'

function FinanceOverview({ totalBalance, totalExpense, totalIncome }) {

  const COLORS = ['#875CF5', '#FA2C37', '#FF6900']

  const balanceData = [
    { name: "Total Balance", amount: totalBalance, color: COLORS[0] },
    { name: "Total Expense", amount: totalExpense, color: COLORS[1] },
    { name: "Total Income", amount: totalIncome, color: COLORS[2] }
  ]

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5>Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={totalBalance.toString()}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  )
}

export default FinanceOverview
