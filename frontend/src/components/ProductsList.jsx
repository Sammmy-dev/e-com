import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { useCurrencyStore } from "../stores/useCurrencyStore";
import { formatCurrency } from "../lib/currency";

const categoryLabels = {
	asoebi: "Aso-Ebi & Occasions",
	chic: "Everyday Chic",
	bridal: "Bridal & Luxury",
};

const ProductsList = () => {
	const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();
	const { currency } = useCurrencyStore();

	return (
		<motion.div
			className='mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] border border-accent-brownMuted/10 bg-[#fcf8f2] shadow-[0_18px_50px_rgba(0,0,0,0.05)]'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<div className='border-b border-accent-brownMuted/10 px-6 py-5'>
				<p className='mb-2 text-[11px] font-bold uppercase tracking-[0.24em] text-accent-brownMuted/60'>Inventory</p>
				<h2 className='font-serif text-2xl uppercase tracking-[0.12em] text-accent-brownMuted'>Products</h2>
			</div>
			<div className='overflow-x-auto'>
			<table className='min-w-full divide-y divide-neutral-greige/20'>
				<thead className='bg-[#f3ebe0]'>
					<tr>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-neutral-greige uppercase tracking-wider'
						>
							Product
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-neutral-greige uppercase tracking-wider'
						>
							Price
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-neutral-greige uppercase tracking-wider'
						>
							Category
						</th>

						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-neutral-greige uppercase tracking-wider'
						>
							Featured
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-neutral-greige uppercase tracking-wider'
						>
							Actions
						</th>
					</tr>
				</thead>

				<tbody className='divide-y divide-neutral-greige/20 bg-white/60'>
					{products?.map((product) => (
						<tr key={product._id} className='transition hover:bg-[#f8f2e9]'>
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='flex items-center'>
									<div className='h-12 w-12 flex-shrink-0'>
										<img
											className='h-12 w-12 rounded-[0.9rem] object-cover'
											src={product.image}
											alt={product.name}
										/>
									</div>
									<div className='ml-4'>
										<div className='text-sm font-medium text-accent-oliveDark'>{product.name}</div>
									</div>
								</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='text-sm text-neutral-greige'>{formatCurrency(product.price, currency)}</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='text-sm text-neutral-greige'>{categoryLabels[product.category] || product.category}</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								<button
									onClick={() => toggleFeaturedProduct(product._id)}
									className={`p-2 rounded-full transition-colors duration-200 ${
										product.isFeatured ? "bg-primary-terracotta text-white" : "bg-neutral-greige/20 text-neutral-greige"
									} hover:bg-primary-terracotta hover:text-white transition-colors duration-200`}
								>
									<Star className='h-5 w-5' />
								</button>
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
								<button
									onClick={() => deleteProduct(product._id)}
									className='rounded-full bg-primary-terracotta/10 p-2 text-primary-terracotta transition hover:bg-primary-terracotta hover:text-white'
								>
									<Trash className='h-5 w-5' />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			</div>
		</motion.div>
	);
};
export default ProductsList;
