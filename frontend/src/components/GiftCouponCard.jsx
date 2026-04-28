import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";

const GiftCouponCard = () => {
	const [userInputCode, setUserInputCode] = useState("");
	const { coupon, isCouponApplied, applyCoupon, getMyCoupon, removeCoupon } = useCartStore();

	useEffect(() => {
		getMyCoupon();
	}, [getMyCoupon]);

	useEffect(() => {
		if (coupon) setUserInputCode(coupon.code);
	}, [coupon]);

	const handleApplyCoupon = () => {
		if (!userInputCode) return;
		applyCoupon(userInputCode);
	};

	const handleRemoveCoupon = async () => {
		await removeCoupon();
		setUserInputCode("");
	};

	return (
		<motion.div
			className='space-y-4 rounded-[2rem] border border-white/60 bg-white/85 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:p-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
			<div>
				<p className='mb-2 text-[11px] font-bold uppercase tracking-[0.24em] text-accent-brownMuted/60'>Savings</p>
				<p className='font-serif text-2xl uppercase tracking-[0.12em] text-accent-brownMuted'>Voucher or Gift Card</p>
			</div>
			<div className='space-y-4'>
				<div>
					<label htmlFor='voucher' className='mb-2 block text-sm font-medium text-accent-brownMuted'>
						Do you have a voucher or gift card?
					</label>
					<input
						type='text'
						id='voucher'
						className='block w-full rounded-full border border-neutral-greige/20 bg-[#f8f2e9] p-3 text-sm text-accent-oliveDark placeholder-neutral-greige focus:border-primary-olive 
            focus:ring-primary-olive'
						placeholder='Enter code here'
						value={userInputCode}
						onChange={(e) => setUserInputCode(e.target.value)}
						required
					/>
				</div>

				<motion.button
					type='button'
					className='flex w-full items-center justify-center rounded-full bg-primary-olive px-5 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-[0_16px_35px_rgba(78,90,55,0.24)] hover:bg-accent-oliveDark focus:outline-none focus:ring-4 focus:ring-primary-olive/50'
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.95 }}
					onClick={handleApplyCoupon}
				>
					Apply Code
				</motion.button>
			</div>
			{isCouponApplied && coupon && (
				<div className='mt-4 rounded-[1.5rem] bg-[#f8f2e9] p-4'>
					<h3 className='text-lg font-medium text-accent-brownMuted'>Applied Coupon</h3>

					<p className='mt-2 text-sm text-neutral-greige'>
						{coupon.code} - {coupon.discountPercentage}% off
					</p>

					<motion.button
						type='button'
						className='mt-3 flex w-full items-center justify-center rounded-full bg-primary-terracotta/10 border border-primary-terracotta/30
            px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-terracotta hover:bg-primary-terracotta hover:text-white transition-colors duration-200 focus:outline-none'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.95 }}
						onClick={handleRemoveCoupon}
					>
						Remove Coupon
					</motion.button>
				</div>
			)}

			{coupon && (
				<div className='mt-4 rounded-[1.5rem] border border-accent-brownMuted/10 bg-[#fcf8f2] p-4'>
					<h3 className='text-lg font-medium text-accent-brownMuted'>Your Available Coupon:</h3>
					<p className='mt-2 text-sm text-neutral-greige'>
						{coupon.code} - {coupon.discountPercentage}% off
					</p>
				</div>
			)}
		</motion.div>
	);
};
export default GiftCouponCard;
