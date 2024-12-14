import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from 'recharts';

const data = [
    {
        name: 'Okt',
        uv: 2100,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Nov',
        uv: 1500,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Des',
        uv: 3700,
        pv: 2400,
        amt: 2400,
    }
];

const UserChart = () => {
    return (
        <ResponsiveContainer className="min-w-[40vw] aspect-square ">
            <BarChart width={150} height={40} data={data}>
                <XAxis dataKey="name" tick={{ fill: "#7e22ce" }} />
                <Tooltip />
                <Bar dataKey="uv" fill="#7e22ce" />
            </BarChart>
        </ResponsiveContainer>
    );
}
export default UserChart