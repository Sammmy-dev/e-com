import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import Confetti from "react-confetti";
import HomePageButton from "../components/HomePageButton";

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
		<div className='relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f1e8] px-4 py-16'>
			<div className='absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(227,205,181,0.7),_transparent_60%)]' />
			<Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				gravity={0.1}
				style={{ zIndex: 99 }}
				numberOfPieces={700}
				recycle={false}
                colors={['#6B7447', '#A45A3F', '#E3CDB5', '#D9C7AE']}
			/>

			<div className='relative z-10 w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/60 bg-white/85 shadow-[0_24px_70px_rgba(0,0,0,0.12)] backdrop-blur-sm'>
				<div className='p-6 sm:p-10'>
					<div className='flex justify-center'>
						<CheckCircle className='text-primary-olive w-16 h-16 mb-4' />
					</div>
					<h1 className='mb-2 text-center font-serif text-3xl font-bold uppercase tracking-[0.12em] text-primary-olive sm:text-4xl'>
						Purchase Successful!
					</h1>

					<p className='text-accent-oliveDark text-center mb-2'>
						Thank you for your order. {"We're"} processing it now.
					</p>
					<p className='text-primary-terracotta text-center text-sm mb-6'>
						Check your email for order details and updates.
					</p>
					<div className='mb-6 rounded-[1.5rem] border border-neutral-greige/10 bg-neutral-background/25 p-5'>
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
						<button className='flex w-full items-center justify-center rounded-full bg-primary-olive px-4 py-3 text-xs font-bold uppercase tracking-widest text-white transition duration-300 hover:bg-accent-oliveDark'>
							<HandHeart className='mr-2' size={18} />
							Thanks for trusting us!
						</button>
						<HomePageButton to='/' icon={<ArrowRight size={18} />} className='w-full'>
							Continue Shopping
						</HomePageButton>
					</div>
				</div>
			</div>
		</div>
	);
};
export default PurchaseSuccessPage;
