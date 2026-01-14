import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SkinAnalysisResponse } from "@/app/types" // Import shared type for safety

interface SkinAnalysisResultProps {
  analysis: SkinAnalysisResponse
}

export function SkinAnalysisResult({ analysis }: SkinAnalysisResultProps) {
  return (
    <div className="space-y-6">
      {/* Greeting & Clinical Reasoning (The "WHY") */}
      <Card className="bg-pink-50/50 border border-pink-100 p-8 shadow-sm">
        <h3 className="text-xl font-medium text-pink-600 mb-2">ជំរាបសួរចាសបង! 🌸</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
            ប្អូនបានពិនិត្យមើលរូបភាពស្បែកមុខបងយ៉ាងយកចិត្តទុកដាក់។ នេះជាលទ្ធផលនៃការវិភាគ៖
        </p>
        
        {/* Clinical Reasoning Box */}
        {analysis.clinical_reasoning && (
            <div className="bg-white/80 p-4 rounded-lg border-l-4 border-pink-400 italic text-gray-600">
                " {analysis.clinical_reasoning} "
            </div>
        )}
      </Card>

      {/* 8-Point Detailed Analysis */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* 1. Problem */}
        <Card className="border-gray-100 p-6 hover:shadow-md transition-shadow bg-white">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
            បញ្ហាដែលបងកំពុងជួប
          </h4>
          <p className="text-gray-600 leading-relaxed">{analysis.problem}</p>
        </Card>

        {/* 2. Root Causes */}
        <Card className="border-gray-100 p-6 hover:shadow-md transition-shadow bg-white">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
            មូលហេតុបង្ក
          </h4>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            {analysis.rootCauses.map((cause, idx) => (
              <li key={idx}>{cause}</li>
            ))}
          </ul>
        </Card>

        {/* 3. Things to Avoid */}
        <Card className="border-red-100 bg-red-50/30 p-6 hover:shadow-md transition-shadow">
          <h4 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
            <span className="bg-red-100 w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
            កត្តាដែលត្រូវជៀសវាង 🚫
          </h4>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            {analysis.thingsToAvoid.map((avoid, idx) => (
              <li key={idx}>{avoid}</li>
            ))}
          </ul>
        </Card>

        {/* 4. Key Ingredients */}
        <Card className="border-green-100 bg-green-50/30 p-6 hover:shadow-md transition-shadow">
          <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
            <span className="bg-green-100 w-6 h-6 rounded-full flex items-center justify-center text-xs">4</span>
            សារធាតុដែលស្បែកត្រូវការ 🌿
          </h4>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            {analysis.keyIngredients.map((ingredient, idx) => (
              <li key={idx}>{ingredient}</li>
            ))}
          </ul>
        </Card>

        {/* 5. Solution Strategy */}
        <Card className="border-gray-100 p-6 hover:shadow-md transition-shadow bg-white md:col-span-2">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center text-xs">5</span>
            ដំណោះស្រាយ (Routine)
          </h4>
          <p className="text-gray-600 leading-relaxed">{analysis.solutionStrategy}</p>
        </Card>

        {/* 6. Lifestyle Tips */}
        <Card className="border-gray-100 p-6 hover:shadow-md transition-shadow bg-white">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center text-xs">6</span>
            វិធីថែទាំបន្ថែម
            </h4>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
            {analysis.lifestyleTips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
            ))}
            </ul>
        </Card>

        {/* 7. Expected Results */}
        <Card className="border-gray-100 p-6 hover:shadow-md transition-shadow bg-white">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center text-xs">7</span>
            លទ្ធផលដែលរំពឹងទុក ⏳
            </h4>
            <p className="text-gray-600 leading-relaxed">{analysis.expectedResults}</p>
        </Card>
      </div>

      {/* 8. Recommendation Card (Highlight) */}
      <Card className="relative overflow-hidden border-pink-200 p-8 shadow-lg">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-pink-50 opacity-50" />
        
        <div className="relative z-10">
            <h4 className="text-2xl font-light text-gray-900 mb-6 border-b border-pink-100 pb-4">
                ផលិតផលស៊ីរ៉ាដែលណែនាំសម្រាប់បង ✨
            </h4>
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1 space-y-4">
                    <div>
                        <p className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-1">Recommended Product</p>
                        <p className="text-2xl font-bold text-gray-900">{analysis.recommendedProduct.name}</p>
                    </div>
                    
                    <div>
                        <p className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-1">Price</p>
                        <p className="text-3xl font-light text-pink-600">${analysis.recommendedProduct.price.toFixed(2)}</p>
                    </div>

                    <div className="bg-white/60 p-4 rounded-lg border border-pink-100">
                        <p className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-2">Why This Product?</p>
                        <p className="text-gray-700 leading-relaxed">{analysis.recommendedProduct.reason}</p>
                    </div>
                </div>

                <div className="w-full md:w-auto flex flex-col gap-3">
                    <Button className="w-full md:w-48 bg-pink-600 hover:bg-pink-700 text-white rounded-full py-6 text-lg shadow-lg shadow-pink-200 transition-all hover:scale-105">
                        ទិញផលិតផលនេះ
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full text-gray-500 hover:text-gray-900 hover:bg-transparent underline decoration-gray-300"
                    >
                        Download Report
                    </Button>
                </div>
            </div>
        </div>
      </Card>
    </div>
  )
}
