'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [contractorName, setContractorName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Store in sessionStorage for the results page
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('contractorName', contractorName);
      sessionStorage.setItem('companyDescription', companyDescription);
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Navigate to results page
    router.push('/results');
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-8">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-start">
            <div className="flex items-end gap-1">
              <svg width="40" height="40" viewBox="0 0 40 40" className="text-white">
                <path
                  d="M10 35 L10 15 L18 10 L18 35 Z M22 35 L22 20 L30 15 L30 35 Z"
                  fill="currentColor"
                />
                <rect x="8" y="5" width="4" height="3" fill="#ff6b00" />
              </svg>
              <div className="flex flex-col">
                <span className="text-white text-2xl font-light tracking-[0.3em] ml-2">SITESCOPE</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 md:px-8">
        <div className="w-full max-w-2xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
              Find Your Next Project
            </h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto">
              Empower your team with live visibility into RFPs that match your crews, regions, and backlog goals.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="contractorName" className="block text-sm font-medium text-gray-300 mb-2">
                General Contractor Name
              </label>
              <input
                type="text"
                id="contractorName"
                value={contractorName}
                onChange={(e) => setContractorName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b00] focus:ring-1 focus:ring-[#ff6b00] transition-colors"
                placeholder="Enter your company name"
              />
            </div>

            <div>
              <label htmlFor="companyDescription" className="block text-sm font-medium text-gray-300 mb-2">
                Company Description
              </label>
              <textarea
                id="companyDescription"
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
                required
                rows={6}
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b00] focus:ring-1 focus:ring-[#ff6b00] transition-colors resize-none"
                placeholder="Describe your company, specialties, regions, crew capabilities, and goals..."
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-[#ff6b00] hover:bg-[#ff8533] disabled:bg-[#ff6b00]/50 text-white font-medium py-3 px-6 rounded-full transition-colors duration-200"
              >
                {isSubmitting ? 'Finding Projects...' : 'Find Projects'}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-gray-500 text-sm">
        <p>SiteScope surfaces the bids with the highest odds of closing so you scale without gambling.</p>
      </footer>
    </div>
  );
}
