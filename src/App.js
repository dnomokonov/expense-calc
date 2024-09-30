import './App.css'
import { useEffect, useState } from "react"
import ExpenseList from "./components/ExpenseList/ExpenseList"
import ExpenseForm from "./components/ExpenseForm/ExpenseForm"
import Button from "./components/Button/Button"
import Modal from "./components/Modal/Modal"
import ExpenseSort from './components/ExpenseFilter/ExpenseSort'
import ExpenseFilter from './components/ExpenseFilter/ExpenseFilter'
import ExpenseChart from './components/ExpenseChart/ExpenseChart'
import ExpenseTotal from './components/ExpenseTotal/ExpenseTotal'

function App() {
  const [expenses, setExpenses] = useState([])
  const [isOpenModal, setOpenModal] = useState(false)
  const [editExpense, setEditExpense] = useState(null)

  const [formDate, setFormDate] = useState('')
  const [formCategory, setFormCategory] = useState('')
  const [formAmount, setFormAmount] = useState('')
  const [formDesc, setFormDesc] = useState('')

  const [sort, setSort] = useState('date')
  const [order, setOrder] = useState('asc')
  const [filteredExpenses, setFilteredExpenses] = useState([])

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || []
    setExpenses(storedExpenses)
    setFilteredExpenses(storedExpenses)
  }, [setExpenses])

  const resetForm = () => {
    setFormDate('')
    setFormCategory('')
    setFormAmount('')
    setFormDesc('')
    setOpenModal(false)
    setEditExpense(null)
  }

  const handleSave = (event) => {
    event.preventDefault()

    const date = formDate
    const category = formCategory || "Продукты"
    const amount = formAmount
    const desc = formDesc

    if (editExpense !== null) {
      const updatedExpenses = sortedExpenses.map((expense, index) =>
        index === editExpense ? { date, category, amount, desc } : expense
      )
      setExpenses(updatedExpenses)
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses))
      setFilteredExpenses(updatedExpenses)
    } else {
      const lastd = JSON.parse(localStorage.getItem('expenses')) || []
      const updatedExpenses = [...lastd, { date, category, amount, desc }]

      localStorage.setItem('expenses', JSON.stringify(updatedExpenses))
      setExpenses(updatedExpenses)
      setFilteredExpenses(updatedExpenses)
    }

    resetForm()
  }

  const handleEditExpense = (index) => {
    const expense = sortedExpenses[index]
    setEditExpense(index)

    setFormDate(expense.date)
    setFormCategory(expense.category)
    setFormAmount(expense.amount)
    setFormDesc(expense.desc)

    setOpenModal(true)
  }

  const handleDelExpense = () => {
    const updatedExpenses = sortedExpenses.filter((_, item) => item !== editExpense)

    setExpenses(updatedExpenses)
    setFilteredExpenses(updatedExpenses)
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses))

    resetForm()
  }

  const sortExpenses = (expenses, sort, order) => {
    return [...expenses].sort((a, b) => {
      let field1, field2

      if (sort === 'date') {
        field1 = new Date(a.date)
        field2 = new Date(b.date)
      } else if (sort === 'amount') {
        field1 = parseFloat(a.amount)
        field2 = parseFloat(b.amount)
      }

      if (field1 < field2) {
        return order === 'asc' ? -1 : 1
      }

      if (field1 > field2) {
        return order === 'asc' ? 1 : -1
      }

      return 0
    })
  }

  const changeFilter = (param) => {
    if (!param.products && !param.transport && !param.recreation) {
      setFilteredExpenses(expenses)
      return
    }

    const filtered = expenses.filter((expense) => {
      if (param.products && expense.category === "Продукты") return true
      if (param.transport && expense.category === "Транспорт") return true
      if (param.recreation && expense.category === "Развлечение") return true

      return false
    })

    setFilteredExpenses(filtered)
  }

  const sortedExpenses = sortExpenses(filteredExpenses, sort, order)

  return (
    <>
      <main>
        <section className='data-block'>
          <div className="list-block">
            <div className='panel'>
              <ExpenseSort sort={sort} order={order} setSort={setSort} setOrder={setOrder} />
              <ExpenseTotal expenses={expenses} /> 
            </div>

            <div className='filters-block'>
              <Button onClick={() => setOpenModal(true)}>Добавить</Button>
              <ExpenseFilter onChangeFilter={changeFilter} />
            </div>
        
            <table>
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Категория</th>
                  <th>Сумма</th>
                  <th>Описание</th>
                </tr>
              </thead>
              <tbody>
                {sortedExpenses.map((expense, index) => (
                  <ExpenseList
                    key={index}
                    date={expense.date}
                    category={expense.category}
                    amount={expense.amount}
                    desc={expense.desc}
                    onClick={() => handleEditExpense(index)}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <Modal open={isOpenModal}>
            <div className='head-modal'>
              <h3>{editExpense !== null ? 'Редактировать запись' : 'Добавить запись'}</h3>
              <Button onClick={resetForm}>X</Button>
            </div>
            
            <ExpenseForm onSubmit={handleSave}>

              <div className='field-group'>
                <div className='field'>
                  <label htmlFor="date">Дата</label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                  />
                </div>

                <div className='field'>
                  <label htmlFor="category">Категория</label>
                  <select
                    name="category"
                    id="category"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                  >
                    <option value="Продукты">Продукты</option>
                    <option value="Транспорт">Транспорт</option>
                    <option value="Развлечение">Развлечение</option>
                  </select>
                </div>
              </div>
                    

              <div className='field'>
                <label htmlFor="amount">Сумма</label>
                <input
                  type="text"
                  name="amount"
                  id="amount"
                  value={formAmount}
                  onChange={(e) => setFormAmount(e.target.value)}
                />
              </div>  

              <div className='field'>
              <label htmlFor="desc">Описание</label>
              <input
                type="text"
                name="desc"
                id="desc"
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
              />
              </div>  

              <div className='btn-modal'>
                <Button type="submit">{editExpense !== null ? 'Обновить' : 'Сохранить'}</Button>

                {editExpense !== null && (
                  <Button onClick={handleDelExpense} >Удалить</Button>
                )}
              </div>
            </ExpenseForm>
          </Modal>

          <div className='chart-block'>
            <ExpenseChart expdata={sortedExpenses} type='line'/>
            <ExpenseChart expdata={sortedExpenses} type='pie'/>
          </div>

        </section>
      </main>
    </>
  )
}

export default App