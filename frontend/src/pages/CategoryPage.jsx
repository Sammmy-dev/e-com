import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import PageIntro from "../components/PageIntro";

const categoryMeta = {
	asoebi: {
		eyebrow: "Esta edit",
		title: "Aso-Ebi & Occasions",
		description: "Celebration-ready looks with strong ceremonial presence, rich texture, and elegant structure.",
	},
	chic: {
		eyebrow: "Esta edit",
		title: "Everyday Chic",
		description: "Soft tailoring, modern silhouettes, and polished wardrobe staples shaped for everyday elegance.",
	},
	bridal: {
		eyebrow: "Esta edit",
		title: "Bridal & Luxury",
		description: "Elevated occasionwear, graceful volume, and luxurious finishing details for standout moments.",
	},
};

const CategoryPage = () => {
	const { fetchProductsByCategory, products } = useProductStore();

	const { category } = useParams();
	const meta =
		categoryMeta[category] || {
			eyebrow: "Esta collection",
			title: category.charAt(0).toUpperCase() + category.slice(1),
			description: "Curated pieces from the latest Esta collection.",
		};

	useEffect(() => {
		fetchProductsByCategory(category);
	}, [fetchProductsByCategory, category]);

	return (
		<div className='relative min-h-screen overflow-hidden bg-[#f7f1e8] py-16'>
			<div className='absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(227,205,181,0.7),_transparent_60%)]' />
			<div className='relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
				<motion.h1
					className='mb-12'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<PageIntro eyebrow={meta.eyebrow} title={meta.title} description={meta.description} />
				</motion.h1>

				<motion.div
					className='rounded-[2rem] border border-white/60 bg-white/80 px-5 py-8 shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur-sm'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					<div className='grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
						{products?.length === 0 && (
							<h2 className='col-span-full py-20 text-center text-2xl font-serif uppercase tracking-[0.12em] text-accent-brownMuted/60'>
								No products found
							</h2>
						)}

						{products?.map((product) => (
							<ProductCard key={product._id} product={product} />
						))}
					</div>
				</motion.div>
			</div>
		</div>
	);
};
export default CategoryPage;
