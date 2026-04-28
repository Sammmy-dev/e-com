import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { useCurrencyStore } from "../stores/useCurrencyStore";
import { getCurrencyMeta } from "../lib/currency";

const Footer = () => {
	const { currency } = useCurrencyStore();
	const currencyMeta = getCurrencyMeta(currency);

	return (
		<footer className="relative overflow-hidden bg-[linear-gradient(180deg,#efe3d5_0%,#7a4e3a_100%)] pb-10 pt-20 text-neutral-background">
			<div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_60%)]" />
			<div className="container relative mx-auto px-4">
				<div className="overflow-hidden rounded-[2rem] border border-white/10 bg-accent-brownMuted/85 shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur-sm">
					<div className="grid gap-10 px-6 py-10 md:grid-cols-[1.1fr_0.9fr] md:px-10 md:py-12">
						<div className="space-y-8">
							<div>
								<p className="text-[11px] font-bold uppercase tracking-[0.26em] text-neutral-background/60">
									Esta studio
								</p>
								<h2 className="mt-4 max-w-md font-serif text-4xl uppercase tracking-[0.16em] text-white md:text-5xl">
									Designed for statement dressing and modern elegance
								</h2>
								<p className="mt-5 max-w-xl text-sm leading-7 text-neutral-background/80 md:text-base">
									From everyday chic to bridal luxury, Esta builds polished wardrobes with rich texture, graceful structure, and refined detail.
								</p>
							</div>

							<div className="flex flex-wrap gap-3">
								<a
									href="#"
									className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-neutral-background/80 transition hover:bg-white/15 hover:text-white"
								>
									<Instagram size={18} />
								</a>
								<a
									href="#"
									className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-neutral-background/80 transition hover:bg-white/15 hover:text-white"
								>
									<Twitter size={18} />
								</a>
								<a
									href="#"
									className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-neutral-background/80 transition hover:bg-white/15 hover:text-white"
								>
									<Facebook size={18} />
								</a>
							</div>
						</div>

						<div className="grid gap-6 md:grid-cols-2">
							<div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-6">
								<h3 className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-white">Shop</h3>
								<ul className="space-y-3 text-sm text-neutral-background/80">
									<li>
										<Link to="/category/chic" className="transition hover:text-white">
											Esta Everyday Chic
										</Link>
									</li>
									<li>
										<Link to="/category/asoebi" className="transition hover:text-white">
											Esta Aso-Ebi & Occasions
										</Link>
									</li>
									<li>
										<Link to="/category/bridal" className="transition hover:text-white">
											Esta Bridal & Luxury
										</Link>
									</li>
								</ul>
							</div>

							<div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-6">
								<h3 className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-white">Contact</h3>
								<div className="space-y-3 text-sm leading-7 text-neutral-background/80">
									<p>3 Dolie Crescent</p>
									<p>Ikeja, Lagos 100212</p>
									<p>Nigeria</p>
									<p className="pt-2">Phone: +234 700 000 0000</p>
								</div>
							</div>

							<div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-6 md:col-span-2">
								<div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
									<div className="max-w-md">
										<h3 className="text-sm font-bold uppercase tracking-[0.22em] text-white">
											Subscribe to our emails
										</h3>
										<p className="mt-3 text-sm leading-7 text-neutral-background/75">
											Receive product drops, private edits, and early access to the latest Esta collections.
										</p>
									</div>
									<div className="w-full max-w-md">
										<div className="flex rounded-full border border-white/15 bg-white/10 p-1">
											<input
												type="email"
												placeholder="Email address"
												className="w-full bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-background/45"
											/>
											<button className="rounded-full bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-accent-brownMuted transition hover:bg-neutral-sand">
												Join
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-4 border-t border-white/10 px-6 py-5 text-xs uppercase tracking-[0.2em] text-neutral-background/55 md:flex-row md:items-center md:justify-between md:px-10">
						<p>© 2026 Esta</p>
						<div className="flex items-center gap-3">
							<span className="rounded-full border border-white/10 bg-white/8 px-3 py-2">{currencyMeta.label} ({currencyMeta.value}) {currencyMeta.symbol}</span>
							<span className="rounded-full border border-white/10 bg-white/8 px-3 py-2">Refined wardrobe essentials</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};
export default Footer;