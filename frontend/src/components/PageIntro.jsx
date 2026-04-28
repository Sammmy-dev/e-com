const PageIntro = ({ eyebrow, title, description, align = "center", className = "" }) => {
	const isCentered = align === "center";

	return (
		<div className={`relative z-10 ${className}`}>
			<div className={`mx-auto max-w-3xl ${isCentered ? "text-center" : "text-left"}`}>
				{eyebrow && (
					<p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-accent-brownMuted/60">
						{eyebrow}
					</p>
				)}
				<h1 className="text-4xl font-serif uppercase tracking-[0.14em] text-accent-brownMuted md:text-5xl">
					{title}
				</h1>
				{description && (
					<p className="mt-5 text-sm leading-7 text-accent-brownMuted/75 md:text-base">
						{description}
					</p>
				)}
			</div>
		</div>
	);
};

export default PageIntro;