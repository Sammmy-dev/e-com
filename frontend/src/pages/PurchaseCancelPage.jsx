import { XCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HomePageButton from "../components/HomePageButton";

const PurchaseCancelPage = () => {
	return (
		<div className='relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f1e8] px-4 py-16'>
			<div className='absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(227,205,181,0.7),_transparent_60%)]' />
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='relative z-10 w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/60 bg-white/85 shadow-[0_24px_70px_rgba(0,0,0,0.12)] backdrop-blur-sm'
			>
				<div className='p-6 sm:p-10'>
					<div className='flex justify-center'>
						<XCircle className='mb-4 h-16 w-16 text-primary-terracotta' />
					</div>
					<h1 className='mb-2 text-center font-serif text-3xl font-bold uppercase tracking-[0.12em] text-primary-terracotta sm:text-4xl'>Purchase Cancelled</h1>
					<p className='mb-6 text-center text-accent-brownMuted/70'>
						Your order has been cancelled. No charges have been made.
					</p>
					<div className='mb-6 rounded-[1.5rem] bg-[#f3ebe0] p-5'>
						<p className='text-center text-sm leading-7 text-accent-brownMuted/75'>
							If you encountered any issues during the checkout process, please don&apos;t hesitate to
							contact our support team.
						</p>
					</div>
					<div className='space-y-4'>
						<Link to='/' className='block'>
							<HomePageButton as='span' className='w-full' icon={<ArrowLeft size={18} />}>
								Return to Shop
							</HomePageButton>
						</Link>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default PurchaseCancelPage;
