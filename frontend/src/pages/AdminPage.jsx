import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import { useProductStore } from "../stores/useProductStore";
import PageIntro from "../components/PageIntro";

const tabs = [
	{ id: "create", label: "Create Product", icon: PlusCircle },
	{ id: "products", label: "Products", icon: ShoppingBasket },
	{ id: "analytics", label: "Analytics", icon: BarChart },
];

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState("create");
	const { fetchAllProducts } = useProductStore();

	useEffect(() => {
		fetchAllProducts();
	}, [fetchAllProducts]);

	return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f1e8] py-16">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(227,205,181,0.7),_transparent_60%)]" />
      <div className="relative z-10 container mx-auto px-4">
        <motion.h1
          className="mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <PageIntro
            eyebrow="Esta control room"
            title="Admin Dashboard"
            description="Manage products, monitor performance, and shape the latest Esta edits from one place."
          />
        </motion.h1>
        {/* shadow-[0_18px_50px_rgba(0,0,0,0.08)] */}
        <div className="mb-8 flex flex-wrap justify-center gap-3 rounded-[2rem] p-4 backdrop-blur-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center rounded-full px-5 py-3 transition-colors duration-200 uppercase tracking-widest text-xs font-medium ${
                activeTab === tab.id
                  ? "bg-primary-olive text-white shadow-[0_16px_35px_rgba(78,90,55,0.24)]"
                  : "border border-neutral-greige/20 bg-white text-primary-terracotta hover:bg-neutral-background/80"
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>
        <div className="rounded-[2rem] p-5 backdrop-blur-sm md:p-6">
          {activeTab === "create" && <CreateProductForm />}
          {activeTab === "products" && <ProductsList />}
          {activeTab === "analytics" && <AnalyticsTab />}
        </div>
      </div>
    </div>
  );
};
export default AdminPage;
