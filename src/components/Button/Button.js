import classes from "./Button.module.css"

export default function Button({children, isActive, ... props}) {
    return (
        <button {... props} className={classes.button}>{children}</button>
    )
}