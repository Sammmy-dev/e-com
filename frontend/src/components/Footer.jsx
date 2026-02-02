import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
	return (
		<footer className='bg-accent-brownMuted text-neutral-background py-16 font-sans border-t border-primary-olive/20'>
			<div className='container mx-auto px-4'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-12'>
					{/* Column 1 */}
					<div>
						<h3 className='text-sm font-bold uppercase tracking-widest mb-4'>Shop</h3>
						<ul className='space-y-2 text-sm opacity-80'>
							<li><a href='#' className='hover:text-primary-olive transition'>Knanfe Fashion</a></li>
							<li><a href='#' className='hover:text-primary-olive transition'>Knanfe Home & Body</a></li>
							<li><a href='#' className='hover:text-primary-olive transition'>Knanfe Kids</a></li>
							<li><a href='#' className='hover:text-primary-olive transition'>Search</a></li>
						</ul>
					</div>

					{/* Column 2 */}
					<div>
						<h3 className='text-sm font-bold uppercase tracking-widest mb-4'>Information</h3>
						<ul className='space-y-2 text-sm opacity-80'>
							<li><a href='#' className='hover:text-primary-olive transition'>About Us</a></li>
							<li><a href='#' className='hover:text-primary-olive transition'>Contact Us</a></li>
							<li><a href='#' className='hover:text-primary-olive transition'>Give + Fit Guide</a></li>
							<li><a href='#' className='hover:text-primary-olive transition'>FAQs</a></li>
							<li><a href='#' className='hover:text-primary-olive transition'>Order Policy</a></li>
							<li><a href='#' className='hover:text-primary-olive transition'>Return Policy</a></li>
						</ul>
					</div>

					{/* Column 3 */}
					<div>
						<h3 className='text-sm font-bold uppercase tracking-widest mb-4'>Contact Us</h3>
						<div className='text-sm opacity-80 space-y-2'>
							<p>3 Dolie Crescent</p>
							<p>Ikeja, Lagos 100212</p>
							<p>Nigeria</p>
							<p className='mt-4'>Phone: +234 700 000 0000</p>
						</div>
					</div>

					{/* Column 4 - Newsletter */}
					<div>
						<h3 className='text-sm font-bold uppercase tracking-widest mb-4'>Subscribe to our emails</h3>
						<div className='flex flex-col gap-4'>
							<div className="relative">
								<input 
									type="email" 
									placeholder="Email" 
									className="w-full bg-transparent border border-neutral-background/30 px-4 py-2 text-sm outline-none focus:border-primary-olive transition placeholder:text-neutral-background/50"
								/>
								<button className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-background/70 hover:text-white">
									&rarr;
								</button>
							</div>
							<div className='flex gap-4 mt-4'>
								<Instagram size={20} className="opacity-80 hover:opacity-100 cursor-pointer" />
								<Twitter size={20} className="opacity-80 hover:opacity-100 cursor-pointer" />
                                <Facebook size={20} className="opacity-80 hover:opacity-100 cursor-pointer" />
							</div>
						</div>
					</div>
				</div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-neutral-background/10 text-xs opacity-60">
                    <p>© 2026, Knanfe</p>
                    <div className="mt-4 md:mt-0 border border-neutral-background/30 px-3 py-1 rounded flex items-center gap-2">
                        <span>Nigeria (NGN) ₦</span>
                        <span>▼</span>
                    </div>
                </div>
			</div>
		</footer>
	);
};
export default Footer;