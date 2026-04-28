import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";
import PageIntro from "../components/PageIntro";
import HomePageButton from "../components/HomePageButton";

const CartPage = () => {
	const { cart } = useCartStore();

	return (
		<div className='relative overflow-hidden bg-[#f7f1e8] py-12 md:py-16'>
			<div className='absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(227,205,181,0.7),_transparent_60%)]' />
			<div className='relative mx-auto max-w-screen-xl px-4 2xl:px-0'>
				<PageIntro
					eyebrow='Esta checkout'
					title='Your Cart'
					description='Review selected pieces, apply your finishing touches, and move through checkout with clarity.'
					className='mb-10'
				/>
				<div className='mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8'>
					<motion.div
						className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl'
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						{cart.length === 0 ? (
							<EmptyCartUI />
						) : (
							<div className='space-y-6 rounded-[2rem] border border-white/60 bg-white/80 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur-sm md:p-6'>
								{cart.map((item) => (
									<CartItem key={item._id} item={item} />
								))}
							</div>
						)}
						{cart.length > 0 && <PeopleAlsoBought />}
					</motion.div>

					{cart.length > 0 && (
						<motion.div
							className='mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full'
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<OrderSummary />
							<GiftCouponCard />
						</motion.div>
					)}
				</div>
			</div>
		</div>
	);
};
export default CartPage;

const EmptyCartUI = () => (
	<motion.div
		className='flex flex-col items-center justify-center space-y-4 rounded-[2rem] border border-white/60 bg-white/80 px-6 py-16 text-center shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur-sm'
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<ShoppingCart className='h-24 w-24 text-neutral-greige/50' />
		<h3 className='text-2xl font-serif font-bold text-accent-brownMuted uppercase tracking-widest'>Your cart is empty</h3>
		<p className='text-accent-brownMuted/70'>Looks like you {"haven't"} added anything to your cart yet.</p>
		<HomePageButton to='/'>Start Shopping</HomePageButton>
	</motion.div>
);
