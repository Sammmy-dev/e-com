import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();
	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		} else {
			// add to cart
			addToCart(product);
		}
	};

	return (
		<div className='flex w-full relative flex-col overflow-hidden rounded-sm border border-neutral-greige/20 bg-white shadow-sm'>
			<div className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-sm'>
				<img className='object-cover w-full' src={product.image} alt='product image' />
				<div className='absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300' />
			</div>

			<div className='mt-4 px-5 pb-5'>
				<h5 className='text-lg font-bold tracking-tight text-accent-brownMuted uppercase font-serif'>{product.name}</h5>
				<div className='mt-2 mb-5 flex items-center justify-between'>
					<p>
						<span className='text-xl font-bold text-primary-olive'>${product.price}</span>
					</p>
				</div>
				<button
					className='flex items-center justify-center rounded-sm bg-primary-olive px-5 py-2.5 text-center text-xs font-bold uppercase tracking-widest
					 text-white hover:bg-accent-oliveDark focus:outline-none focus:ring-4 focus:ring-primary-olive/50 transition-colors duration-300'
					onClick={handleAddToCart}
				>
					<ShoppingCart size={18} className='mr-2' />
					Add to cart
				</button>
			</div>
		</div>
	);
};
export default ProductCard;
