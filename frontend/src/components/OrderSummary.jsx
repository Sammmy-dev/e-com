import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";
import { useCurrencyStore } from "../stores/useCurrencyStore";
import { formatCurrency } from "../lib/currency";

// Use environment variable instead of hardcoded key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_your_publishable_key_here");

const OrderSummary = () => {
	const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();
	const { currency } = useCurrencyStore();

	const savings = subtotal - total;
	const formattedSubtotal = formatCurrency(subtotal, currency);
	const formattedTotal = formatCurrency(total, currency);
	const formattedSavings = formatCurrency(savings, currency);

	const handlePayment = async () => {
		const stripe = await stripePromise;
		const res = await axios.post("/payments/create-checkout-session", {
			products: cart,
			couponCode: coupon ? coupon.code : null,
				currency,
		});

		const session = res.data;
		const result = await stripe.redirectToCheckout({
			sessionId: session.id,
		});

		if (result.error) {
			console.error("Error:", result.error);
		}
	};

	return (
		<motion.div
			className='space-y-5 rounded-[2rem] border border-white/60 bg-white/85 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:p-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div>
				<p className='mb-2 text-[11px] font-bold uppercase tracking-[0.24em] text-accent-brownMuted/60'>Checkout</p>
				<p className='font-serif text-2xl uppercase tracking-[0.12em] text-accent-brownMuted'>Order Summary</p>
			</div>

			<div className='space-y-4'>
				<div className='space-y-3 rounded-[1.5rem] bg-[#f8f2e9] p-5'>
					<dl className='flex items-center justify-between gap-4'>
						<dt className='text-base font-normal text-neutral-greige'>Original price</dt>
						<dd className='text-base font-medium text-accent-oliveDark'>{formattedSubtotal}</dd>
					</dl>

					{savings > 0 && (
						<dl className='flex items-center justify-between gap-4'>
							<dt className='text-base font-normal text-neutral-greige'>Savings</dt>
							<dd className='text-base font-medium text-primary-olive'>{formattedSavings}</dd>
						</dl>
					)}

					{coupon && isCouponApplied && (
						<dl className='flex items-center justify-between gap-4'>
							<dt className='text-base font-normal text-neutral-greige'>Coupon ({coupon.code})</dt>
							<dd className='text-base font-medium text-primary-olive'>-{coupon.discountPercentage}%</dd>
						</dl>
					)}
					<dl className='flex items-center justify-between gap-4 border-t border-neutral-greige/20 pt-3'>
						<dt className='text-base font-bold text-accent-oliveDark'>Total</dt>
						<dd className='text-base font-bold text-primary-olive'>{formattedTotal}</dd>
					</dl>
				</div>

				<motion.div
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.95 }}
				>
					<button
						className='flex w-full items-center justify-center rounded-full bg-primary-olive px-5 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-[0_16px_35px_rgba(78,90,55,0.24)] hover:bg-accent-oliveDark focus:outline-none focus:ring-4 focus:ring-primary-olive/50'
						onClick={handlePayment}
					>
						Proceed to Checkout
					</button>
				</motion.div>

				<div className='flex items-center justify-center gap-2 text-sm'>
					<span className='font-normal text-neutral-greige'>or</span>
					<Link to='/' className='inline-flex items-center gap-2 font-medium text-primary-olive underline hover:text-accent-oliveDark hover:no-underline'>
						Continue Shopping
						<MoveRight size={16} />
					</Link>
				</div>
			</div>
		</motion.div>
	);
};
export default OrderSummary;
