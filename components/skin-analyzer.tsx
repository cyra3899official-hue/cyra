"use client"

import { useState, useRef, useEffect } from "react"
import { Upload, AlertCircle, Check, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SkinAnalysisResult } from "@/components/skin-analysis-result"
import { analyzeSkinWithGemini } from "@/app/actions/gemini-analyze"
import { fileToBase64 } from "@/lib/firebase"
import { toast } from "sonner"
// 👇 IMPORT THE SHARED TYPE (Crucial for passing data correctly)
import { SkinAnalysisResponse } from "@/app/types"

type AnalyzerStep = "upload" | "preview" | "scanning" | "complete"

export function SkinAnalyzer() {
  const [step, setStep] = useState<AnalyzerStep>("upload")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)
  // 👇 Use the shared type here
  const [analysisResult, setAnalysisResult] = useState<SkinAnalysisResponse | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Validate image: min 200x200px, max 5MB
  const validateImage = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (file.size > maxSize) {
        setValidationError("File size must be under 5MB")
        resolve(false)
        return
      }

      const img = new Image()
      img.onload = () => {
        if (img.width < 200 || img.height < 200) {
          setValidationError("Image must be at least 200x200 pixels")
          resolve(false)
        } else {
          setValidationError(null)
          resolve(true)
        }
      }
      img.onerror = () => {
        setValidationError("Invalid image file")
        resolve(false)
      }
      img.src = URL.createObjectURL(file)
    })
  }

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setValidationError("Please upload an image file")
      return
    }

    const isValid = await validateImage(file)
    if (!isValid) {
      return
    }

    setUploadedFile(file)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    setStep("preview")
  }

  const handleStartAnalysis = async () => {
    if (!uploadedFile || !previewUrl) return

    console.log('🚀 [ANALYSIS STARTED]:', {
      fileName: uploadedFile.name,
      fileSize: uploadedFile.size,
      fileType: uploadedFile.type,
    })

    setStep("scanning")
    setIsAnimating(true)

    // Run scanning animation for 2-3 seconds
    await new Promise((resolve) => setTimeout(resolve, 2500))

    try {
      const base64 = await fileToBase64(uploadedFile)
      const mediaType = uploadedFile.type as "image/jpeg" | "image/png" | "image/webp"
      
      console.log('📤 [SENDING TO GEMINI]...')
      
      const result = await analyzeSkinWithGemini(base64, mediaType)
      
      // 🎨 Log received data for debugging
      console.log("🎨 [UI RECEIVED DATA]:", result)
      
      setAnalysisResult(result)
      setIsAnimating(false)
      setStep("complete")
      toast.success("Skin analysis complete! 🌸")
    } catch (error) {
      console.error("❌ [ANALYSIS FAILED]:", error)
      toast.error("Analysis failed. Please try again.")
      setStep("preview")
      setIsAnimating(false)
    }
  }

  const handleReupload = () => {
    setStep("upload")
    setUploadedFile(null)
    setPreviewUrl(null)
    setValidationError(null)
    setAnalysisResult(null)
  }

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-foreground mb-3">AI Skin Analyzer</h2>
          <p className="text-muted-foreground">Upload your selfie to get personalized skincare recommendations</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Step 1: Upload Zone */}
          {step === "upload" && (
            <Card
              className="border-2 border-dashed border-border hover:border-primary/30 transition-colors bg-secondary/30 cursor-pointer"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="p-12 flex flex-col items-center justify-center min-h-96">
                <div className="bg-primary/10 p-4 rounded-lg mb-4">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">Drag and drop your photo</h3>
                <p className="text-sm text-muted-foreground mb-6">or click to browse</p>
                <Button
                  onClick={handleUpload}
                  className="bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-medium"
                >
                  Upload Photo
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </Card>
          )}

          {/* Step 2 & 3: Preview + Scanning */}
          {(step === "preview" || step === "scanning" || step === "complete") && previewUrl && (
            <div className="flex flex-col gap-6">
              {/* Premium Preview Frame */}
              <Card className="bg-white border border-gray-200 p-6 shadow-lg rounded-2xl overflow-hidden">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  <img
                    src={previewUrl}
                    alt="Face preview"
                    className="w-full h-full object-cover"
                  />

                  {/* Scanning Animation Overlay */}
                  {isAnimating && (
                    <>
                      <div className="absolute inset-0 bg-black/10" />
                      <motion.div
                        className="absolute left-0 right-0 h-1 bg-gradient-to-b from-transparent via-pink-500 to-transparent shadow-lg shadow-pink-500/50"
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
                      />
                    </>
                  )}
                </div>
              </Card>

              {/* Action Buttons */}
              {step === "preview" && (
                <div className="flex gap-3">
                  <Button
                    onClick={handleStartAnalysis}
                    className="flex-1 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-medium py-3 text-lg"
                  >
                    ✨ Start AI Analysis
                  </Button>
                  <Button
                    onClick={handleReupload}
                    variant="outline"
                    className="flex-1 border border-gray-300 hover:bg-gray-50 rounded-lg font-medium py-3"
                  >
                    Re-upload
                  </Button>
                </div>
              )}

              {/* Error Message */}
              {validationError && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-sm text-red-600">{validationError}</p>
                </div>
              )}

              {/* Scanning State */}
              {step === "scanning" && (
                <div className="flex flex-col items-center gap-4 p-6 bg-pink-50 rounded-lg border border-pink-200">
                  <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
                  <div className="text-center">
                    <h4 className="font-medium text-foreground mb-1">Analyzing your skin...</h4>
                    <p className="text-sm text-muted-foreground">AI processing in progress</p>
                  </div>
                </div>
              )}

              {/* Complete State */}
              {step === "complete" && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center gap-4 p-6 bg-green-50 rounded-lg border border-green-200"
                >
                  <div className="bg-green-100 p-3 rounded-full">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-medium text-foreground mb-1">Analysis Complete!</h4>
                    <p className="text-sm text-muted-foreground">See your detailed report below</p>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* Quick Summary Card */}
          <Card className="bg-secondary/50 border border-border p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-medium text-foreground mb-6">Quick Summary</h3>
              <div className="space-y-4">
                <div className="pb-4 border-b border-border">
                  <p className="text-sm text-muted-foreground mb-1">Primary Concern</p>
                  <p className="text-lg font-medium text-foreground">
                    {step === "complete" && analysisResult ? analysisResult.problem : "Pending"}
                  </p>
                </div>
                <div className="pb-4 border-b border-border">
                  <p className="text-sm text-muted-foreground mb-1">Solution Timeline</p>
                  <p className="text-lg font-medium text-foreground">
                    {step === "complete" && analysisResult ? analysisResult.expectedResults : "Pending"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Recommended Product</p>
                  <p className="text-lg font-medium text-foreground">
                    {step === "complete" && analysisResult ? analysisResult.recommendedProduct.name : "Pending"}
                  </p>
                </div>
              </div>
            </div>
            {step === "complete" && (
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg mt-6">
                View Full Report
              </Button>
            )}
          </Card>
        </div>

        {/* Full Result Component */}
        {step === "complete" && analysisResult && <SkinAnalysisResult analysis={analysisResult} />}
      </div>
    </section>
  )
}