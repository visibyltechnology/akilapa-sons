import { db } from '../firebase';
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const PRODUCTS_COLLECTION = 'products';

// Using picsum.photos for guaranteed working placeholder images
// Each seed gives a consistent unique image per product
const MOCK_PRODUCTS = [
  // Engine Oils
  {
    id: "mock_1", name: "Castrol Edge 5W-30 Advanced Full Synthetic Engine Oil",
    price: 15500, originalPrice: 18000,
    department: "Engine Oils", category: "Synthetic Oils", brand: "Castrol",
    images: ["https://picsum.photos/seed/castrol-edge/400/300"],
    description: "Premium full synthetic motor oil for maximum performance.",
    rating: 5, reviews: 128, stock: 24, badge: 'sale',
    features: ["Advanced protection", "5W-30", "Full Synthetic"], createdAt: new Date().toISOString()
  },
  {
    id: "mock_2", name: "Mobil 1 0W-40 Extended Performance Engine Oil (4L)",
    price: 19800,
    department: "Engine Oils", category: "Synthetic Oils", brand: "Mobil",
    images: ["https://picsum.photos/seed/mobil1-oil/400/300"],
    description: "Extended performance synthetic oil for high-mileage engines.",
    rating: 5, reviews: 94, stock: 18, badge: 'hot',
    features: ["0W-40", "Extended intervals", "Full Synthetic"], createdAt: new Date().toISOString()
  },
  {
    id: "mock_3", name: "Total Quartz 5W-40 INEO Engine Oil",
    price: 12000,
    department: "Engine Oils", category: "Synthetic Oils", brand: "Total",
    images: ["https://picsum.photos/seed/total-quartz/400/300"],
    description: "Fuel economy and emission system protection.",
    rating: 4, reviews: 67, stock: 32,
    features: ["5W-40", "Low SAPS", "Eco-friendly"], createdAt: new Date().toISOString()
  },
  // Tyres
  {
    id: "mock_4", name: "Michelin Primacy 4 Tyre 205/55 R16",
    price: 85000, originalPrice: 95000,
    department: "Tyres", category: "Premium Tyres", brand: "Michelin",
    images: ["https://images.unsplash.com/photo-1590401826012-70b86a34791a?auto=format&fit=crop&q=80&w=400"],
    description: "Excellent longevity, safety and wet grip.",
    rating: 5, reviews: 213, stock: 12, badge: 'sale',
    features: ["Long lasting", "Excellent grip", "Premium rubber"], createdAt: new Date().toISOString()
  },
  {
    id: "mock_5", name: "Bridgestone Turanza T005 225/45 R17",
    price: 78000,
    department: "Tyres", category: "Premium Tyres", brand: "Bridgestone",
    images: ["https://images.unsplash.com/photo-1558979158-65a1eaa08691?auto=format&fit=crop&q=80&w=400"],
    description: "Superior comfort and handling for luxury vehicles.",
    rating: 5, reviews: 156, stock: 8,
    features: ["Comfort ride", "Low noise", "Excellent handling"], createdAt: new Date().toISOString()
  },
  {
    id: "mock_6", name: "Continental PremiumContact 6 205/60 R15",
    price: 65000,
    department: "Tyres", category: "Mid-Range Tyres", brand: "Continental",
    images: ["https://images.unsplash.com/photo-1594536750974-1a85c3a8b8fa?auto=format&fit=crop&q=80&w=400"],
    description: "Outstanding performance in wet and dry conditions.",
    rating: 4, reviews: 89, stock: 20, badge: 'new',
    features: ["Wet braking", "Fuel efficient", "Low rolling resistance"], createdAt: new Date().toISOString()
  },
  // Batteries
  {
    id: "mock_7", name: "Bosch S4 Car Battery 12V 60Ah",
    price: 45000,
    department: "Batteries", category: "Maintenance-Free", brand: "Bosch",
    images: ["https://picsum.photos/seed/bosch-battery/400/300"],
    description: "Dependable starting power for all weather conditions.",
    rating: 5, reviews: 172, stock: 8,
    features: ["Maintenance-free", "12V 60Ah", "High CCA"], createdAt: new Date().toISOString()
  },
  {
    id: "mock_8", name: "Exide 12V 75Ah Heavy Duty Battery",
    price: 38500,
    department: "Batteries", category: "Maintenance-Free", brand: "Exide",
    images: ["https://picsum.photos/seed/exide-battery/400/300"],
    description: "High power reserve for modern vehicles with many electronics.",
    rating: 4, reviews: 55, stock: 14,
    features: ["75Ah", "5-year warranty", "Spill-proof"], createdAt: new Date().toISOString()
  },
  // Brake Systems
  {
    id: "mock_9", name: "Brembo Ceramic Premium Brake Pads (Front)",
    price: 25000,
    department: "Brake Systems", category: "Brake Pads", brand: "Brembo",
    images: ["https://images.unsplash.com/photo-1616790588674-6b2a0c4f83fb?auto=format&fit=crop&q=80&w=400"],
    description: "High-performance ceramic brake pads – minimal dust, maximum stopping.",
    rating: 5, reviews: 203, stock: 15,
    features: ["Ceramic", "Low dust", "Quiet"], createdAt: new Date().toISOString()
  },
  {
    id: "mock_10", name: "ATE Brake Disc Rotor (Front Pair)",
    price: 32000, originalPrice: 38000,
    department: "Brake Systems", category: "Brake Discs", brand: "ATE",
    images: ["https://picsum.photos/seed/ate-disc/400/300"],
    description: "OEM-quality ventilated brake discs for reliable stopping power.",
    rating: 4, reviews: 78, stock: 10, badge: 'sale',
    features: ["Ventilated", "OEM spec", "Anti-rust coating"], createdAt: new Date().toISOString()
  },
  // Engine Parts
  {
    id: "mock_11", name: "NGK Iridium IX Spark Plugs (Set of 4)",
    price: 18000,
    department: "Engine Parts", category: "Spark Plugs", brand: "NGK",
    images: ["https://picsum.photos/seed/ngk-spark/400/300"],
    description: "Iridium IX offers extreme ignitability and longer life.",
    rating: 5, reviews: 311, stock: 40, badge: 'hot',
    features: ["Iridium tip", "Anti-corrosion", "Better fuel efficiency"], createdAt: new Date().toISOString()
  },
  {
    id: "mock_12", name: "Gates Timing Belt Kit (OEM Match)",
    price: 28000,
    department: "Engine Parts", category: "Timing Belts", brand: "Gates",
    images: ["https://picsum.photos/seed/gates-timing/400/300"],
    description: "Complete OEM-match timing belt kit for reliable engine timing.",
    rating: 4, reviews: 45, stock: 7, badge: 'new',
    features: ["OEM match", "High tensile", "Heat resistant"], createdAt: new Date().toISOString()
  },
  // Filters
  {
    id: "mock_13", name: "K&N High Performance Washable Air Filter",
    price: 12500,
    department: "Filters", category: "Air Filters", brand: "K&N",
    images: ["https://picsum.photos/seed/kn-airfilter/400/300"],
    description: "Washable, reusable High-Flow Air Filter for improved performance.",
    rating: 4, reviews: 188, stock: 30,
    features: ["Washable", "High flow", "Reusable"], createdAt: new Date().toISOString()
  },
  {
    id: "mock_14", name: "Bosch Oil Filter (For Toyota/Honda)",
    price: 3500,
    department: "Filters", category: "Oil Filters", brand: "Bosch",
    images: ["https://picsum.photos/seed/bosch-oilfilter/400/300"],
    description: "Premium media oil filter for reliable filtration.",
    rating: 5, reviews: 241, stock: 60,
    features: ["99% filtration", "Anti-drain valve", "Easy fit"], createdAt: new Date().toISOString()
  },
  // Suspension
  {
    id: "mock_15", name: "Monroe Gas-Matic Shock Absorber (Front)",
    price: 22000,
    department: "Suspension", category: "Shock Absorbers", brand: "Monroe",
    images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=400"],
    description: "Gas-pressurized shock absorber for improved handling and comfort.",
    rating: 4, reviews: 93, stock: 16,
    features: ["Gas pressurized", "OEM fit", "Extended life"], createdAt: new Date().toISOString()
  },
  {
    id: "mock_16", name: "Kayaba Excel-G Strut Assembly (Rear)",
    price: 35000, originalPrice: 42000,
    department: "Suspension", category: "Struts", brand: "Kayaba",
    images: ["https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=400"],
    description: "Complete strut assembly for easy installation and OEM ride quality.",
    rating: 5, reviews: 61, stock: 5, badge: 'sale',
    features: ["Complete assembly", "OEM quality", "Easy install"], createdAt: new Date().toISOString()
  },
  // Electrical
  {
    id: "mock_17", name: "Denso Alternator 12V 90A (Universal Fit)",
    price: 55000,
    department: "Electrical", category: "Alternators", brand: "Denso",
    images: ["https://picsum.photos/seed/denso-alternator/400/300"],
    description: "High-output alternator for reliable charging performance.",
    rating: 4, reviews: 37, stock: 6, badge: 'new',
    features: ["90A output", "Universal fit", "OEM quality"], createdAt: new Date().toISOString()
  },
  {
    id: "mock_18", name: "Bosch Starter Motor (Toyota Corolla/Camry)",
    price: 48000,
    department: "Electrical", category: "Starter Motors", brand: "Bosch",
    images: ["https://picsum.photos/seed/bosch-starter/400/300"],
    description: "Reliable OEM-spec starter motor for effortless engine starting.",
    rating: 5, reviews: 29, stock: 4,
    features: ["OEM spec", "High torque", "All weather"], createdAt: new Date().toISOString()
  }
];

// Fetch all products
export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    if (querySnapshot.empty) {
      return MOCK_PRODUCTS;
    }
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching products: ", error);
    return MOCK_PRODUCTS;
  }
};

// Fetch single product by ID
export const getProduct = async (id) => {
  try {
    const mockProduct = MOCK_PRODUCTS.find(p => p.id === id);
    if (mockProduct) return mockProduct;

    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such product!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching product: ", error);
    return MOCK_PRODUCTS.find(p => p.id === id) || null;
  }
};

// Add a new product (Admin only)
export const addProduct = async (productData) => {
  try {
    const data = {
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), data);
    return docRef.id;
  } catch (error) {
    console.error("Error adding product: ", error);
    throw error;
  }
};

// Update an existing product (Admin only)
export const updateProduct = async (id, productData) => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await updateDoc(docRef, {
      ...productData,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error("Error updating product: ", error);
    throw error;
  }
};

// Delete a product (Admin only)
export const deleteProduct = async (id) => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting product: ", error);
    throw error;
  }
};
