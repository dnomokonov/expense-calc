import classes from './ExpenseFilters.module.css'

export default function ExpenseSort({sort, setSort, order, setOrder}) {
    const sortChange = (event) => {
        const value = event.target.value;
        const [newSort, newOrder] = value.split('-')
        
        setSort(newSort)
        setOrder(newOrder);
    }
    
    return (
        <div className={classes.sortblock}>
            <label>Сортировать по</label>
            <select value={`${sort}-${order}`} onChange={sortChange}>
                <option value="date-desc">Дата | Убывание</option>
                <option value="date-asc">Дата | Возрастание</option>
                <option value="amount-desc">Сумма | Убывание</option>
                <option value="amount-asc">Сумма | Возрастание</option>
            </select>
        </div>
    )
}