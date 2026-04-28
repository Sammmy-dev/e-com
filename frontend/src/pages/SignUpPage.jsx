import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";
import PageIntro from "../components/PageIntro";

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const { signup, loading } = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		signup(formData);
	};

	return (
		<div className='relative min-h-[80vh] overflow-hidden bg-[#f7f1e8] px-4 py-16 sm:px-6 lg:px-8'>
			<div className='absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(227,205,181,0.7),_transparent_60%)]' />
			<div className='mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center'>
			<motion.div
				className='lg:max-w-lg'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<PageIntro
					eyebrow='Join Esta'
					title='Create Account'
					description='Set up your account to save your cart, shop new edits faster, and keep track of every Esta purchase.'
					align='left'
				/>
			</motion.div>

			<motion.div
				className='lg:justify-self-end lg:w-full lg:max-w-xl'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
				<div className='rounded-[2rem] border border-white/60 bg-white/80 px-5 py-8 shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:px-10'>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div>
							<label htmlFor='name' className='block text-xs font-bold uppercase tracking-widest text-accent-brownMuted mb-2'>
								Full name
							</label>
							<div className='mt-1 relative'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<User className='h-5 w-5 text-neutral-greige' aria-hidden='true' />
								</div>
								<input
									id='name'
									type='text'
									required
									value={formData.name}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
									className='block w-full rounded-full border border-accent-brownMuted/10 bg-[#f8f2e9] px-4 py-3 pl-10 shadow-sm
									 placeholder-neutral-greige focus:outline-none focus:ring-primary-olive 
									 focus:border-primary-olive sm:text-sm text-accent-oliveDark'
									placeholder='John Doe'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='email' className='block text-xs font-bold uppercase tracking-widest text-accent-brownMuted mb-2'>
								Email address
							</label>
							<div className='mt-1 relative'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Mail className='h-5 w-5 text-neutral-greige' aria-hidden='true' />
								</div>
								<input
									id='email'
									type='email'
									required
									value={formData.email}
									onChange={(e) => setFormData({ ...formData, email: e.target.value })}
									className='block w-full rounded-full border border-accent-brownMuted/10 bg-[#f8f2e9] px-4 py-3 pl-10 shadow-sm
									 placeholder-neutral-greige focus:outline-none focus:ring-primary-olive 
									 focus:border-primary-olive sm:text-sm text-accent-oliveDark'
									placeholder='you@example.com'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='password' className='block text-xs font-bold uppercase tracking-widest text-accent-brownMuted mb-2'>
								Password
							</label>
							<div className='mt-1 relative'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-neutral-greige' aria-hidden='true' />
								</div>
								<input
									id='password'
									type='password'
									required
									value={formData.password}
									onChange={(e) => setFormData({ ...formData, password: e.target.value })}
									className='block w-full rounded-full border border-accent-brownMuted/10 bg-[#f8f2e9] px-4 py-3 pl-10 shadow-sm placeholder-neutral-greige focus:outline-none focus:ring-primary-olive focus:border-primary-olive sm:text-sm text-accent-oliveDark'
									placeholder='••••••••'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='confirmPassword' className='block text-xs font-bold uppercase tracking-widest text-accent-brownMuted mb-2'>
								Confirm Password
							</label>
							<div className='mt-1 relative'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-neutral-greige' aria-hidden='true' />
								</div>
								<input
									id='confirmPassword'
									type='password'
									required
									value={formData.confirmPassword}
									onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
									className='block w-full rounded-full border border-accent-brownMuted/10 bg-[#f8f2e9] px-4 py-3 pl-10 shadow-sm placeholder-neutral-greige focus:outline-none focus:ring-primary-olive focus:border-primary-olive sm:text-sm text-accent-oliveDark'
									placeholder='••••••••'
								/>
							</div>
						</div>

						<button
							type='submit'
							className='w-full flex justify-center rounded-full border border-transparent px-4 py-3 shadow-[0_16px_35px_rgba(78,90,55,0.24)] text-xs font-bold uppercase tracking-widest text-white bg-primary-olive
							 hover:bg-accent-oliveDark focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-primary-olive transition duration-150 ease-in-out disabled:opacity-50'
							disabled={loading}
						>
							{loading ? (
								<>
									<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
									Loading...
								</>
							) : (
								<>
									<UserPlus className='mr-2 h-5 w-5' aria-hidden='true' />
									Sign up
								</>
							)}
						</button>
					</form>

					<div className='mt-6'>
						<div className='relative'>
							<div className='absolute inset-0 flex items-center'>
								<div className='w-full border-t border-neutral-greige/30' />
							</div>
							<div className='relative flex justify-center text-sm'>
								<span className='rounded-full bg-white px-4 text-accent-brownMuted/60'>Already have an account?</span>
							</div>
						</div>

						<div className='mt-6'>
							<Link
								to='/login'
								className='w-full flex justify-center rounded-full border border-accent-brownMuted/10 px-4 py-3 shadow-sm text-xs font-bold uppercase tracking-widest text-primary-olive bg-neutral-background/20
								 hover:bg-neutral-background/40 transition duration-150 ease-in-out'
							>
								Login here <ArrowRight className='ml-2 h-4 w-4' />
							</Link>
						</div>
					</div>
				</div>
			</motion.div>
			</div>
		</div>
	);
};
export default SignUpPage;
