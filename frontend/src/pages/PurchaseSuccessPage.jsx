import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import Confetti from "react-confetti";

const PurchaseSuccessPage = () => {
	const [isProcessing, setIsProcessing] = useState(true);
	const { clearCart } = useCartStore();
	const [error, setError] = useState(null);

	useEffect(() => {
		const handleCheckoutSuccess = async (sessionId) => {
			try {
				await axios.post("/payments/checkout-success", {
					sessionId,
				});
				clearCart();
			} catch (error) {
				console.log(error);
			} finally {
				setIsProcessing(false);
			}
		};

		const sessionId = new URLSearchParams(window.location.search).get("session_id");
		if (sessionId) {
			handleCheckoutSuccess(sessionId);
		} else {
			setIsProcessing(false);
			setError("No session ID found in the URL");
		}
	}, [clearCart]);

	if (isProcessing) return "Processing...";

	if (error) return `Error: ${error}`;

	return (
		<div className='h-screen flex items-center justify-center px-4'>
			<Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				gravity={0.1}
				style={{ zIndex: 99 }}
				numberOfPieces={700}
				recycle={false}
                colors={['#6B7447', '#A45A3F', '#E3CDB5', '#D9C7AE']}
			/>

			<div className='max-w-md w-full bg-white border border-neutral-greige/20 rounded-sm shadow-xl overflow-hidden relative z-10'>
				<div className='p-6 sm:p-8'>
					<div className='flex justify-center'>
						<CheckCircle className='text-primary-olive w-16 h-16 mb-4' />
					</div>
					<h1 className='text-2xl sm:text-3xl font-bold text-center text-primary-olive mb-2 font-serif'>
						Purchase Successful!
					</h1>

					<p className='text-accent-oliveDark text-center mb-2'>
						Thank you for your order. {"We're"} processing it now.
					</p>
					<p className='text-primary-terracotta text-center text-sm mb-6'>
						Check your email for order details and updates.
					</p>
					<div className='bg-neutral-background/20 rounded-sm p-4 mb-6 border border-neutral-greige/10'>
						<div className='flex items-center justify-between mb-2'>
							<span className='text-sm text-neutral-greige'>Order number</span>
							<span className='text-sm font-semibold text-primary-olive'>#12345</span>
						</div>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-neutral-greige'>Estimated delivery</span>
							<span className='text-sm font-semibold text-primary-olive'>3-5 business days</span>
						</div>
					</div>

					<div className='space-y-4'>
						<button
							className='w-full bg-primary-olive hover:bg-accent-oliveDark text-white font-bold py-3 px-4
             rounded-sm transition duration-300 flex items-center justify-center uppercase tracking-widest text-xs'
						>
							<HandHeart className='mr-2' size={18} />
							Thanks for trusting us!
						</button>
						<Link
							to={"/"}
							className='w-full bg-neutral-background/20 hover:bg-neutral-background/40 text-primary-olive font-bold py-3 px-4 
            rounded-sm transition duration-300 flex items-center justify-center uppercase tracking-widest text-xs'
						>
							Continue Shopping
							<ArrowRight className='ml-2' size={18} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
export default PurchaseSuccessPage;
