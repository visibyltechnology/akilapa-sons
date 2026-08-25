import { db } from '../firebase';
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const PRODUCTS_COLLECTION = 'products';

const MOCK_PRODUCTS = [
  {
    id: "mock_1",
    name: "Castrol Edge 5W-30 Advanced Full Synthetic Engine Oil",
    price: 15500,
    department: "Engine Oils",
    brand: "Castrol",
    images: ["https://m.media-amazon.com/images/I/71uK5cWkQ-L._AC_SX679_.jpg"],
    description: "Premium full synthetic motor oil designed for maximum performance and protection.",
    rating: 4.8,
    stock: 24,
    features: ["Advanced protection", "5W-30", "Full Synthetic"],
    createdAt: new Date().toISOString()
  },
  {
    id: "mock_2",
    name: "Michelin Primacy 4 Car Tyre (205/55 R16)",
    price: 85000,
    department: "Premium Tyres",
    brand: "Michelin",
    images: ["https://m.media-amazon.com/images/I/61q3kFpB9jL._AC_SX679_.jpg"],
    description: "Experience excellent longevity, safety and grip with Michelin Primacy 4.",
    rating: 4.9,
    stock: 12,
    features: ["Long lasting", "Excellent grip", "Premium rubber"],
    createdAt: new Date().toISOString()
  },
  {
    id: "mock_3",
    name: "Bosch S4 Car Battery (12V 60Ah)",
    price: 45000,
    department: "Batteries",
    brand: "Bosch",
    images: ["https://m.media-amazon.com/images/I/71Q2Uj+mRcL._AC_SX679_.jpg"],
    description: "Dependable starting power for all weather conditions. Maintenance-free.",
    rating: 4.7,
    stock: 8,
    features: ["Maintenance-free", "12V 60Ah", "High cold cranking amps"],
    createdAt: new Date().toISOString()
  },
  {
    id: "mock_4",
    name: "Brembo Ceramic Premium Brake Pads",
    price: 25000,
    department: "Brake Systems",
    brand: "Brembo",
    images: ["https://m.media-amazon.com/images/I/71Tbz6-lYSL._AC_SX679_.jpg"],
    description: "High-performance ceramic brake pads designed for minimal dust and maximum stopping power.",
    rating: 4.6,
    stock: 15,
    features: ["Ceramic technology", "Low dust", "Quiet operation"],
    createdAt: new Date().toISOString()
  },
  {
    id: "mock_5",
    name: "NGK Iridium IX Spark Plug (Set of 4)",
    price: 18000,
    department: "Engine Parts",
    brand: "NGK",
    images: ["https://m.media-amazon.com/images/I/71G+a6Xn8XL._AC_SX679_.jpg"],
    description: "Designed specifically for the performance enthusiast. Iridium IX offers extreme ignitability.",
    rating: 4.9,
    stock: 40,
    features: ["Iridium tip", "Anti-corrosion", "Better fuel efficiency"],
    createdAt: new Date().toISOString()
  },
  {
    id: "mock_6",
    name: "K&N High Performance Air Filter",
    price: 12500,
    department: "Filters",
    brand: "K&N",
    images: ["https://m.media-amazon.com/images/I/71X0qR-Q+kL._AC_SX679_.jpg"],
    description: "Washable, reusable High-Flow Air Filter designed to improve performance.",
    rating: 4.5,
    stock: 30,
    features: ["Washable", "High flow", "Reusable"],
    createdAt: new Date().toISOString()
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
    // Check mock first
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
    // Basic defaults if needed
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
