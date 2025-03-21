import React, { useEffect, useState, useCallback } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/income/IncomeOverview'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPath'
import Model from '../../components/Model'
import AddIncomeForm from '../../components/income/AddIncomeForm'
import toast from 'react-hot-toast'
import IncomeList from '../../components/income/IncomeList'
import DeleteAlert from '../../components/DeleteAlert '
import { useUserAuth } from '../../hooks/useUserAuth'

function Income() {

  useUserAuth()

  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false)
  const [incomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  })

  // fetching income details
  const fetchInomeDetails = async () => {
    if (loading) return

    setLoading(true)

    try {
      const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`)

      if (response.data) {
        setIncomeData(response.data)
      }

    } catch (error) {
      console.log("Something went wrong. Please try again", error.message);

    }
    finally {
      setLoading(false)
    }
  }

  // handle Add income

  const handleAddIncome = async(income) => {
    const {source, amount, date, icon} = income

    // vaidation
    if(!source.trim()){
      toast.error('Please enter source of income')
      return
    }
    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error('Please enter valid amount')
      return
    }
    if(!date){
      toast.error('Please select date')
      return
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME,{
        source,
        amount,
        date,
        icon
      })

      setOpenAddIncomeModel(false)
      toast.success('Income added successfully')
      fetchInomeDetails()
    } catch (error) {
      console.error(
        "Error while adding income",
        error.response?.data?.message || error.message
      )
    }
  }

  // delete income 

  const deleteIncome = async(id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))

      setOpenDeleteAlert({show:false, data:null})
      toast.success("Income deleted successfully")
      fetchInomeDetails()
    } catch (error) {
      console.error("Error while deleting the income",
        error.response?.data?.message || error.message
      );
      toast.error('Error while deleting the income')
    }
  }

  // handle download income details
  const handleDownloadIncome = async() => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
          responseType: "blob"
        }
      )

      // create a url for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download","income_details.xlsx")

      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)

    } catch (error) {
      console.error('Error while downloading income details,', error.message);
      toast.error('Failed to download income details ')
    }
  }


  useEffect(() => {
    fetchInomeDetails()
    
  }, []);



  return (
    <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModel(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id)=>{
              setOpenDeleteAlert({show: true, data: id})
            }}
            onDownload={handleDownloadIncome}
          />

        </div>
        <Model
          isOpen={openAddIncomeModel}
          onClose={() => setOpenAddIncomeModel(false)}
          title='Add Income'
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Model>

        <Model
         isOpen={openDeleteAlert.show}
         onClose={()=> setOpenDeleteAlert({show: false, data:null})}
         title='Delete Income'
        > 
          <DeleteAlert 
           content="Are you sure you want to delete this income"
           onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Model>

      </div>
    </DashboardLayout>
  )
}

export default Income