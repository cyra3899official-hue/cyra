'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'
import { SkinAnalysisResponse } from '@/app/type' // ✅ Correct Import

// Initialize API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

// ❌ DELETED: Duplicate interface definition. We use the one from '@/app/types' now.

/**
 * Load skin analysis rules from knowledge base file
 * Uses DYNAMIC IMPORTS to avoid "Module not found: fs" errors in the browser
 */
async function loadSkinAnalysisRules(): Promise<string> {
  try {
    // ✅ FIX: Import fs and path dynamically only when running on the server
    const fs = await import('fs')
    const path = await import('path')
    
    // Check 'knowledges' folder (matches your file structure)
    let filePath = path.join(process.cwd(), 'knowledges', 'ai-analysis-skin.md')
    
    // Fallback to 'knowledge' if 'knowledges' doesn't exist
    if (!fs.existsSync(filePath)) {
      filePath = path.join(process.cwd(), 'knowledge', 'ai-analysis-skin.md')
    }

    if (!fs.existsSync(filePath)) {
      console.warn('⚠️ Knowledge base file not found at:', filePath)
      return ''
    }

    const rules = fs.readFileSync(filePath, 'utf-8')
    console.log('📖 [CYRA AI] Loaded Rules from:', filePath)
    return rules
  } catch (error) {
    console.error('❌ [CYRA AI] Error loading rules:', error)
    return ''
  }
}

/**
 * Analyze skin from an image using Gemini 1.5 Flash
 */
export async function analyzeSkinWithGemini(
  imageBase64: string,
  imageMediaType: 'image/jpeg' | 'image/png' | 'image/webp' = 'image/jpeg'
): Promise<SkinAnalysisResponse> {
  
  if (!process.env.GEMINI_API_KEY) {
    console.log('⚠️ GEMINI_API_KEY missing - using mock analysis')
    return getMockSkinAnalysis()
  }

  try {
    // 1. Load Rules Dynamically
    const skinRules = await loadSkinAnalysisRules()
    
    // 2. System Instruction
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: "application/json"
      }
    })

    // 3. User Prompt with embedded rules
    const userPrompt = `${skinRules}
      
      Analyze this image acting as Sister Cyra.
      
      Determine the skin condition (Acne, Melasma, Normal, etc.) and severity.
      Select the EXACT product from the CYRA CATALOG based on the "PRODUCT RECOMMENDATION LOGIC".
      
      Output strictly in JSON format with the required fields including 'clinical_reasoning'.
      Ensure language is professional Khmer.
    `

    console.log('🚀 [CYRA AI] Sending request to Gemini...')

    const result = await model.generateContent([
      {
        inlineData: {
          data: imageBase64,
          mimeType: imageMediaType,
        },
      },
      userPrompt,
    ])

    const responseText = result.response.text()
    console.log('🤖 [CYRA AI] Raw Response:', responseText.substring(0, 100) + "...")

    // Clean JSON
    let jsonString = responseText.replace(/```json/g, '').replace(/```/g, '').trim()
    
    const analysis: SkinAnalysisResponse = JSON.parse(jsonString)
    return analysis

  } catch (error) {
    console.error('❌ [CYRA AI] Gemini Failed:', error)
    return getMockSkinAnalysis()
  }
}

/**
 * Fallback mock analysis
 */
export async function getMockSkinAnalysis(): Promise<SkinAnalysisResponse> {
  return {
    clinical_reasoning: "ស្បែកមុខមានស្នាមអុចខ្មៅ និងជាំស្រាលៗ ដែលបណ្តាលមកពីកំដៅថ្ងៃ។ (Mock Data)",
    problem: "បញ្ហាជាំ និងអុចខ្មៅ (Melasma & Dark Spots)",
    rootCauses: [
      "ការប៉ះពាល់កាំរស្មី UV ពីព្រះអាទិត្យខ្លាំង",
      "ការផ្លាស់ប្តូរអរម៉ូន"
    ],
    thingsToAvoid: [
      "ការត្រូវកម្ដៅថ្ងៃផ្ទាល់ដោយគ្មានការពារ",
      "ការប្រើផលិតផលដែលមានជាតិកាត់ខ្លាំង"
    ],
    keyIngredients: [
      "Alpha Arbutin",
      "Vitamin C"
    ],
    solutionStrategy: "ពេលព្រឹក៖ លាងមុខ + ឡេការពារកម្ដៅថ្ងៃ។ ពេលយប់៖ លាងមុខ + ឡេយប់ព្យាបាលជាំ។",
    lifestyleTips: [
      "ពាក់មួក ឬឆត្រពេលចេញក្រៅ",
      "ញ៉ាំទឹកអោយបាន ២-៣ លីត្រក្នុងមួយថ្ងៃ"
    ],
    expectedResults: "រយៈពេល ២-៤ សប្តាហ៍ មុខនឹងភ្លឺថ្លា។ ៨-១២ សប្តាហ៍ ស្នាមជាំនឹងរសាយច្បាស់។",
    recommendedProduct: {
      name: "ឈុតឯកទេសកំចាត់អាចម៍រុយ 3in1 (Freckle Set 3in1)",
      price: 42.00,
      reason: "ដោយសារបងមានបញ្ហាជាំខ្លាំង ឈុតនេះមានប្រសិទ្ធភាពបំផុតក្នុងការបំបែកគ្រាប់ពណ៌ និងការពារមិនអោយកើតឡើងវិញ។"
    }
  }
}