"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";

export default function Home() {
  const [name, setName] = useState("B.Tech Student");
  const [projects, setProjects] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const profSnap = await getDoc(doc(db, "settings", "profile"));
        if (profSnap.exists() && profSnap.data().name) setName(profSnap.data().name);

        const projSnap = await getDocs(collection(db, "projects"));
        setProjects(projSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        const expSnap = await getDocs(collection(db, "experiences"));
        setExperiences(expSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto"
      >
        <header className="py-20 text-center border-b border-slate-700">
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-4">
            {name}
          </h1>
          <p className="text-xl text-slate-300">Electronics & Software Engineer Portfolio</p>
        </header>

        <section className="py-12">
          <h2 className="text-3xl font-bold mb-8 border-l-4 border-blue-500 pl-4">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(p => (
              <motion.div key={p.id} whileHover={{ scale: 1.02 }} className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700 hover:border-blue-500 transition-colors flex flex-col">
                {p.imageUrl && p.showImagePreview && (
                  <img src={p.imageUrl} alt={p.title} className="w-full h-48 object-cover border-b border-slate-700" />
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2 text-blue-400">{p.title}</h3>
                  <p className="text-slate-300 mb-4 text-sm flex-1">{p.description}</p>
                  <div>
                    <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-semibold uppercase tracking-wider">
                      {p.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-12">
          <h2 className="text-3xl font-bold mb-8 border-l-4 border-purple-500 pl-4">Experience & Internships</h2>
          <div className="space-y-6">
            {experiences.map(e => (
              <motion.div key={e.id} whileHover={{ x: 5 }} className="bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700 flex flex-col md:flex-row gap-6 items-start">
                {e.imageUrl && e.showImagePreview && (
                  <img src={e.imageUrl} alt={e.company} className="w-24 h-24 object-cover rounded shadow bg-slate-700" />
                )}
                <div>
                  <h3 className="text-2xl font-bold text-blue-400">{e.title}</h3>
                  <p className="text-lg text-slate-300 font-medium">{e.company} &bull; <span className="text-purple-400">{e.type}</span></p>
                  <p className="text-slate-400 mt-2">{e.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </motion.div>
    </main>
  );
}
