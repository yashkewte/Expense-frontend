import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPath'
import InfoCard from '../../components/cards/InfoCard'
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu'
import { IoMdCard } from 'react-icons/io'
import { addThousandsSeparator } from '../../utils/helper'
import RecentTransaction from '../../components/dashboard/RecentTransaction'
import FinanceOverview from '../../components/dashboard/FinanceOverview'
import ExpenseTransactions from '../../components/dashboard/ExpenseTransactions'
import Last30DaysExpenses from '../../components/dashboard/Last30DaysExpenses'
import RecentIncomeWithChart from '../../components/dashboard/RecentIncomeWithChart'
import RecentIncome from '../../components/dashboard/RecentIncome'
import toast from 'react-hot-toast'

function Home() {

  useUserAuth()

  const navigate = useNavigate()
  const [dashboardData, setDashboardData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchDashboardData = async () => {
    if (loading) return

    setLoading(true)

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      )
      if (response.data) {
        setDashboardData(response.data)
        
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);

    } finally {
      setLoading(false)
    
    }

  }

  useEffect(() => {
    fetchDashboardData()
  
  }, []);

  return (
    <DashboardLayout activeMenu={'Dashboard'}>
      <div className='my-5 mx-auto '>
        <div className='grid lg:grid-cols-3 md:grid-cols-3 gap-2'>
          <InfoCard
            icon={<IoMdCard />}
            lable="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color='bg-primary'
          />

          <InfoCard
            icon={<LuWalletMinimal />}
            lable="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color='bg-orange-500'
          />

          <InfoCard
            icon={<LuHandCoins />}
            lable="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
            color='bg-red-500'
          />
        </div>
        
        <div className='grid lg:grid-cols-2 md:grid-cols-2 gap-6 mt-6'>
           <RecentTransaction
             transactions={dashboardData?.recentTransactions}
             onSeeMore={()=> navigate('/expense')} 
           />

           <FinanceOverview
             totalBalance={dashboardData?.totalBalance || 0}
             totalIncome={dashboardData?.totalIncome || 0}
             totalExpense={dashboardData?.totalExpense || 0}
           />

           <ExpenseTransactions
             transactions={dashboardData?.last30DaysExpenses?.transactions || []}
             onSeeMore={()=> navigate('/expense')}
           />

           <Last30DaysExpenses
             data={dashboardData?.last30DaysExpenses?.transactions ||  []}
           />

           <RecentIncomeWithChart
             data={dashboardData?.last60DaysIncome?.transactions.slice(0,4) || []}
             totalIncome={dashboardData?.totalIncome || 0}
           />

           <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore={()=> navigate('/income')}
           />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home