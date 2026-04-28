import { Link } from "react-router-dom";

const BASE_CLASSES =
	"inline-flex items-center justify-center gap-3 rounded-full border text-xs font-bold uppercase transition duration-300";

const VARIANT_CLASSES = {
	hero:
		"border-white/70 bg-white/90 text-primary-olive shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-sm hover:bg-white hover:shadow-[0_24px_55px_rgba(0,0,0,0.24)] focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-transparent",
	olive:
		"border-accent-oliveDark bg-accent-oliveDark text-white shadow-[0_16px_35px_rgba(78,90,55,0.24)] hover:border-primary-olive hover:bg-primary-olive hover:shadow-[0_22px_40px_rgba(78,90,55,0.3)] focus:outline-none focus:ring-2 focus:ring-primary-olive/40 focus:ring-offset-2 focus:ring-offset-transparent",
};

const SIZE_CLASSES = {
	regular: "px-8 py-3 tracking-[0.22em]",
	compact: "px-6 py-2.5 tracking-[0.18em]",
};

const HomePageButton = ({
	to,
	variant = "olive",
	size = "regular",
	className = "",
	children,
	icon,
	as = "link",
	...props
}) => {
	const classes = [
		BASE_CLASSES,
		VARIANT_CLASSES[variant] || VARIANT_CLASSES.olive,
		SIZE_CLASSES[size] || SIZE_CLASSES.regular,
		className,
	]
		.filter(Boolean)
		.join(" ");

	const content = (
		<>
			<span>{children}</span>
			{icon}
		</>
	);

	if (as === "span") {
		return (
			<span className={classes} {...props}>
				{content}
			</span>
		);
	}

	return (
		<Link to={to} className={classes} {...props}>
			{content}
		</Link>
	);
};

export default HomePageButton;