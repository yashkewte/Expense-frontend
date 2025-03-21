import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { API_PATHS } from '../../utils/apiPath'
import toast from 'react-hot-toast'
import axiosInstance from '../../utils/axiosInstance'
import ExpenseOverview from '../../components/expense/ExpenseOverview'
import Model from '../../components/Model'
import AddExpenseForm from '../../components/expense/AddExpenseForm'
import ExpenseList from '../../components/expense/ExpenseList'
import DeleteAlert from '../../components/DeleteAlert '


function Expense() {
  useUserAuth()

  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false)
  const [expenseData, setExpenseData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  })

  // fetching expense details
  const fetchExpenseDetails = async () => {
    if (loading) return

    setLoading(true)

    try {
      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`)

      if (response.data) {
        setExpenseData(response.data)
      }

    } catch (error) {
      console.log("Something went wrong. Please try again", error.message);

    }
    finally {
      setLoading(false)
    }
  }

  // handle Add income

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense

    // vaidation
    if (!category.trim()) {
      toast.error('Please enter category of expense')
      return
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error('Please enter valid amount')
      return
    }
    if (!date) {
      toast.error('Please select date')
      return
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon
      })

      setOpenAddExpenseModel(false)
      toast.success('Expense added successfully')
      fetchExpenseDetails()
    } catch (error) {
      console.error(
        "Error while adding expense",
        error.response?.data?.message || error.message
      )
    }
  }

  // delete expense

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))

      setOpenDeleteAlert({ show: false, data: null })
      toast.success("Expense deleted successfully")
      fetchExpenseDetails()
    } catch (error) {
      console.error("Error while deleting the expense",
        error.response?.data?.message || error.message
      );
      toast.error('Error while deleting the expense')
    }
  }

  // handle download expese

  const handleDownloadExpense = async() => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: "blob"
        }
      )

      // create a url for the blob
      const url = window.URL.createObjectURL(new Blob([response.data], {type: response.headers['content-type']}))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download","expense_details.xlsx")
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      // document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

    } catch (error) {
      console.error('Error while downloading expense details', error.message);
      toast.error('Failed to download expense details ')
    }
  }

  useEffect(() => {
    fetchExpenseDetails()

  }, [])
  return (
    <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div>
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModel(true)}
            />
          </div>
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadExpense}
          />
        </div>
        <Model
          isOpen={openAddExpenseModel}
          onClose={() => setOpenAddExpenseModel(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Model>

        <Model
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title='Delete expense'
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Model>
      </div>
    </DashboardLayout>
  )
}

export default Expense
