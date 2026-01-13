"use client"

import { useState } from "react"
import { Search, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface BlogPost {
  id: number
  title: string
  titleKhmer: string
  category: string
  excerpt: string
  image: string
  date: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "How to Whiten Skin in 7 Days",
    titleKhmer: "របៀបមើលថែស្បែកមុខឱ្យស ក្នុងរយៈពេល ៧ ថ្ងៃ",
    category: "Skincare Tips",
    excerpt:
      "Discover our proven 7-day skincare routine to reveal brighter, more radiant skin. Learn the secrets used by skincare professionals.",
    image: "/skincare-routine.jpg",
    date: "Jan 15, 2024",
  },
  {
    id: 2,
    title: "Why Does Acne Never Go Away?",
    titleKhmer: "មូលហេតុដែលធ្វើឱ្យកើតមុនមិនបាត់?",
    category: "Acne Tips",
    excerpt:
      "Understanding the root causes of persistent acne and how modern science combined with natural ingredients can help eliminate it permanently.",
    image: "/acne-solution.jpg",
    date: "Jan 12, 2024",
  },
  {
    id: 3,
    title: "Benefits of AI Skin Analysis",
    titleKhmer: "អត្ថប្រយោជន៍នៃ AI ក្នុងការវិភាគស្បែក",
    category: "Lifestyle",
    excerpt:
      "Explore how artificial intelligence is revolutionizing personalized skincare. Get analyzed recommendations tailored specifically to your skin type.",
    image: "/ai-technology-concept.png",
    date: "Jan 10, 2024",
  },
  {
    id: 4,
    title: "Korean Beauty Secrets Revealed",
    category: "Beauty Tips",
    excerpt:
      "Learn the traditional Korean beauty rituals that have been passed down for generations and how CYRA incorporates them.",
    image: "/korean-skincare-products.png",
    date: "Jan 8, 2024",
  },
  {
    id: 5,
    title: "Natural Ingredients vs Chemicals",
    category: "Science",
    excerpt:
      "Understanding the balance between natural and scientifically-formulated ingredients for maximum skincare effectiveness.",
    image: "/natural-ingredients.png",
    date: "Jan 5, 2024",
  },
  {
    id: 6,
    title: "Winter Skincare Routine Guide",
    category: "Seasonal",
    excerpt:
      "Protect your skin during harsh winter months with our comprehensive guide to seasonal skincare adjustments.",
    image: "/winter-skincare-products.png",
    date: "Dec 28, 2023",
  },
]

const categories = ["All", "Skincare Tips", "Acne Tips", "Lifestyle", "Beauty Tips", "Science", "Seasonal"]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-light text-gray-900 mb-4"
          >
            Skincare Secrets & Tips
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Expert insights on skincare, beauty, and wellness from our AI-powered research team
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center bg-gray-100 rounded-full px-6 py-3 max-w-md mx-auto"
          >
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent ml-3 outline-none flex-1 text-gray-800 placeholder-gray-400"
            />
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="border-b border-gray-200 px-4 md:px-6">
        <div className="max-w-6xl mx-auto py-6">
          <div className="flex overflow-x-auto gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              <div className="grid gap-8">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group cursor-pointer"
                    >
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="sm:w-40 h-32 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full">
                              {post.category}
                            </span>
                            <span className="text-xs text-gray-500">{post.date}</span>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-pink-500 transition-colors">
                            {post.title}
                          </h3>
                          {post.titleKhmer && (
                            <p className="text-sm text-gray-500 mb-3 font-khmer">{post.titleKhmer}</p>
                          )}
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                          <button className="text-pink-500 font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                            Read More <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-600">No articles found. Try adjusting your search.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="hidden md:block">
              <div className="space-y-8">
                {/* Popular Posts */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Posts</h3>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 3).map((post) => (
                      <div key={post.id} className="pb-4 border-b border-gray-200 last:border-0 cursor-pointer group">
                        <p className="text-sm font-medium text-gray-900 group-hover:text-pink-500 transition-colors">
                          {post.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                  <div className="space-y-3">
                    {categories
                      .filter((c) => c !== "All")
                      .map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className="block w-full text-left text-sm text-gray-600 hover:text-pink-500 transition-colors"
                        >
                          {category}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
