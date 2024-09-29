import classes from './ExpenseForm.module.css'

export default function ExpenseForm({children, action, ...props}) {
    return (
        <form action={action} {...props} className={classes.form}>{children}</form>
    )
}