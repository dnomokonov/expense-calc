import classes from './ExpenseTotal.module.css'
import { useEffect, useState } from "react"

export default function ExpenseTotal({expenses}) {
    const [total, setTotal] = useState(0)
    const [period, setPeriod] = useState('month')

    useEffect(() => {
        calcTotal()
    }, [period, expenses])

    const calcTotal = () => {
        const now = new Date()
        let filtered
    
        if (period === 'month') {
            filtered = expenses.filter(expense => {
                const expDate = new Date(expense.date)

                return expDate.getMonth() === now.getMonth() && expDate.getFullYear() === now.getFullYear()
            })
        } else if (period === 'year') {
            filtered = expenses.filter(expense => {
                const expDate = new Date(expense.date)
                
                return expDate.getFullYear() === now.getFullYear()
            })
        }
    
        const totalAmount = filtered.reduce((acc, expense) => acc + parseFloat(expense.amount), 0)

        setTotal(totalAmount)
    }
    
    return (
        <div className={classes.periodblock}>
            <div>
                <label>Период</label>
                <select value={period} onChange={(e) => setPeriod(e.target.value)}>
                    <option value="month">Месяц</option>
                    <option value="year">Год</option>
                </select>
            </div>
            
            <p>{period === 'month' ? 'Текущий месяц' : 'Год'} : <b>{total.toFixed(2)}</b></p>
        </div>
    )
}