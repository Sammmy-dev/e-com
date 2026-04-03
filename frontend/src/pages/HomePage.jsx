import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import HomePageButton from "../components/HomePageButton";

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	const renderProductGrid = (title, subtitle, items) => (
		<section className="py-16 container mx-auto px-4">
			<div className="text-center mb-12">
				{subtitle && <p className="text-xs font-bold tracking-[0.2em] mb-2 uppercase text-accent-brownMuted opacity-60">{subtitle}</p>}
				<h2 className="text-3xl font-serif text-accent-brownMuted uppercase tracking-widest">{title}</h2>
			</div>
			
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
				{items.slice(0, 4).map((product, idx) => (
					<Link to={`/category/fashion`} key={product._id || idx} className="group cursor-pointer">
						<div className="relative aspect-[3/4] overflow-hidden mb-4 bg-neutral-200">
							<img 
								src={product.image || "/placeholder.jpg"} 
								alt={product.name}
								className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
							/>
							{/* Hover Button */}
							<div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <HomePageButton as="span" size="compact">
                  View
                </HomePageButton>
							</div>
						</div>
						<h3 className="text-sm font-bold text-accent-brownMuted/80 mb-1">{product.name}</h3>
						<p className="text-xs text-accent-brownMuted/60">₦{product.price.toLocaleString()}</p>
					</Link>
				))}
			</div>
			
			<div className="text-center mt-12">
        <HomePageButton to="/category/fashion">
					View All
        </HomePageButton>
			</div>
		</section>
	);

	return (
    <div className="relative min-h-screen text-accent-oliveDark overflow-hidden pb-10">
      {/* Hero Section */}
      <div className="relative h-screen md:h-[1000px] w-full overflow-hidden">
        <img
          src="https://www.eventdesignbybe.com/wp-content/uploads/2024/06/Beautiful-Aso-Ebi-Bride-with-Bridesmaids.jpg"
          alt="Aso-Ebi & Occasions"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute max-md:top-[45%] md:inset-x-0 md:bottom-[300px] flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-xs font-bold tracking-[0.2em] mb-4 uppercase drop-shadow-md">
            Discover
          </p>
          <h1 className="text-4xl md:text-6xl uppercase font-serif mb-8 tracking-wide drop-shadow-lg">
            Aso-Ebi & Occasions
          </h1>
          <HomePageButton
            to="/category/fashion"
            variant="hero"
            icon={<ArrowRight size={16} />}
          >
            Shop Collection
          </HomePageButton>
        </div>
      </div>

      {/* Section 1: Sand and Thread */}
      {/* For demo purposes, we reuse 'products' but ideally these would be filtered by category */}
      {renderProductGrid(
        "",
        "",
        products.length > 0
          ? products
          : [
              {
                name: "Zaria Dress",
                price: 435000,
                image:
                  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop",
              },
              {
                name: "Bubu Shirt Set",
                price: 199900,
                image:
                  "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=1000&auto=format&fit=crop",
              },
              {
                name: "Adire Set",
                price: 159900,
                image:
                  "https://images.unsplash.com/photo-1589465885857-44ed77ea8d95?q=80&w=1000&auto=format&fit=crop",
              },
              {
                name: "Zaria Dress",
                price: 249990,
                image:
                  "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop",
              },
            ],
      )}

      {/* Section 2: Promotional Banner (Christmas Drop) */}
      <section className="relative h-[600px] w-full my-16 bg-transparent">
        <div className="relative h-full w-full flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 h-full relative">
            {/* <img
              src=""
              alt="Model"
              className="w-full h-full object-cover object-top"
            /> */}
            <div className="absolute inset-0 flex flex-col justify-center px-12 md:px-24 text-white bg-black/20 md:bg-transparent md:text-accent-brownMuted">
              <p className="text-xs font-bold tracking-[0.2em] mb-4 uppercase">
                Esta
              </p>
              <h2 className="text-4xl md:text-5xl font-serif mb-6 text-white drop-shadow-md">
                Everyday Chic
              </h2>
              <HomePageButton to="/category/fashion" className="w-max">
                Shop Now
              </HomePageButton>
            </div>
          </div>
          <div className="hidden md:block w-1/2 h-full">
            <img
              src="/hero.webp"
              alt="Model 2"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* Section 3: Just In */}
      <div className="bg-neutral-background">
        {renderProductGrid(
          "Just In",
          "Esta Everyday Chic",
          products.length > 0
            ? [...products].reverse()
            : [
                {
                  name: "Zamani Set",
                  price: 509900,
                  image:
                    "https://images.unsplash.com/photo-15096311408-e6a7442702b2?q=80&w=1000&auto=format&fit=crop",
                },
                {
                  name: "Zuna Set",
                  price: 199990,
                  image:
                    "https://images.unsplash.com/photo-15096311408-e6a7442702b2?q=80&w=1000&auto=format&fit=crop",
                },
                {
                  name: "Ivory Pants",
                  price: 290000,
                  image:
                    "https://images.unsplash.com/photo-15096311408-e6a7442702b2?q=80&w=1000&auto=format&fit=crop",
                },
                {
                  name: "Mima Set",
                  price: 439000,
                  image:
                    "https://images.unsplash.com/photo-15096311408-e6a7442702b2?q=80&w=1000&auto=format&fit=crop",
                },
              ],
        )}
      </div>

      {/* Section 4: Home (Banner) */}
      <section className="relative w-full my-16">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-[500px] overflow-hidden">
            <img
              src="https://i.pinimg.com/originals/e3/87/31/e38731012b6484952eaf29aeb506d3b4.jpg"
              alt="Home"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="h-[500px] bg-transparent flex flex-col justify-center items-center text-center p-12 text-white relative overflow-hidden">
            {/* <img
              src="https://images.unsplash.com/photo-1615750106983-164971c0c169?q=80&w=1000&auto=format&fit=crop"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
              alt="bg"
            /> */}
            <div className="relative z-10">
              <p className="text-xs font-bold tracking-[0.2em] mb-4 uppercase">
                Esta
              </p>
              <h2 className="text-4xl md:text-5xl font-serif mb-6">
                Bridal & Luxury
              </h2>
              <HomePageButton to="/category/home">Shop Now</HomePageButton>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Kids (Banner + Grid - Simplified) */}
      <div className="bg-neutral-background pb-16">
        <div className="container mx-auto px-4 mb-8">
          <div className="text-center mb-8">
            <p className="text-xs font-bold tracking-[0.2em] mb-2 uppercase text-accent-brownMuted opacity-60">
              Esta Bridal & Luxury
            </p>
            <h2 className="text-3xl font-serif text-accent-brownMuted uppercase tracking-widest">
              Just In
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Mock Kids Data */}
            {[
              {
                name: "Nana",
                price: 25700,
                image:
                  "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?q=80&w=1000&auto=format&fit=crop",
              },
              {
                name: "Ayo",
                price: 35990,
                image:
                  "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=1000&auto=format&fit=crop",
              },
              {
                name: "Shayo",
                price: 28500,
                image:
                  "https://images.unsplash.com/photo-1471286174890-9c808743015a?q=80&w=1000&auto=format&fit=crop",
              },
              {
                name: "Mosh Party",
                price: 18500,
                image:
                  "https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=1000&auto=format&fit=crop",
              },
            ].map((product, idx) => (
              <Link
                to={`/category/kids`}
                key={idx}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-neutral-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <HomePageButton as="span" size="compact">
                      View
                    </HomePageButton>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-accent-brownMuted/80 mb-1">
                  {product.name}
                </h3>
                <p className="text-xs text-accent-brownMuted/60">
                  ₦{product.price.toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <HomePageButton to="/category/kids">View All</HomePageButton>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
