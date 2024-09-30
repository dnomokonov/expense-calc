import { useEffect, useState } from 'react'
import classes from './ExpenseFilters.module.css'
import Button from '../Button/Button'

export default function ExpenseFilter({onChangeFilter}) {
    const [isOpen, setOpen] = useState(false)
    const [filters, setFilters] = useState({
        products: false,
        transport: false,
        recreation: false
    })

    const toggle = () => {
        setOpen(!isOpen)
    }

    const changeFilter = (event) => {
        const name = event.target.name
        const check = event.target.checked

        setFilters({
            ...filters,
            [name]: check
        })
    }

    useEffect(() => {
        onChangeFilter(filters)
    }, [filters])

    return (
        <div className={classes.filterblock}>
            <Button onClick={toggle} className={classes.togglebtn}>Фильтры</Button>

            {isOpen && (
                <div className={classes.dropdown}>
                    <div>
                        <input type="checkbox" name="products" id="products" onChange={changeFilter} checked={filters.products}/>
                        <label htmlFor="products">Продукты</label>
                    </div>
                    
                    <div>
                        <input type="checkbox" name="transport" id="transport" onChange={changeFilter} checked={filters.transport}/>
                        <label htmlFor="transport">Транспорт</label>
                    </div>
                    
                    <div>
                        <input type="checkbox" name="recreation" id="recreation" onChange={changeFilter} checked={filters.recreation}/>
                        <label htmlFor="recreation">Развлечение</label>
                    </div>
                </div>
            )}
        </div>
    );
}