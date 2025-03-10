import Link from 'next/link';
import Image from 'next/image';
import { FaXTwitter, FaSoundcloud } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="bg-white border-gray-800 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-blue-400">Our Story</Link></li>
              <li><Link href="/team" className="hover:text-blue-400">Team</Link></li>
              <li><Link href="/careers" className="hover:text-blue-400">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link href="/products/features" className="hover:text-blue-400">Features</Link></li>
              <li><Link href="/products/pricing" className="hover:text-blue-400">Pricing</Link></li>
              <li><Link href="/products/integrations" className="hover:text-blue-400">Integrations</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/news" className="hover:text-blue-400">News</Link></li>
              <li><Link href="/docs" className="hover:text-blue-400">Documentation</Link></li>
              <li><Link href="/support" className="hover:text-blue-400">Support</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="hover:text-blue-400">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400">Terms of Service</Link></li>
              <li><Link href="/security" className="hover:text-blue-400">Security</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 flex items-center justify-between">
          <Link href="/">
            <Image
            src='/images/only-devices.png' 
            alt='Only Devices' 
            height='96' 
            width='96'
            priority={true}
            />
          </Link>
          <div className="flex flex-col items-end">
            <div className="flex gap-4 mt-10">
              <a href="https://x.com/only_devices" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                <FaXTwitter size={24} />
              </a>
              <a href="https://soundcloud.com/only_devices" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                <FaSoundcloud size={24} />
              </a>
            </div>
            <span className="pt-6 text-gray-400">&copy; {new Date().getFullYear()} Only Devices • All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}