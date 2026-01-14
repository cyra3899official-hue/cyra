'use server'

import { GoogleGenerativeAI, Content } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

// Define the shape of messages coming from the UI
export interface ChatMessage {
  role: 'user' | 'model'
  text: string
}

/**
 * Load the Customer Support Knowledge Base
 */
async function loadSupportKnowledge(): Promise<string> {
  try {
    const { readFileSync, existsSync } = await import('fs')
    const { join } = await import('path')
    
    // Check 'knowledges' folder (matches your file structure)
    let filePath = join(process.cwd(), 'knowledges', 'cyra-skincare-support.md')
    
    if (!existsSync(filePath)) {
      filePath = join(process.cwd(), 'knowledge', 'cyra-skincare-support.md')
    }

    if (!existsSync(filePath)) {
      console.warn('⚠️ Support Knowledge file not found at:', filePath)
      return ''
    }

    const content = readFileSync(filePath, 'utf-8')
    console.log('🗣️ [CYRA CHAT] Loaded Knowledge Base')
    return content
  } catch (error) {
    console.error('❌ [CYRA CHAT] Error loading knowledge:', error)
    return ''
  }
}

/**
 * Chat with Sister Cyra (Customer Support Agent)
 */
export async function chatWithCyra(
  userMessage: string,
  history: ChatMessage[] = []
): Promise<string> {
  
  if (!process.env.GEMINI_API_KEY) {
    return "សូមអភ័យទោស ប្អូនកំពុងមានបញ្ហាបច្ចេកទេសបន្តិច (Missing API Key)។ សូមព្យាយាមម្តងទៀតពេលក្រោយចាស៎! 😥"
  }

  try {
    // 1. Load the Brain
    const knowledgeBase = await loadSupportKnowledge()

    // 2. Configure the Persona
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash'
    })

    // 3. Prepare system prompt
    const systemPrompt = `${knowledgeBase}
        
        CRITICAL INSTRUCTIONS:
        1. You are "Sister Cyra" (ប្អូនស្រីស៊ីរ៉ា).
        2. Speak ONLY in Khmer (primary) and English (for product names).
        3. Be very friendly and use emojis (🥰, ✨, 🌸).
        4. ONLY recommend products listed in the "PRODUCT KNOWLEDGE BASE". Do not make up products.
        5. If you don't know the answer, ask the user to contact the hotline: 012 345 678.
        6. Keep answers short (under 3 sentences) unless explaining a routine.
      `

    // 4. CLEAN HISTORY (The Fix 🔧)
    // Gemini crashes if history starts with 'model'. We must remove the "Welcome" message.
    // We also remove the *last* message because that is the 'userMessage' we are about to send.
    const cleanHistory = history
      .slice(0, -1) // Remove the last message (current user input) to avoid duplication
      .filter((msg, index) => {
        // If it's the very first message and it's from the model, SKIP IT.
        if (index === 0 && msg.role === 'model') return false
        return true
      })

    // Format for Gemini
    const chatHistory: Content[] = cleanHistory.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }))

    // 4. Start Chat Session
    const chat = model.startChat({
      history: chatHistory,
    })

    console.log(`🗣️ [CYRA CHAT] User asked: "${userMessage}"`)

    // 5. Send Message with system context
    const fullMessage = cleanHistory.length === 0 
      ? `${systemPrompt}\n\nUser: ${userMessage}` 
      : userMessage
    
    const result = await chat.sendMessage(fullMessage)
    const response = result.response.text()

    console.log(`🗣️ [CYRA CHAT] Sister Cyra replied: "${response.substring(0, 50)}..."`)

    return response

  } catch (error) {
    console.error('❌ [CYRA CHAT] Failed:', error)
    return "សូមអភ័យទោស ប្អូនកំពុងមមាញឹកបន្តិច។ សូមសាកល្បងម្តងទៀតចាស៎! 😥"
  }
}
