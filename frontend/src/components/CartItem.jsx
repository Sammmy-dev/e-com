import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { useCurrencyStore } from "../stores/useCurrencyStore";
import { formatCurrency } from "../lib/currency";

const CartItem = ({ item }) => {
	const { removeFromCart, updateQuantity } = useCartStore();
	const { currency } = useCurrencyStore();

	return (
		<div className='rounded-[1.5rem] border border-accent-brownMuted/10 bg-[#fcf8f2] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.05)] md:p-6'>
			<div className='space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0'>
				<div className='shrink-0 md:order-1'>
					<img className='h-24 w-24 rounded-[1rem] object-cover md:h-32 md:w-28' src={item.image} alt={item.name} />
				</div>
				<label className='sr-only'>Choose quantity:</label>

				<div className='flex items-center justify-between md:order-3 md:justify-end'>
					<div className='flex items-center gap-2 rounded-full border border-accent-brownMuted/10 bg-white/80 px-2 py-1'>
						<button
							className='inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border
							 border-neutral-greige/20 bg-neutral-background/20 hover:bg-neutral-background/40 focus:outline-none focus:ring-2
							  focus:ring-primary-olive'
							onClick={() => updateQuantity(item._id, item.quantity - 1)}
						>
							<Minus className='text-accent-brownMuted' size={14} />
						</button>
						<p className="min-w-6 text-center text-sm font-medium text-accent-oliveDark">{item.quantity}</p>
						<button
							className='inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border
							 border-neutral-greige/30 bg-neutral-background/20 hover:bg-neutral-background/40 focus:outline-none 
						focus:ring-2 focus:ring-primary-olive'
							onClick={() => updateQuantity(item._id, item.quantity + 1)}
						>
							<Plus className='text-accent-brownMuted' size={14} />
						</button>
					</div>

					<div className='text-end md:order-4 md:w-32'>
						<p className='text-[11px] font-bold uppercase tracking-[0.18em] text-accent-brownMuted/50'>Price</p>
						<p className='text-lg font-bold text-primary-olive'>{formatCurrency(item.price, currency)}</p>
					</div>
				</div>

				<div className='w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md'>
					<p className='font-serif text-xl font-medium text-accent-oliveDark hover:text-primary-olive hover:underline'>
						{item.name}
					</p>
					<p className='text-sm leading-6 text-neutral-greige'>{item.description}</p>

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
