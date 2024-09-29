import './App.css';
import { useEffect, useState } from "react"
import ExpenseList from "./components/ExpenseList/ExpenseList"
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";

function App() {
  const [expenses, setExpenses] = useState([])
  const [isOpenModal, setOpenModal] = useState(false)

  useEffect(() => {
      const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
      setExpenses(storedExpenses);
  }, [setExpenses]); 

  const handleSave = (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const date = formData.get('date');
      const category = formData.get('category');
      const amount = formData.get('amount');
      const desc = formData.get('desc');

      const lastd = JSON.parse(localStorage.getItem('expenses')) || [];
      const updatedExpenses = [...lastd, { date, category, amount, desc }];
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses));

      setExpenses(updatedExpenses);
      setOpenModal(false);
  }

  return (
    <>
      <main>
        <section>
          <div className="btn-block">
            <Button onClick={() => setOpenModal(true)}>Добавить</Button>
              <Modal open={isOpenModal}>
                    <h3>Добавить запись</h3>
                    <Button onClick={() => setOpenModal(false)}>Закрыть</Button>
                    <ExpenseForm  onSubmit={handleSave}>
                        <label htmlFor="date">Дата</label>
                        <input type="date" name="date" id="date"/>

                        <label htmlFor="category">Категория</label>
                        <select name="category" id="category">
                            <option value="products">Продукты</option>
                            <option value="transport">Транспорт</option>
                            <option value="recreation">Развлечение</option>
                        </select>

                        <label htmlFor="amount">Сумма</label>
                        <input type="text" name="amount" id="amount"/>

                        <label htmlFor="desc">Описание</label>
                        <input type="text" name="desc" id="desc"/>

                        <Button type="submit">Сохранить</Button>
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
                        {expenses.map((expense, index) => (
                            <ExpenseList
                                key={index}
                                date={expense.date}
                                category={expense.category}
                                amount={expense.amount}
                                desc={expense.desc}
                            />
                        ))}
                    </tbody>
                </table>
          </div>
        </section>

        <section>
          
        </section>
      </main>
    </>
  );
}

export default App;