"use client";

import React from "react";
import { motion } from "motion/react";
import { SOLUTIONS } from "@/components/public/solutions/solutionsData";
import { SolutionsHeader } from "@/components/public/solutions/SolutionsHeader";
import { SolutionCard } from "@/components/public/solutions/SolutionCard";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export default function SolutionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <SolutionsHeader />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {SOLUTIONS.map((sol) => (
          <motion.div
            key={sol.slug}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <SolutionCard solution={sol} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}