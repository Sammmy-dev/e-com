import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useCurrencyStore } from "../stores/useCurrencyStore";
import { formatCurrency } from "../lib/currency";

const AnalyticsTab = () => {
	const [analyticsData, setAnalyticsData] = useState({
		users: 0,
		products: 0,
		totalSales: 0,
		totalRevenue: 0,
	});
	const [isLoading, setIsLoading] = useState(true);
	const [dailySalesData, setDailySalesData] = useState([]);
	const { currency } = useCurrencyStore();

	useEffect(() => {
		const fetchAnalyticsData = async () => {
			try {
				const response = await axios.get("/analytics");
				setAnalyticsData(response.data.analyticsData);
				setDailySalesData(response.data.dailySalesData);
			} catch (error) {
				console.error("Error fetching analytics data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAnalyticsData();
	}, []);

	if (isLoading) {
		return <div className='py-16 text-center text-accent-brownMuted/60'>Loading analytics...</div>;
	}

	return (
		<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
			<div className='mb-8 text-center'>
				<p className='mb-2 text-[11px] font-bold uppercase tracking-[0.24em] text-accent-brownMuted/60'>Performance</p>
				<h2 className='font-serif text-3xl uppercase tracking-[0.12em] text-accent-brownMuted'>Store Analytics</h2>
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
				<AnalyticsCard
					title='Total Users'
					value={analyticsData.users.toLocaleString()}
					icon={Users}
				/>
				<AnalyticsCard
					title='Total Products'
					value={analyticsData.products.toLocaleString()}
					icon={Package}
				/>
				<AnalyticsCard
					title='Total Sales'
					value={analyticsData.totalSales.toLocaleString()}
					icon={ShoppingCart}
				/>
				<AnalyticsCard
					title='Total Revenue'
					value={formatCurrency(analyticsData.totalRevenue, currency)}
					icon={DollarSign}
				/>
			</div>
			<motion.div
				className='relative rounded-[1.75rem] border border-white/60 bg-white/85 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur-sm'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.25 }}
			>
				<div className='mb-6'>
					<p className='mb-2 text-[11px] font-bold uppercase tracking-[0.24em] text-accent-brownMuted/60'>Sales activity</p>
					<h3 className='font-serif text-2xl uppercase tracking-[0.12em] text-accent-brownMuted'>Revenue Overview</h3>
				</div>
				<ResponsiveContainer width='100%' height={400}>
					<LineChart data={dailySalesData}>
						<CartesianGrid strokeDasharray='3 3' stroke="#ECE0D1" />
						<XAxis dataKey='name' stroke='#8D8D8D' />
						<YAxis yAxisId='left' stroke='#8D8D8D' />
						<YAxis yAxisId='right' orientation='right' stroke='#8D8D8D' tickFormatter={(value) => formatCurrency(value, currency)} />
						<Tooltip
							contentStyle={{ backgroundColor: "#F7F5F0", borderColor: "#D9C7AE", color: "#6B7447" }}
							itemStyle={{ color: "#6B7447" }}
							formatter={(value, name) =>
								name === "Revenue" ? formatCurrency(value, currency) : value.toLocaleString()
							}
						/>
						<Legend />
						<Line
							yAxisId='left'
							type='monotone'
							dataKey='sales'
							stroke='#6B7447'
							activeDot={{ r: 8 }}
							name='Sales'
						/>
						<Line
							yAxisId='right'
							type='monotone'
							dataKey='revenue'
							stroke='#A45A3F'
							activeDot={{ r: 8 }}
							name='Revenue'
						/>
					</LineChart>
				</ResponsiveContainer>
			</motion.div>
		</div>
	);
};
export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon }) => (
	<motion.div
		className='relative overflow-hidden rounded-[1.5rem] border border-accent-brownMuted/10 bg-[#fcf8f2] p-6 shadow-[0_12px_30px_rgba(0,0,0,0.05)]'
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<div className='flex justify-between items-center relative z-10'>
			<div className=''>
				<p className='mb-1 text-xs font-semibold uppercase tracking-widest text-neutral-greige'>{title}</p>
				<h3 className='my-2 font-serif text-3xl font-bold text-primary-olive'>{value}</h3>
			</div>
			<div className='inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-olive/10 text-primary-olive'>
				<Icon className='h-6 w-6' />
			</div>
		</div>
		<div className='absolute -bottom-5 -right-5 text-primary-olive opacity-10'>
			<Icon className='h-32 w-32' />
		</div>
	</motion.div>
);
