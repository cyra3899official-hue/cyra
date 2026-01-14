"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, doc, setDoc, writeBatch } from "firebase/firestore";
import { products } from "@/lib/products"; // <--- យកទិន្នន័យពី File ដែលបងបានកែ Link រូបភាពរួច

export default function AdminSeeder() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    setLoading(true);
    setStatus("កំពុងរៀបចំ Upload...");

    try {
      // ប្រើ Batch ដើម្បីដាក់ចូលម្តងទាំងអស់ (លឿននិងសុវត្ថិភាព)
      const batch = writeBatch(db);

      products.forEach((product) => {
        // បង្កើតឯកសារថ្មីក្នុង Collection ឈ្មោះ "products"
        const docRef = doc(collection(db, "products"), product.id.toString());
        batch.set(docRef, {
          ...product,
          createdAt: new Date().toISOString(),
          stock: 50, // ដាក់ Stock លេងៗសិន
          rating: 5.0
        });
      });

      await batch.commit();
      setStatus("ជោគជ័យ! ✅ ផលិតផលទាំងអស់បានចូលក្នុង Firebase ហើយ!");
    } catch (error) {
      console.error(error);
      setStatus("បរាជ័យ! ❌ សូមមើល Console (F12)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 left-10 z-50 bg-white p-6 rounded-xl shadow-2xl border-2 border-red-500">
      <h3 className="font-bold text-red-600 mb-2">Admin Tool (សម្ងាត់)</h3>
      <button 
        onClick={handleUpload}
        disabled={loading}
        className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? "កំពុង Upload..." : "Upload ផលិតផលចូល Cloud ☁️"}
      </button>
      {status && <p className="mt-2 text-sm font-medium text-gray-700">{status}</p>}
    </div>
  );
}
