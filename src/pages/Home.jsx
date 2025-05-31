
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";


export default function Home() {
    
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-purple-100 to-white">
      {/* Header Section */}
      <header className="p-6 flex justify-between items-center">
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-purple-700"
        >
          EasyApply
        </motion.h1>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link to="/signup">
            <Button variant="default">Sign up</Button>
          </Link>
        </motion.div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col md:flex-row items-center justify-center text-center md:text-left px-6 md:px-20 py-16 gap-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex-1"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Get Your Loan Fast & Easy
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Apply for loans with ease using our simple sign-up process. Get approved faster than ever before.
          </p>
          <Link to="/signup">
            <Button className="text-lg px-6 py-3">Start Now</Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex-1 flex justify-center"
        >
          <img
            src="https://media.giphy.com/media/Ll22OhMLAlVDb8UQWe/giphy.gif"
            alt="Loan Application"
            className="rounded-xl  w-full max-w-md"
          />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} EasyApply. All rights reserved.
      </footer>
    </div>
  );
}
