import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();

	return (
		<div className="fixed top-0 left-0 w-full z-40 shadow-sm">
			<div className="bg-primary-terracotta text-white text-xs font-bold py-2 text-center uppercase tracking-widest">
				Discover our sand and thread collection now &rarr;
			</div>

			<header className='bg-neutral-background/95 backdrop-blur-md transition-all duration-300 border-b border-neutral-greige/20'>
				<div className='container mx-auto px-4 pt-4 pb-2'>
					<div className='flex justify-between items-center'>
						{/* Left - Search */}
						<div className="flex items-center">
							<button className="text-accent-brownMuted hover:text-primary-olive transition">
								<Search size={22} strokeWidth={1.5} />
							</button>
						</div>

						{/* Center - Logo */}
						<Link to='/' className='text-3xl font-serif font-bold text-accent-brownMuted tracking-widest uppercase'>
							KNANFE
						</Link>

						{/* Right - Icons */}
						<nav className='flex items-center gap-6'>
							{user && (
								<Link
									to={"/cart"}
									className='relative group text-accent-brownMuted hover:text-primary-olive transition duration-300 ease-in-out'
								>
									<ShoppingCart size={22} strokeWidth={1.5} />
									{cart.length > 0 && (
										<span
											className='absolute -top-2 -right-2 bg-primary-terracotta text-white rounded-full w-5 h-5 flex items-center justify-center
                                        text-xs group-hover:bg-primary-olive transition duration-300 ease-in-out font-medium'
										>
											{cart.length}
										</span>
									)}
								</Link>
							)}

							{isAdmin && (
								<Link
									className='bg-primary-olive hover:bg-accent-oliveDark text-white px-3 py-1 rounded-sm font-medium transition duration-300 ease-in-out flex items-center text-sm'
									to={"/secret-dashboard"}
								>
									<Lock className='inline-block mr-1' size={16} />
									<span className='hidden sm:inline'>Admin</span>
								</Link>
							)}

							{user ? (
								<button
									className='text-accent-brownMuted hover:text-primary-olive transition duration-300 ease-in-out flex items-center'
									onClick={logout}
									title="Log Out"
								>
									<LogOut size={22} strokeWidth={1.5} />
								</button>
							) : (
								<div className="flex items-center gap-4">
									<Link
										to={"/signup"}
										className='text-accent-brownMuted hover:text-primary-olive transition duration-300 ease-in-out font-medium'
									>
										Sign Up
									</Link>
									<Link
										to={"/login"}
										className='text-accent-brownMuted hover:text-primary-olive transition duration-300 ease-in-out'
									>
										<User size={22} strokeWidth={1.5} />
									</Link>
								</div>
							)}
						</nav>
					</div>
					
					{/* Sub nav */}
					<div className="flex justify-center gap-8 mt-4 text-xs font-semibold uppercase tracking-widest text-accent-brownMuted/80">
						<Link to="/" className="hover:text-primary-olive transition border-b-2 border-transparent hover:border-primary-olive pb-1">Knanfe Home</Link>
						<Link to="/category/fashion" className="hover:text-primary-olive transition border-b-2 border-transparent hover:border-primary-olive pb-1">Knanfe Fashion</Link>
						<Link to="/category/kids" className="hover:text-primary-olive transition border-b-2 border-transparent hover:border-primary-olive pb-1">Knanfe Kids</Link>
					</div>
				</div>
			</header>
		</div>
	);
};
export default Navbar;
