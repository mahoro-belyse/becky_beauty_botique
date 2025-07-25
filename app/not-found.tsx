import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search, Sparkles } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-16 h-16 text-pink-500" />
          </div>
          <h1 className="text-8xl font-display font-bold text-gradient mb-4">404</h1>
        </div>

        <h2 className="text-3xl font-display font-bold text-gray-800 mb-4">Oops! Page Not Found</h2>

        <p className="text-gray-600 mb-8 leading-relaxed">
          The page you're looking for seems to have vanished like makeup remover! Let's get you back to discovering
          beautiful products.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="btn-luxury text-white">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          <Button asChild variant="outline" className="bg-transparent">
            <Link href="/products">
              <Search className="w-4 h-4 mr-2" />
              Browse Products
            </Link>
          </Button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help?{" "}
            <Link href="/contact" className="text-pink-600 hover:underline">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
