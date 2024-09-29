import classes from './ExpenseList.module.css'

export default function ExpenseList({ date, category, amount, desc, onClick}) {
    return (
        <>
            <tr onClick={onClick} className={classes}>
                <td>{date}</td>
                <td>{category}</td>
                <td>{amount}</td>
                <td>{desc}</td>
            </tr>
        </>
    )
}