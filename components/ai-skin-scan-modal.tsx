"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Upload, Camera, Sparkles, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

interface AISkinScanModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AISkinScanModal({ isOpen, onClose }: AISkinScanModalProps) {
  const { t } = useLanguage()
  const [stage, setStage] = useState<"upload" | "scanning" | "results">("upload")
  const [scanProgress, setScanProgress] = useState(0)
  const [scanningMessage, setScanningMessage] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [usingCamera, setUsingCamera] = useState(false)

  const scanningMessages = [
    { en: "Analyzing texture", km: "វិភាគសំណើម" },
    { en: "Assessing hydration", km: "វាយតម្លៃជាតិទឹក" },
    { en: "Detecting pigmentation", km: "រកឃើញពណ៌" },
    { en: "Finalizing results", km: "បញ្ចប់លទ្ធផល" },
  ]

  useEffect(() => {
    if (stage === "scanning") {
      let progress = 0
      let messageIndex = 0

      const interval = setInterval(() => {
        progress += 2
        setScanProgress(progress)

        if (progress % 25 === 0 && messageIndex < scanningMessages.length) {
          setScanningMessage(scanningMessages[messageIndex].en)
          messageIndex++
        }

        if (progress >= 100) {
          clearInterval(interval)
          setTimeout(() => setStage("results"), 500)
        }
      }, 50)

      return () => clearInterval(interval)
    }
  }, [stage])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string)
        setStage("scanning")
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        setUsingCamera(true)
      }
    } catch (err) {
      console.error("Camera access denied:", err)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas")
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const ctx = canvas.getContext("2d")
      ctx?.drawImage(videoRef.current, 0, 0)
      const imageData = canvas.toDataURL("image/jpeg")
      setSelectedImage(imageData)

      // Stop camera stream
      const stream = videoRef.current.srcObject as MediaStream
      stream?.getTracks().forEach((track) => track.stop())
      setUsingCamera(false)
      setStage("scanning")
    }
  }

  const resetModal = () => {
    setStage("upload")
    setScanProgress(0)
    setSelectedImage(null)
    setUsingCamera(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>

            <div className="p-8">
              {stage === "upload" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                  <h2 className="text-3xl font-extrabold mb-2" style={{ color: "var(--color-primary-pink)" }}>
                    {t("AI Skin Scan", "ស្កេនស្បែកដោយ AI")}
                  </h2>
                  <p className="text-lg font-medium mb-6" style={{ color: "var(--color-active-purple)" }}>
                    {t("Get personalized skincare recommendations", "ទទួលបានអនុសាសន៍ថែស្បែកផ្ទាល់ខ្លួន")}
                  </p>
                  <p className="text-sm text-gray-600 mb-8">
                    {t(
                      "Upload a clear, well-lit photo of your face or take one now for instant analysis",
                      "ផ្ទុកឡើងរូបថតមុខច្បាស់ដែលមានពន្លឺល្អ ឬថតមួយឥឡូវនេះសម្រាប់ការវិភាគភ្លាមៗ",
                    )}
                  </p>

                  {usingCamera ? (
                    <div className="mb-6">
                      <video ref={videoRef} className="w-full rounded-lg mb-4" />
                      <Button
                        onClick={capturePhoto}
                        className="font-bold text-white rounded-[12px] shadow-[0_8px_24px_rgba(124,58,237,0.08)] hover:brightness-95 active:scale-95 transition-all"
                        style={{ backgroundColor: "var(--color-primary-pink)" }}
                      >
                        <Camera className="mr-2 h-5 w-5" />
                        {t("Capture Photo", "ថតរូប")}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />

                      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          size="lg"
                          className="w-full font-bold text-white rounded-[12px] shadow-[0_8px_24px_rgba(124,58,237,0.08)] hover:brightness-95 transition-all"
                          style={{ backgroundColor: "var(--color-primary-pink)" }}
                        >
                          <Upload className="mr-2 h-5 w-5" />
                          {t("Upload Photo", "ផ្ទុកឡើងរូបថត")}
                        </Button>
                      </motion.div>

                      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={handleCameraCapture}
                          size="lg"
                          variant="outline"
                          className="w-full font-medium rounded-[12px] transition-all bg-transparent"
                          style={{
                            borderColor: "var(--color-primary-pink)",
                            color: "var(--color-primary-pink)",
                          }}
                        >
                          <Camera className="mr-2 h-5 w-5" />
                          {t("Take Photo", "ថតរូប")}
                        </Button>
                      </motion.div>
                    </div>
                  )}

                  <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-2 font-medium">
                      {t("Tips for best results:", "ជំនួយសម្រាប់លទ្ធផលល្អបំផុត:")}
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1 text-left">
                      <li>• {t("Use natural lighting", "ប្រើពន្លឺធម្មជាតិ")}</li>
                      <li>• {t("Face the camera directly", "មុខត្រង់ទៅកាមេរ៉ា")}</li>
                      <li>• {t("Remove makeup if possible", "ដកគ្រឿងសម្អាងបើអាច")}</li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {stage === "scanning" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                  <div className="relative w-48 h-48 mx-auto mb-8">
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(var(--color-active-purple) ${scanProgress}%, #f3f4f6 ${scanProgress}%)`,
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                      <Sparkles className="h-16 w-16" style={{ color: "var(--color-primary-pink)" }} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--color-primary-pink)" }}>
                    {t("Analyzing Your Skin", "កំពុងវិភាគស្បែករបស់អ្នក")}
                  </h3>
                  <p className="text-lg font-medium mb-4" style={{ color: "var(--color-active-purple)" }}>
                    {scanProgress}%
                  </p>
                  <motion.p
                    key={scanningMessage}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-gray-600"
                  >
                    {scanningMessage}
                  </motion.p>
                </motion.div>
              )}

              {stage === "results" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                    >
                      <CheckCircle2
                        className="h-16 w-16 mx-auto mb-4"
                        style={{ color: "var(--color-active-purple)" }}
                      />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--color-primary-pink)" }}>
                      {t("Analysis Complete", "ការវិភាគបញ្ចប់")}
                    </h3>
                    <p className="text-gray-600">
                      {t("Here are your personalized results", "នេះគឺជាលទ្ធផលផ្ទាល់ខ្លួនរបស់អ្នក")}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl">
                    <h4 className="font-bold mb-3" style={{ color: "var(--color-primary-pink)" }}>
                      {t("Skin Concerns Detected", "បញ្ហាស្បែកដែលរកឃើញ")}
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{t("Hydration", "ជាតិទឹក")}</span>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-bold text-white"
                          style={{ backgroundColor: "var(--color-primary-pink)" }}
                        >
                          {t("Low", "ទាប")}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{t("Fine Lines", "ស្នាមជ្រួញ")}</span>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-bold text-white"
                          style={{ backgroundColor: "var(--color-active-purple)" }}
                        >
                          {t("Moderate", "មធ្យម")}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{t("Dark Spots", "ស្នាមចំណុចខ្មៅ")}</span>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-bold text-white"
                          style={{ backgroundColor: "var(--color-primary-pink)" }}
                        >
                          {t("Mild", "ស្រាល")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold mb-3" style={{ color: "var(--color-active-purple)" }}>
                      {t("Recommended Products", "ផលិតផលដែលបានណែនាំ")}
                    </h4>
                    <div className="space-y-3">
                      <div className="border rounded-lg p-4 flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg" />
                        <div className="flex-1">
                          <h5 className="font-semibold text-sm">{t("Hydrating Serum", "សេរ៉ូមបន្ថែមទឹក")}</h5>
                          <p className="text-xs text-gray-600">{t("For intense hydration", "សម្រាប់ជាតិទឹកខ្លាំង")}</p>
                        </div>
                        <Button
                          size="sm"
                          className="font-bold text-white rounded-lg"
                          style={{ backgroundColor: "var(--color-primary-pink)" }}
                        >
                          {t("Add", "បន្ថែម")}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={resetModal}
                      variant="outline"
                      className="flex-1 rounded-lg bg-transparent"
                      style={{ borderColor: "var(--color-primary-pink)", color: "var(--color-primary-pink)" }}
                    >
                      {t("Scan Again", "ស្កេនម្តងទៀត")}
                    </Button>
                    <Button
                      onClick={onClose}
                      className="flex-1 font-bold text-white rounded-lg"
                      style={{ backgroundColor: "var(--color-active-purple)" }}
                    >
                      {t("View All Products", "មើលផលិតផលទាំងអស់")}
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
