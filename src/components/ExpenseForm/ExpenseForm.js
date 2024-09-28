import classes from './ExpenseForm.module.css'

export default function ExpenseForm({children}) {
    return (
        <form className={classes.form}>{children}</form>
    )
}