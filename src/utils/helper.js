import moment from "moment"

export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return regex.test(email)
}

export const getInitials = (name)=>{
    if (!name) return ''

    const words = name.split(' ')
    let inititals = ''

    for (let i = 0; i<Math.random(words.length, 2); i++ ){
        inititals += words[i][0]
    }
    return inititals.toUpperCase()
}

export const addThousandsSeparator = (num)=>{
    if(num == null || isNaN(num)) return ''

    const [integerPart, fractionalPart] = num.toString().split(".")
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g,",")

    return fractionalPart
        ? `${formattedInteger}.${fractionalPart}` : formattedInteger
}

export const prepareExpenseChartData = (data=[])=>{
    const charData = data.map((item)=>({
        category:item?.category,
        amount:item?.amount,
    }
    ))
    return charData
}

export const prepareIncomeChartData = (data=[])=>{
    const sortedData = [...data].sort((a,b)=> new Date(a.date)-new Date(b.date))

    const charData = sortedData.map((item)=>({
        month: moment(item.date).format('Do MMM'),
        amount:item?.amount,
        source:item?.source
    }))
    return charData
}

export const prepareExpenseLineChartData = (data=[])=>{
  const sortedData = [...data].sort((a,b)=> new Date(a.date) - new Date(b.date))

  const chartData = sortedData.map((item)=>({
    month: moment(item?.date).format('Do MMM'),
    amount: item?.amount,
    category: item?.category
  }))
  return chartData
}