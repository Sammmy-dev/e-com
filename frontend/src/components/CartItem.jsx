import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
	const { removeFromCart, updateQuantity } = useCartStore();

	return (
		<div className='rounded-sm border p-4 shadow-sm border-neutral-greige/20 bg-white md:p-6'>
			<div className='space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0'>
				<div className='shrink-0 md:order-1'>
					<img className='h-20 md:h-32 rounded object-cover' src={item.image} />
				</div>
				<label className='sr-only'>Choose quantity:</label>

				<div className='flex items-center justify-between md:order-3 md:justify-end'>
					<div className='flex items-center gap-2'>
						<button
							className='inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border
							 border-neutral-greige/30 bg-neutral-background/20 hover:bg-neutral-background/40 focus:outline-none focus:ring-2
							  focus:ring-primary-olive'
							onClick={() => updateQuantity(item._id, item.quantity - 1)}
						>
							<Minus className='text-accent-brownMuted' size={14} />
						</button>
						<p className="text-accent-oliveDark font-medium text-sm">{item.quantity}</p>
						<button
							className='inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border
							 border-neutral-greige/30 bg-neutral-background/20 hover:bg-neutral-background/40 focus:outline-none 
						focus:ring-2 focus:ring-primary-olive'
							onClick={() => updateQuantity(item._id, item.quantity + 1)}
						>
							<Plus className='text-accent-brownMuted' size={14} />
						</button>
					</div>

					<div className='text-end md:order-4 md:w-32'>
						<p className='text-base font-bold text-primary-olive'>${item.price}</p>
					</div>
				</div>

				<div className='w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md'>
					<p className='text-base font-medium text-accent-oliveDark hover:text-primary-olive hover:underline font-serif'>
						{item.name}
					</p>
					<p className='text-sm text-neutral-greige'>{item.description}</p>

					<div className='flex items-center gap-4'>
						<button
							className='inline-flex items-center text-xs font-bold uppercase tracking-widest text-primary-terracotta
							 hover:text-primary-terracotta/80 hover:underline'
							onClick={() => removeFromCart(item._id)}
						>
							<Trash className='mr-1.5 h-4 w-4' />
							Remove
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default CartItem;
