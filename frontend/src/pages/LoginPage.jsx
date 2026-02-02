import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, loading } = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(email, password);
		login(email, password);
	};

	return (
		<div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<motion.div
				className='sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h2 className='mt-6 text-center text-3xl font-serif font-bold text-accent-brownMuted uppercase tracking-widest'>Welcome Back</h2>
			</motion.div>

			<motion.div
				className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
				<div className='bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-neutral-greige/20'>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div>
							<label htmlFor='email' className='block text-xs font-bold uppercase tracking-widest text-accent-brownMuted mb-2'>
								Email address
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Mail className='h-5 w-5 text-neutral-greige' aria-hidden='true' />
								</div>
								<input
									id='email'
									type='email'
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className=' block w-full px-3 py-3 pl-10 bg-neutral-background/10 border border-neutral-background 
									rounded-sm shadow-sm
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
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-neutral-greige' aria-hidden='true' />
								</div>
								<input
									id='password'
									type='password'
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className=' block w-full px-3 py-3 pl-10 bg-neutral-background/10 border border-neutral-background 
									rounded-sm shadow-sm placeholder-neutral-greige focus:outline-none focus:ring-primary-olive focus:border-primary-olive sm:text-sm text-accent-oliveDark'
									placeholder='••••••••'
								/>
							</div>
						</div>

						<button
							type='submit'
							className='w-full flex justify-center py-3 px-4 border border-transparent 
							rounded-sm shadow-sm text-xs font-bold uppercase tracking-widest text-white bg-primary-olive
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
									<LogIn className='mr-2 h-5 w-5' aria-hidden='true' />
									Login
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
								<span className='px-2 bg-white text-accent-brownMuted/60'>New here?</span>
							</div>
						</div>

						<div className='mt-6'>
							<Link
								to='/signup'
								className='w-full flex justify-center py-3 px-4 border border-transparent 
								rounded-sm shadow-sm text-xs font-bold uppercase tracking-widest text-primary-olive bg-neutral-background/20
								 hover:bg-neutral-background/40 transition duration-150 ease-in-out'
							>
								Create an account <ArrowRight className='ml-2 h-4 w-4' />
							</Link>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
};
export default LoginPage;
