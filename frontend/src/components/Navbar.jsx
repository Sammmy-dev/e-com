import { LogOut, Lock, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useCurrencyStore } from "../stores/useCurrencyStore";
import { CURRENCY_OPTIONS } from "../lib/currency";

const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();
	const { currency, setCurrency } = useCurrencyStore();
	const [isVisible, setIsVisible] = useState(true);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		let lastScrollY = window.scrollY;

		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY <= 24) {
				setIsVisible(true);
			} else if (currentScrollY > lastScrollY) {
				setIsVisible(false);
				setIsMobileMenuOpen(false);
			} else {
				setIsVisible(true);
			}

			lastScrollY = currentScrollY;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleMobileMenuClose = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<div
			className={`fixed left-0 top-0 z-40 w-full px-3 pt-3 transition-transform duration-300 md:px-5 ${
				isVisible ? "translate-y-0" : "-translate-y-[calc(100%+1rem)]"
			}`}
		>
			<div className="mx-auto max-w-7xl">
				<header className="overflow-hidden rounded-[1.75rem] border border-white/60 bg-neutral-background/80 shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur-xl">
					<div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-4 md:grid-cols-[1fr_auto_1fr] md:px-6 md:py-5">
						<div className="flex items-center gap-3 text-accent-brownMuted">
							<button className="hidden h-11 w-11 items-center justify-center rounded-full border border-accent-brownMuted/10 bg-white/50 transition hover:border-primary-olive/30 hover:text-primary-olive md:inline-flex">
								<Search size={20} strokeWidth={1.5} />
							</button>
							<p className="hidden text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-brownMuted/60 md:block">
								Curated modern dressing
							</p>
							<button
								className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-accent-brownMuted/10 bg-white/50 transition hover:border-primary-olive/30 hover:text-primary-olive md:hidden"
								onClick={() => setIsMobileMenuOpen((open) => !open)}
								aria-label="Toggle navigation menu"
							>
								{isMobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
							</button>
						</div>

						<Link
							to="/"
							className="justify-self-center text-center font-serif text-3xl font-bold uppercase tracking-[0.28em] text-accent-brownMuted transition hover:text-primary-olive md:text-4xl"
						>
							ESTA
						</Link>

						<nav className="flex items-center justify-end gap-3 md:gap-4">
							<div className="hidden md:block">
								<label className="sr-only" htmlFor="currency-select">Currency</label>
								<select
									id="currency-select"
									value={currency}
									onChange={(event) => setCurrency(event.target.value)}
									className="h-11 rounded-full border border-accent-brownMuted/10 bg-white/50 px-4 text-[11px] font-bold uppercase tracking-[0.18em] text-accent-brownMuted outline-none transition hover:border-primary-olive/30 hover:text-primary-olive"
								>
									{CURRENCY_OPTIONS.map((option) => (
										<option key={option.value} value={option.value}>
											{option.value}
										</option>
									))}
								</select>
							</div>

							{isAdmin && (
								<Link
									className="hidden items-center gap-2 rounded-full border border-primary-olive/30 bg-primary-olive px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-[0_16px_35px_rgba(78,90,55,0.24)] transition hover:bg-accent-oliveDark sm:inline-flex"
									to={"/secret-dashboard"}
								>
									<Lock size={14} />
									Admin
								</Link>
							)}

							{user && (
								<Link
									to={"/cart"}
									className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-accent-brownMuted/10 bg-white/50 text-accent-brownMuted transition hover:border-primary-olive/30 hover:text-primary-olive"
									onClick={handleMobileMenuClose}
								>
									<ShoppingCart size={20} strokeWidth={1.5} />
									{cart.length > 0 && (
										<span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-terracotta px-1 text-[10px] font-bold text-white shadow-sm">
											{cart.length}
										</span>
									)}
								</Link>
							)}

							{user ? (
								<button
									className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-accent-brownMuted/10 bg-white/50 text-accent-brownMuted transition hover:border-primary-olive/30 hover:text-primary-olive"
									onClick={logout}
									title="Log Out"
								>
									<LogOut size={20} strokeWidth={1.5} />
								</button>
							) : (
								<>
									<Link
										to={"/signup"}
										className="hidden rounded-full border border-accent-brownMuted/10 bg-white/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-accent-brownMuted transition hover:border-primary-olive/30 hover:text-primary-olive sm:inline-flex"
										onClick={handleMobileMenuClose}
									>
										Sign Up
									</Link>
									<Link
										to={"/login"}
										className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-accent-brownMuted/10 bg-white/50 text-accent-brownMuted transition hover:border-primary-olive/30 hover:text-primary-olive"
										onClick={handleMobileMenuClose}
									>
										<User size={20} strokeWidth={1.5} />
									</Link>
								</>
							)}
						</nav>
					</div>

					<div className="hidden border-t border-accent-brownMuted/8 px-4 pb-4 pt-3 md:block md:px-6 md:pb-5">
						<div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
							<Link
								to="/category/asoebi"
								className="rounded-full border border-accent-brownMuted/10 bg-white/55 px-4 py-2 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-accent-brownMuted transition hover:border-primary-olive/30 hover:text-primary-olive"
							>
								Esta Aso-Ebi & Occasions
							</Link>
							<Link
								to="/category/chic"
								className="rounded-full border border-accent-brownMuted/10 bg-white/55 px-4 py-2 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-accent-brownMuted transition hover:border-primary-olive/30 hover:text-primary-olive"
							>
								Esta Everyday Chic
							</Link>
							<Link
								to="/category/bridal"
								className="rounded-full border border-accent-brownMuted/10 bg-white/55 px-4 py-2 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-accent-brownMuted transition hover:border-primary-olive/30 hover:text-primary-olive"
							>
								Esta Bridal & Luxury
							</Link>
						</div>
					</div>

					{isMobileMenuOpen && (
						<div className="border-t border-accent-brownMuted/8 px-4 pb-4 pt-4 md:hidden">
							<div className="space-y-3 rounded-[1.25rem] border border-accent-brownMuted/10 bg-white/45 p-3">
								<div className="rounded-[1rem] bg-white/70 px-4 py-3">
									<label htmlFor="mobile-currency-select" className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-accent-brownMuted/60">
										Currency
									</label>
									<select
										id="mobile-currency-select"
										value={currency}
										onChange={(event) => setCurrency(event.target.value)}
										className="w-full rounded-full border border-accent-brownMuted/10 bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-accent-brownMuted outline-none"
									>
										{CURRENCY_OPTIONS.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label} ({option.value})
											</option>
										))}
									</select>
								</div>

								<Link
									to="/category/asoebi"
									className="block rounded-[1rem] bg-white/70 px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] text-accent-brownMuted transition hover:text-primary-olive"
									onClick={handleMobileMenuClose}
								>
									Esta Aso-Ebi & Occasions
								</Link>
								<Link
									to="/category/chic"
									className="block rounded-[1rem] bg-white/70 px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] text-accent-brownMuted transition hover:text-primary-olive"
									onClick={handleMobileMenuClose}
								>
									Esta Everyday Chic
								</Link>
								<Link
									to="/category/bridal"
									className="block rounded-[1rem] bg-white/70 px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] text-accent-brownMuted transition hover:text-primary-olive"
									onClick={handleMobileMenuClose}
								>
									Esta Bridal & Luxury
								</Link>

								{!user && (
									<div className="grid grid-cols-2 gap-3 pt-2">
										<Link
											to="/signup"
											className="rounded-full border border-accent-brownMuted/10 bg-white/70 px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.18em] text-accent-brownMuted"
											onClick={handleMobileMenuClose}
										>
											Sign Up
										</Link>
										<Link
											to="/login"
											className="rounded-full border border-accent-brownMuted/10 bg-white/70 px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.18em] text-accent-brownMuted"
											onClick={handleMobileMenuClose}
										>
											Login
										</Link>
									</div>
								)}
							</div>
						</div>
					)}
				</header>
			</div>
		</div>
	);
};
export default Navbar;
