import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and CTA section */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">APY List</span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Track and compare DeFi yields in one place
            </p>
            <Link 
              href="/get-started" 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 inline-block w-fit"
            >
              Get Started
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600">Features</Link></li>
              <li><Link href="/pricing" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600">Pricing</Link></li>
              <li><Link href="/blog" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600">Blog</Link></li>
              <li><Link href="/faq" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600">FAQ</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link href="/tos" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          {/* <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://twitter.com/jkountanis" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600"
                >
                  Follow us on Twitter
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/in/dimitris-kountanis/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600"
                >
                  Connect on LinkedIn
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © 2024 APY List. All rights reserved.
            </p>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Stay updated with DeFi yields
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
