import { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import HomePageButton from "../components/HomePageButton";
import { useCurrencyStore } from "../stores/useCurrencyStore";
import { formatCurrency } from "../lib/currency";

const HomePage = () => {
	const { getProductsByCategory } = useProductStore();
  const { currency } = useCurrencyStore();
	const [categoryProducts, setCategoryProducts] = useState({
		asoebi: [],
		chic: [],
		bridal: [],
	});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;

		const loadHomepageProducts = async () => {
			setIsLoading(true);
			try {
				const [asoebi, chic, bridal] = await Promise.all([
					getProductsByCategory("asoebi"),
					getProductsByCategory("chic"),
					getProductsByCategory("bridal"),
				]);

				if (!isMounted) {
					return;
				}

				setCategoryProducts({
					asoebi,
					chic,
					bridal,
				});
			} catch (error) {
				if (!isMounted) {
					return;
				}

				setCategoryProducts({
					asoebi: [],
					chic: [],
					bridal: [],
				});
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};

		loadHomepageProducts();

		return () => {
			isMounted = false;
		};
	}, [getProductsByCategory]);

  const renderProductGrid = ({
    title,
    subtitle,
    items,
    ctaTo,
    tone = "sand",
    itemTo = "/category/chic",
    emptyMessage,
  }) => (
    <section className="container mx-auto px-4 py-16 md:py-20">
      <div
        className={`rounded-[2rem] border px-6 py-10 md:px-10 md:py-12 ${
          tone === "cream"
            ? "border-white/60 bg-[#f3ebe0]"
            : "border-primary-olive/10 bg-neutral-background/55"
        }`}
      >
        <div className="mb-10 flex flex-col gap-4 text-center md:mb-12 md:flex-row md:items-end md:justify-between md:text-left">
          <div>
            {subtitle && (
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-accent-brownMuted/60">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-serif uppercase tracking-[0.16em] text-accent-brownMuted md:text-4xl">
                {title}
              </h2>
            )}
          </div>
          {ctaTo && (
            <HomePageButton to={ctaTo} className="mx-auto md:mx-0">
              View All
            </HomePageButton>
          )}
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {items.slice(0, 4).map((product, idx) => (
              <Link to={itemTo} key={product._id || idx} className="group cursor-pointer">
                <div className="overflow-hidden rounded-[1.5rem] border border-accent-brownMuted/10 bg-white/70 p-3 shadow-[0_18px_45px_rgba(0,0,0,0.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(0,0,0,0.12)]">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[1.1rem] bg-neutral-200">
                    <img
                      src={product.image || "/placeholder.jpg"}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-4 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <HomePageButton as="span" size="compact">
                        View
                      </HomePageButton>
                    </div>
                  </div>
                  <div className="px-2 pb-2 pt-5 text-center">
                    <h3 className="mb-1 text-sm font-bold text-accent-brownMuted/80">
                      {product.name}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.16em] text-accent-brownMuted/60">
                      {formatCurrency(product.price, currency)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-accent-brownMuted/20 bg-white/55 px-6 py-14 text-center text-sm leading-7 text-accent-brownMuted/70">
            {emptyMessage}
          </div>
        )}
      </div>
    </section>
  );

	return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f1e8] pb-16 text-accent-oliveDark">
      <div className="absolute inset-x-0 top-0 h-[780px] bg-[radial-gradient(circle_at_top_left,_rgba(227,205,181,0.7),_transparent_48%),linear-gradient(180deg,_rgba(122,78,58,0.08),_transparent_70%)]" />

      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        <img
          src="https://www.eventdesignbybe.com/wp-content/uploads/2024/06/Beautiful-Aso-Ebi-Bride-with-Bridesmaids.jpg"
          alt="Aso-Ebi & Occasions"
          className="h-screen w-full object-cover object-top md:h-[960px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.5))]" />

        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto grid w-full gap-10 px-4 pb-16 pt-32 md:grid-cols-[minmax(0,1fr)_320px] md:items-end md:pb-24 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="max-w-2xl text-white">
              <p className="mb-5 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.28em] backdrop-blur-sm">
                {isLoading
                  ? "Refreshing the latest edit"
                  : "Curated for modern occasions"}
              </p>
              <h1 className="max-w-xl text-4xl font-serif uppercase leading-tight tracking-[0.14em] drop-shadow-lg md:text-6xl">
                Aso-Ebi & Occasions
              </h1>
              <p className="mt-6 max-w-lg text-sm leading-7 text-white/85 md:text-base">
                Statement silhouettes, rich fabrics, and polished finishing
                pieces designed for celebrations that deserve presence.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <HomePageButton
                  to="/category/asoebi"
                  variant="hero"
                  icon={<ArrowRight size={16} />}
                >
                  Shop Collection
                </HomePageButton>
              </div>
            </div>

            <div className="hidden rounded-[2rem] border border-white/20 bg-white/10 p-6 text-white shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur-md md:block">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/70">
                This season
              </p>
              <div className="mt-5 space-y-5">
                <div>
                  <p className="text-3xl font-serif">24</p>
                  <p className="mt-1 text-sm text-white/75">
                    Fresh pieces selected for the latest drop
                  </p>
                </div>
                <div className="border-t border-white/20 pt-5">
                  <p className="text-sm uppercase tracking-[0.18em] text-white/70">
                    Focus
                  </p>
                  <p className="mt-2 text-base leading-7 text-white/85">
                    Tailored separates, soft drape, and clean ceremonial
                    styling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {renderProductGrid({
        title: "Signature Looks",
        subtitle: "Esta Aso-Ebi & Occasions",
        items: categoryProducts.asoebi,
        ctaTo: "/category/asoebi",
        itemTo: "/category/asoebi",
        emptyMessage: "No Aso-Ebi pieces are available yet.",
      })}

      <section className="container mx-auto px-4 py-4 md:py-8">
        <div className="grid gap-6 overflow-hidden rounded-[2rem] border border-primary-olive/10 bg-white/70 md:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[420px] overflow-hidden">
            <img
              src="/hero.webp"
              alt="Editorial fashion"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
            <div className="relative z-10 flex h-full max-w-xl flex-col justify-end p-8 text-white md:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/70">
                Esta occasionwear
              </p>
              <h2 className="mt-4 text-3xl font-serif uppercase tracking-[0.12em] md:text-5xl">
                Everyday Chic with refined ease
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/80 md:text-base">
                A softer edit of elevated staples, understated tailoring, and
                polished silhouettes for daily dressing.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center bg-[#f2e5d7] p-8 text-accent-brownMuted md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent-brownMuted/60">
              Why it works
            </p>
            <h3 className="mt-4 text-3xl font-serif uppercase tracking-[0.12em]">
              Built for effortless, polished everyday styling
            </h3>
            <div className="mt-8 space-y-5 text-sm leading-7 text-accent-brownMuted/80">
              <p>
                Thoughtful silhouettes create movement without bulk, so each
                outfit feels put together from day to night.
              </p>
              <p>
                Clean layering, subtle structure, and easy styling make this
                category the core of the Esta wardrobe.
              </p>
            </div>
            <div className="mt-8">
              <HomePageButton to="/category/chic">
                Explore The Edit
              </HomePageButton>
            </div>
          </div>
        </div>
      </section>

      {renderProductGrid({
        title: "Just In",
        subtitle: "Esta Everyday Chic",
        items: categoryProducts.chic,
        ctaTo: "/category/chic",
        tone: "cream",
        itemTo: "/category/chic",
        emptyMessage: "No Everyday Chic pieces are available yet.",
      })}

      <section className="container mx-auto px-4 py-4 md:py-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-primary-olive/10">
            <img
              src="https://i.pinimg.com/originals/e3/87/31/e38731012b6484952eaf29aeb506d3b4.jpg"
              alt="Bridal and luxury"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-white md:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/75">
                Esta bridal & luxury
              </p>
              <h2 className="mt-4 text-4xl font-serif uppercase tracking-[0.12em] md:text-5xl">
                Bridal & Luxury
              </h2>
            </div>
          </div>

          <div className="flex min-h-[520px] flex-col justify-between rounded-[2rem] border border-primary-olive/10 bg-[#fcf8f2] p-8 text-accent-brownMuted md:p-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent-brownMuted/60">
                Private occasion edit
              </p>
              <h3 className="mt-4 text-3xl font-serif uppercase tracking-[0.12em] md:text-4xl">
                Designed for moments that ask for more
              </h3>
              <p className="mt-5 max-w-md text-sm leading-7 text-accent-brownMuted/80 md:text-base">
                Explore ceremonial styling, evening silhouettes, and elevated
                finishing pieces with a softer, more luxurious tone.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] bg-[#efe4d5] p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-accent-brownMuted/55">
                  Detail
                </p>
                <p className="mt-3 text-lg font-serif">Elegant drape</p>
              </div>
              <div className="rounded-[1.5rem] bg-[#efe4d5] p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-accent-brownMuted/55">
                  Mood
                </p>
                <p className="mt-3 text-lg font-serif">Soft luxury</p>
              </div>
            </div>

            <div className="mt-8">
              <HomePageButton to="/category/bridal">Shop Now</HomePageButton>
            </div>
          </div>
        </div>
      </section>

      {renderProductGrid({
        title: "Just In",
        subtitle: "Esta Bridal & Luxury",
        items: categoryProducts.bridal,
        ctaTo: "/category/bridal",
        tone: "cream",
        itemTo: "/category/bridal",
        emptyMessage: "No Bridal & Luxury pieces are available yet.",
      })}
    </div>
  );
};
export default HomePage;
