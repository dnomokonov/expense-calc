import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, BarChart, PieChart, Pie, Cell, Tooltip, Legend } from "recharts"

export default function ExpenseChart({expdata, type}) {

    const data = expdata.map((expense) => ({
        date: new Date(expense.date).toLocaleDateString(),
        category: expense.category,
        amount: parseFloat(expense.amount)
    })).sort((a, b) => new Date(a.date) - new Date(b.date))

    const dataPie = expdata.reduce((acc, exp) => {
        const categrow = acc.find(item => item.name === exp.category)
        
        if (categrow) {
            categrow.count += 1
        } else {
            acc.push({name: exp.category, count: 1})
        }

        return acc
    }, [])

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const sin = Math.sin(-RADIAN * midAngle)
        const cos = Math.cos(-RADIAN * midAngle)

        const radius = innerRadius + (outerRadius - innerRadius) * 0.5
        const x = cx + radius * cos
        const y = cy + radius * sin
        const tx = cx + radius * cos * 2.5
        const ty = cy + radius * sin * 2.4

        return (
            <g>
                <text x={tx} y={ty} fill={COLORS[index % COLORS.length]} textAnchor={x > cx ? 'start' : 'end'}>{dataPie[index].name}</text>
                <path d={`M${tx},${ty}L${x},${y}L${x},${y}`} stroke={COLORS[index % COLORS.length]} fill="none"/>
                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
                </text>
            </g>
        )
    }

    return (
        <ResponsiveContainer width="50%" height={350}>
            {type === 'line' && (
                <LineChart
                    data={data} 
                    margin={{
                      top: 5,
                      right: 40,
                      left: -10,
                      bottom: 5,
                    }}  
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="amount" name="Расходы" stroke="#8884d8" />
                </LineChart>
            )}

            {type === 'pie' && (
                <PieChart>
                    <Pie
                      data={dataPie}
                      dataKey="count"
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={100}
                      fill="#8884d8"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            )}

        </ResponsiveContainer>
    )
}