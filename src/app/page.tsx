"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";

export default function Home() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
    fetchProjects();
  }, []);

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <header className="py-20 text-center border-b border-slate-700">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-4">
            B.Tech Student Portfolio
          </h1>
          <p className="text-xl text-slate-300">Electronics & Software Engineer</p>
        </header>

        <section className="py-12">
          <h2 className="text-3xl font-bold mb-8">My Projects</h2>
          {projects.length === 0 ? (
            <div className="p-6 bg-slate-800 rounded-lg border border-slate-700 text-center">
              <p className="text-slate-400">No projects found. Add some from the Admin Dashboard!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map(project => (
                <motion.div 
                  key={project.id} 
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-slate-800 rounded-lg shadow-lg border border-slate-700 hover:border-blue-500 transition-colors"
                >
                  <h3 className="text-xl font-bold mb-2 text-blue-400">{project.title}</h3>
                  <p className="text-slate-300 mb-4">{project.description}</p>
                  <div className="flex gap-2">
                    <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                      {project.category || "General"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </motion.div>
    </main>
  );
}
