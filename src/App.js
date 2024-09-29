import './App.css';
import { useEffect, useState } from "react"
import ExpenseList from "./components/ExpenseList/ExpenseList"
import ExpenseForm from "./components/ExpenseForm/ExpenseForm"
import Button from "./components/Button/Button"
import Modal from "./components/Modal/Modal"
import ExpenseSort from './components/ExpenseFilter/ExpenseSort'

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

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || []
    setExpenses(storedExpenses)
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

    console.log(category)

    if (editExpense !== null) {
      const updatedExpenses = expenses.map((expense, index) => 
        index === editExpense ? { date, category, amount, desc } : expense
      )
      setExpenses(updatedExpenses)
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses))
    } else {
      const lastd = JSON.parse(localStorage.getItem('expenses')) || []
      const updatedExpenses = [...lastd, { date, category, amount, desc }]
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses))
      setExpenses(updatedExpenses)
    }

    resetForm()
  }

  const handleEditExpense = (index) => {
    const expense = expenses[index]
    setEditExpense(index)

    setFormDate(expense.date)
    setFormCategory(expense.category)
    setFormAmount(expense.amount)
    setFormDesc(expense.desc)

    setOpenModal(true)
  };

  const handleDelExpense = () => {
    const updatedExpenses = expenses.filter((_, item) => item !== editExpense)
    setExpenses(updatedExpenses)
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
        });
    };

    const sortedExpenses = sortExpenses(expenses, sort, order)

  return (
    <>
      <main>
        <section>
          <div className="btn-block">
            <Button onClick={() => setOpenModal(true)}>Добавить</Button>

            <ExpenseSort sort={sort} order={order} setSort={setSort} setOrder={setOrder}/>

            <Modal open={isOpenModal}>
              <h3>{editExpense !== null ? 'Редактировать запись' : 'Добавить запись'}</h3>
              <Button onClick={resetForm}>Закрыть</Button>
              <ExpenseForm onSubmit={handleSave}>
                <label htmlFor="date">Дата</label>
                <input 
                  type="date" 
                  name="date" 
                  id="date" 
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                />

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

                <label htmlFor="amount">Сумма</label>
                <input 
                  type="text" 
                  name="amount" 
                  id="amount" 
                  value={formAmount}
                  onChange={(e) => setFormAmount(e.target.value)}
                />

                <label htmlFor="desc">Описание</label>
                <input 
                  type="text" 
                  name="desc" 
                  id="desc" 
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                />

                <Button type="submit">{editExpense !== null ? 'Обновить' : 'Сохранить'}</Button>

                {editExpense !== null && (
                  <Button onClick={handleDelExpense}>Удалить</Button>
                )}
                

              </ExpenseForm>
            </Modal>
          </div>

          <div className="list-block">
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
        </section>
      </main>
    </>
  )
}

export default App