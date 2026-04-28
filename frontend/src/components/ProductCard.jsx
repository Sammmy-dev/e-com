import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useCurrencyStore } from "../stores/useCurrencyStore";
import { formatCurrency } from "../lib/currency";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();
	const { currency } = useCurrencyStore();
	const formattedPrice = formatCurrency(product.price || 0, currency);

	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		} else {
			addToCart(product);
		}
	};

	return (
		<div className='group relative flex w-full flex-col overflow-hidden rounded-[1.75rem] border border-accent-brownMuted/10 bg-white/90 p-3 shadow-[0_18px_45px_rgba(0,0,0,0.08)] transition duration-500 hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)]'>
			<div className='relative flex h-72 overflow-hidden rounded-[1.25rem] bg-[#efe7dc]'>
				<img className='h-full w-full object-cover transition duration-700 group-hover:scale-105' src={product.image} alt={product.name} />
				<div className='absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70 transition duration-500 group-hover:opacity-90' />
				{product.isFeatured && (
					<div className='absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm'>
						Featured
					</div>
				)}
			</div>

			<div className='flex flex-1 flex-col px-3 pb-3 pt-5'>
				<div className='flex items-start justify-between gap-4'>
					<div>
						<h5 className='text-xl font-serif uppercase tracking-[0.08em] text-accent-brownMuted'>
							{product.name}
						</h5>
					</div>
					<p className='shrink-0 rounded-full bg-[#f4ecdf] px-4 py-2 text-sm font-bold uppercase tracking-[0.14em] text-primary-olive'>
						{formattedPrice}
					</p>
				</div>

				<button
					className='mt-6 inline-flex items-center justify-center gap-3 rounded-full border border-accent-oliveDark bg-accent-oliveDark px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.22em] text-white shadow-[0_16px_35px_rgba(78,90,55,0.24)] transition duration-300 hover:border-primary-olive hover:bg-primary-olive hover:shadow-[0_22px_40px_rgba(78,90,55,0.3)] focus:outline-none focus:ring-4 focus:ring-primary-olive/30'
					onClick={handleAddToCart}
				>
					<ShoppingCart size={17} />
					Add to cart
				</button>
			</div>
		</div>
	);
};
export default ProductCard;
