import { HeroSection } from "@/components/hero-section"
import { SkinAnalyzer } from "@/components/skin-analyzer"
import { FloatingChatbot } from "@/components/floating-chatbot"
import AdminSeeder from "@/components/AdminSeeder" // <--- Import ថ្មី (Admin Tool)

export default function Home() {
  return (
    <main className="bg-white">
      <HeroSection />
      <SkinAnalyzer />
      <FloatingChatbot />
      
      {/* ប៊ូតុងនេះនឹងលេចចេញនៅជ្រុងឆ្វេងក្រោម ដើម្បីឱ្យបងចុច Upload ផលិតផល */}
      <AdminSeeder /> 
    </main>
  )
}
