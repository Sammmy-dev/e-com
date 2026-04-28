import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = [
	{ value: "asoebi", label: "Aso-Ebi & Occasions" },
	{ value: "chic", label: "Everyday Chic" },
	{ value: "bridal", label: "Bridal & Luxury" },
];

const CreateProductForm = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "",
	});

	const { createProduct, loading } = useProductStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await createProduct(newProduct);
			setNewProduct({ name: "", description: "", price: "", category: "", image: "" });
		} catch {
			console.log("error creating a product");
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setNewProduct({ ...newProduct, image: reader.result });
			};

			reader.readAsDataURL(file); // base64
		}
	};

	return (
		<motion.div
			className='mx-auto max-w-2xl rounded-[1.75rem] border border-accent-brownMuted/10 bg-[#fcf8f2] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] md:p-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<div className='mb-8 text-center'>
				<p className='mb-2 text-[11px] font-bold uppercase tracking-[0.24em] text-accent-brownMuted/60'>Catalog management</p>
				<h2 className='font-serif text-3xl uppercase tracking-[0.12em] text-accent-brownMuted'>Create New Product</h2>
			</div>

			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label htmlFor='name' className='mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-primary-terracotta'>
						Product Name
					</label>
					<input
						type='text'
						id='name'
						name='name'
						value={newProduct.name}
						onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						className='mt-1 block w-full rounded-full border border-neutral-greige/20 bg-white px-4 py-3 text-primary-olive shadow-sm focus:outline-none focus:ring-2
						focus:ring-primary-olive focus:border-primary-olive'
						required
					/>
				</div>

				<div>
					<label htmlFor='description' className='mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-primary-terracotta'>
						Description
					</label>
					<textarea
						id='description'
						name='description'
						value={newProduct.description}
						onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
						rows='3'
						className='mt-1 block w-full rounded-[1.25rem] border border-neutral-greige/20 bg-white px-4 py-3 text-primary-olive shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-olive 
						 focus:border-primary-olive'
						required
					/>
				</div>

				<div className='grid gap-4 md:grid-cols-2'>
					<div>
						<label htmlFor='price' className='mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-primary-terracotta'>
						Price (NGN)
						</label>
						<input
							type='number'
							id='price'
							name='price'
							value={newProduct.price}
							onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
							step='0.01'
							className='mt-1 block w-full rounded-full border border-neutral-greige/20 bg-white px-4 py-3 text-primary-olive shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-olive focus:border-primary-olive'
							required
						/>
					</div>

					<div>
						<label htmlFor='category' className='mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-primary-terracotta'>
						Category
						</label>
						<select
							id='category'
							name='category'
							value={newProduct.category}
							onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
							className='mt-1 block w-full rounded-full border border-neutral-greige/20 bg-white px-4 py-3 text-primary-olive shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-olive focus:border-primary-olive'
							required
						>
							<option value=''>Select a category</option>
							{categories.map((category) => (
								<option key={category.value} value={category.value}>
									{category.label}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className='mt-1 rounded-[1.25rem] border border-dashed border-accent-brownMuted/20 bg-white/70 p-4'>
					<input type='file' id='image' className='sr-only' accept='image/*' onChange={handleImageChange} />
					<div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
						<label
							htmlFor='image'
							className='inline-flex cursor-pointer items-center justify-center rounded-full border border-neutral-greige/20 bg-[#f8f2e9] px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-primary-terracotta transition-colors duration-200 hover:bg-neutral-background/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-olive'
						>
							<Upload className='mr-2 h-4 w-4' />
							Upload Image
						</label>
						{newProduct.image ? (
							<span className='text-sm text-primary-olive'>Image uploaded</span>
						) : (
							<span className='text-sm text-neutral-greige'>Add a product image preview</span>
						)}
					</div>
				</div>

				<button
					type='submit'
					className='flex w-full justify-center rounded-full border border-transparent px-4 py-3 
					shadow-[0_16px_35px_rgba(78,90,55,0.24)] text-sm font-medium text-white bg-primary-olive hover:bg-accent-oliveDark 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-olive disabled:opacity-50 transition-colors duration-200 uppercase tracking-widest'
					disabled={loading}
				>
					{loading ? (
						<>
							<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
							Loading...
						</>
					) : (
						<>
							<PlusCircle className='mr-2 h-5 w-5' />
							Create Product
						</>
					)}
				</button>
			</form>
		</motion.div>
	);
};
export default CreateProductForm;
