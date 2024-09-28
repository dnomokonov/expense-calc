export default function ExpenseList({expenses}) {
    return (
        <>
            {expenses.map((expense, index) => {
                <tr key={index}>
                    <td>{expense.data}</td>
                    <td>{expense.category}</td>
                    <td>{expense.cost}</td>
                    <td>{expense.disc}</td>
                </tr>
            })}
        </>
    )
}