// seed.mjs — Run with: node seed.mjs
// Uploads mock car parts products to Firebase Firestore

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAkkLi4L1M2_Ty9YYvpM8DOWOZGbU0l9Hk",
  authDomain: "akilapaandsons-7d078.firebaseapp.com",
  projectId: "akilapaandsons-7d078",
  storageBucket: "akilapaandsons-7d078.firebasestorage.app",
  messagingSenderId: "517333369859",
  appId: "1:517333369859:web:d102870ecf6a09df51fa36",
  measurementId: "G-GZM9549THR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const LOGO = '/logo.jpeg';

const mockProducts = [
  // ── Tyres ──────────────────────────────────────────────────────────────────
  {
    name: "Michelin Primacy 4 Tyre 205/55 R16",
    price: 85000, originalPrice: 95000,
    department: "Tyres", category: "Premium Tyres", brand: "Michelin",
    images: [LOGO],
    description: "Excellent longevity, safety and wet grip for premium vehicles.",
    rating: 5, reviews: 213, stock: 12, badge: 'sale',
    features: ["Long lasting", "Excellent grip", "Premium rubber"],
  },
  {
    name: "Bridgestone Turanza T005 225/45 R17",
    price: 78000,
    department: "Tyres", category: "Premium Tyres", brand: "Bridgestone",
    images: [LOGO],
    description: "Superior comfort and handling for luxury vehicles.",
    rating: 5, reviews: 156, stock: 8,
    features: ["Comfort ride", "Low noise", "Excellent handling"],
  },
  {
    name: "Continental PremiumContact 6 205/60 R15",
    price: 65000,
    department: "Tyres", category: "Mid-Range Tyres", brand: "Continental",
    images: [LOGO],
    description: "Outstanding performance in wet and dry conditions.",
    rating: 4, reviews: 89, stock: 20, badge: 'new',
    features: ["Wet braking", "Fuel efficient", "Low rolling resistance"],
  },
  {
    name: "Dunlop Sport BluResponse 195/65 R15",
    price: 52000, originalPrice: 60000,
    department: "Tyres", category: "Mid-Range Tyres", brand: "Dunlop",
    images: [LOGO],
    description: "Balanced everyday tyre with great wet and dry handling.",
    rating: 4, reviews: 74, stock: 25, badge: 'sale',
    features: ["All-season", "Fuel saving", "Safe braking"],
  },
  {
    name: "Hankook Ventus S1 evo3 225/40 R18",
    price: 95000,
    department: "Tyres", category: "Performance Tyres", brand: "Hankook",
    images: [LOGO],
    description: "Ultra high-performance tyre for sports and luxury vehicles.",
    rating: 5, reviews: 41, stock: 6, badge: 'new',
    features: ["UHP", "Track-ready", "Summer performance"],
  },
  {
    name: "Maxxis MA-P3 215/60 R16 (Tyre + Tube)",
    price: 42000,
    department: "Tyres", category: "Tube Tyres", brand: "Maxxis",
    images: [LOGO],
    description: "Durable all-season tyre with inner tube, ideal for Nigerian roads.",
    rating: 4, reviews: 312, stock: 40,
    features: ["Tube type", "Puncture resistant", "Long mileage"],
  },

  // ── Engine Oils ────────────────────────────────────────────────────────────
  {
    name: "Castrol Edge 5W-30 Advanced Full Synthetic Engine Oil (4L)",
    price: 15500, originalPrice: 18000,
    department: "Engine Oils", category: "Synthetic Oils", brand: "Castrol",
    images: [LOGO],
    description: "Premium full synthetic motor oil for maximum performance.",
    rating: 5, reviews: 128, stock: 24, badge: 'sale',
    features: ["Advanced protection", "5W-30", "Full Synthetic"],
  },
  {
    name: "Mobil 1 0W-40 Extended Performance Engine Oil (4L)",
    price: 19800,
    department: "Engine Oils", category: "Synthetic Oils", brand: "Mobil",
    images: [LOGO],
    description: "Extended performance synthetic oil for high-mileage engines.",
    rating: 5, reviews: 94, stock: 18, badge: 'hot',
    features: ["0W-40", "Extended intervals", "Full Synthetic"],
  },
  {
    name: "Total Quartz 5W-40 INEO Engine Oil (4L)",
    price: 12000,
    department: "Engine Oils", category: "Synthetic Oils", brand: "Total",
    images: [LOGO],
    description: "Fuel economy and emission system protection.",
    rating: 4, reviews: 67, stock: 32,
    features: ["5W-40", "Low SAPS", "Eco-friendly"],
  },
  {
    name: "Shell Helix Ultra 5W-40 Engine Oil (4L)",
    price: 17500,
    department: "Engine Oils", category: "Synthetic Oils", brand: "Shell",
    images: [LOGO],
    description: "Shell's best formula for engine cleanliness and protection.",
    rating: 5, reviews: 205, stock: 20, badge: 'hot',
    features: ["PurePlus Technology", "5W-40", "Full Synthetic"],
  },

  // ── Batteries ──────────────────────────────────────────────────────────────
  {
    name: "Bosch S4 Car Battery 12V 60Ah",
    price: 45000,
    department: "Batteries", category: "Maintenance-Free", brand: "Bosch",
    images: [LOGO],
    description: "Dependable starting power for all weather conditions.",
    rating: 5, reviews: 172, stock: 8,
    features: ["Maintenance-free", "12V 60Ah", "High CCA"],
  },
  {
    name: "Exide 12V 75Ah Heavy Duty Battery",
    price: 38500,
    department: "Batteries", category: "Maintenance-Free", brand: "Exide",
    images: [LOGO],
    description: "High power reserve for modern vehicles with many electronics.",
    rating: 4, reviews: 55, stock: 14,
    features: ["75Ah", "5-year warranty", "Spill-proof"],
  },

  // ── Brake Systems ──────────────────────────────────────────────────────────
  {
    name: "Brembo Ceramic Premium Brake Pads (Front)",
    price: 25000,
    department: "Brake Systems", category: "Brake Pads", brand: "Brembo",
    images: [LOGO],
    description: "High-performance ceramic brake pads – minimal dust, maximum stopping.",
    rating: 5, reviews: 203, stock: 15,
    features: ["Ceramic", "Low dust", "Quiet"],
  },
  {
    name: "ATE Brake Disc Rotor (Front Pair)",
    price: 32000, originalPrice: 38000,
    department: "Brake Systems", category: "Brake Discs", brand: "ATE",
    images: [LOGO],
    description: "OEM-quality ventilated brake discs for reliable stopping power.",
    rating: 4, reviews: 78, stock: 10, badge: 'sale',
    features: ["Ventilated", "OEM spec", "Anti-rust coating"],
  },

  // ── Engine Parts ───────────────────────────────────────────────────────────
  {
    name: "NGK Iridium IX Spark Plugs (Set of 4)",
    price: 18000,
    department: "Engine Parts", category: "Spark Plugs", brand: "NGK",
    images: [LOGO],
    description: "Iridium IX offers extreme ignitability and longer life.",
    rating: 5, reviews: 311, stock: 40, badge: 'hot',
    features: ["Iridium tip", "Anti-corrosion", "Better fuel efficiency"],
  },
  {
    name: "Gates Timing Belt Kit (OEM Match)",
    price: 28000,
    department: "Engine Parts", category: "Timing Belts", brand: "Gates",
    images: [LOGO],
    description: "Complete OEM-match timing belt kit for reliable engine timing.",
    rating: 4, reviews: 45, stock: 7, badge: 'new',
    features: ["OEM match", "High tensile", "Heat resistant"],
  },

  // ── Filters ────────────────────────────────────────────────────────────────
  {
    name: "K&N High Performance Washable Air Filter",
    price: 12500,
    department: "Filters", category: "Air Filters", brand: "K&N",
    images: [LOGO],
    description: "Washable, reusable High-Flow Air Filter for improved performance.",
    rating: 4, reviews: 188, stock: 30,
    features: ["Washable", "High flow", "Reusable"],
  },
  {
    name: "Bosch Oil Filter (For Toyota/Honda)",
    price: 3500,
    department: "Filters", category: "Oil Filters", brand: "Bosch",
    images: [LOGO],
    description: "Premium media oil filter for reliable filtration.",
    rating: 5, reviews: 241, stock: 60,
    features: ["99% filtration", "Anti-drain valve", "Easy fit"],
  },

  // ── Suspension ─────────────────────────────────────────────────────────────
  {
    name: "Monroe Gas-Matic Shock Absorber (Front)",
    price: 22000,
    department: "Suspension", category: "Shock Absorbers", brand: "Monroe",
    images: [LOGO],
    description: "Gas-pressurized shock absorber for improved handling and comfort.",
    rating: 4, reviews: 93, stock: 16,
    features: ["Gas pressurized", "OEM fit", "Extended life"],
  },
  {
    name: "Kayaba Excel-G Strut Assembly (Rear)",
    price: 35000, originalPrice: 42000,
    department: "Suspension", category: "Struts", brand: "Kayaba",
    images: [LOGO],
    description: "Complete strut assembly for easy installation and OEM ride quality.",
    rating: 5, reviews: 61, stock: 5, badge: 'sale',
    features: ["Complete assembly", "OEM quality", "Easy install"],
  },

  // ── Electrical ─────────────────────────────────────────────────────────────
  {
    name: "Denso Alternator 12V 90A (Universal Fit)",
    price: 55000,
    department: "Electrical", category: "Alternators", brand: "Denso",
    images: [LOGO],
    description: "High-output alternator for reliable charging performance.",
    rating: 4, reviews: 37, stock: 6, badge: 'new',
    features: ["90A output", "Universal fit", "OEM quality"],
  },
  {
    name: "Bosch Starter Motor (Toyota Corolla/Camry)",
    price: 48000,
    department: "Electrical", category: "Starter Motors", brand: "Bosch",
    images: [LOGO],
    description: "Reliable OEM-spec starter motor for effortless engine starting.",
    rating: 5, reviews: 29, stock: 4,
    features: ["OEM spec", "High torque", "All weather"],
  },
];

async function clearExistingProducts() {
  console.log('🗑  Clearing existing products from Firestore...');
  const snapshot = await getDocs(collection(db, 'products'));
  const deletePromises = snapshot.docs.map(d => deleteDoc(doc(db, 'products', d.id)));
  await Promise.all(deletePromises);
  console.log(`   Deleted ${snapshot.docs.length} existing product(s).`);
}

async function seedProducts() {
  console.log('\n🌱 Seeding products to Firebase Firestore...\n');

  for (let i = 0; i < mockProducts.length; i++) {
    const product = {
      ...mockProducts[i],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const docRef = await addDoc(collection(db, 'products'), product);
    console.log(`  ✅ [${i + 1}/${mockProducts.length}] ${product.name} → ${docRef.id}`);
  }

  console.log(`\n🎉 Done! ${mockProducts.length} products seeded successfully.`);
  process.exit(0);
}

async function main() {
  try {
    await clearExistingProducts();
    await seedProducts();
  } catch (err) {
    console.error('❌ Error seeding:', err);
    process.exit(1);
  }
}

main();
