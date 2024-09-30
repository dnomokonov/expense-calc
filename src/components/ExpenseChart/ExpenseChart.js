import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, BarChart, PieChart, Tooltip, Legend } from "recharts"

export default function ExpenseChart({expdata, type}) {

    const data = expdata.map((expense) => ({
        date: expense.date,
        category: expense.category,
        amount: expense.amount
    }))

    console.log(data)

    return (
        <ResponsiveContainer width="70%" height={400}>
            {type === 'line' && (
                <LineChart 
                    width={500} 
                    height={300} 
                    data={data} 
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category"/>
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                </LineChart>
            )}

            {type === 'bar' && (
                <BarChart>

                </BarChart>
            )}

            {type === 'pie' && (
                <PieChart>

                </PieChart>
            )}

        </ResponsiveContainer>
    )
}