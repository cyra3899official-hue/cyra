"use client"

import { motion } from "framer-motion"
import { Sparkles, Leaf, Shield } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="py-24 px-4 md:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-light text-gray-900 mb-6"
          >
            Science Meets Nature
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-600"
          >
            The story of CYRA and our mission to revolutionize skincare with AI
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                CYRA was born from the intersection of cutting-edge artificial intelligence and centuries-old Korean
                skincare traditions. We believe that beautiful, healthy skin starts with understanding your unique skin
                profile.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our team of dermatologists and AI engineers worked tirelessly to create a technology that can analyze
                your skin with precision, then formulate personalized skincare solutions using the finest natural and
                scientifically-proven ingredients.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Every CYRA product combines Korean formulation expertise with AI-powered personalization, ensuring you
                get exactly what your skin needs—nothing more, nothing less.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-300 aspect-square rounded-lg overflow-hidden"
            >
              <img src="/luxury-skincare-lab.jpg" alt="CYRA Lab" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-light text-gray-900"
            >
              Our Core Values
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "AI Precision",
                description:
                  "Our advanced AI technology analyzes your skin with clinical accuracy, providing personalized recommendations tailored to your unique needs.",
              },
              {
                icon: Leaf,
                title: "Premium Ingredients",
                description:
                  "We source nature-derived ingredients from sustainable farms, combined with scientific innovation for maximum efficacy.",
              },
              {
                icon: Shield,
                title: "Trust & Safety",
                description:
                  "Every product is dermatologist-tested and safe for all skin types. Your trust is our priority.",
              },
            ].map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-light text-gray-900 mb-4"
          >
            Meet the Experts Behind CYRA
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            Our team combines expertise in dermatology, AI technology, and Korean beauty traditions to create the
            perfect skincare solution for you.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Dr. Min-jun Park", role: "Chief Dermatologist", image: "/korean-dermatologist.jpg" },
              { name: "Sarah Kim", role: "AI Research Lead", image: "/woman-engineer-at-work.png" },
              { name: "Cyra Chen", role: "Founder & CEO", image: "/woman-ceo.png" },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-gray-300 aspect-square rounded-lg overflow-hidden mb-4">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
