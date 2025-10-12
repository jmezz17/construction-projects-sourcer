'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Project {
  rank: number;
  name: string;
  location: string;
  customer: string;
  expectedGrossProfit: string;
  fitScore: number;
  source: string;
  link: string;
}

export default function ResultsPage() {
  const router = useRouter();
  const [contractorName, setContractorName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration
  const projects: Project[] = [
    {
      rank: 1,
      name: 'Downtown Mixed-Use Development',
      location: 'San Francisco, CA',
      customer: 'Bay Area Properties LLC',
      expectedGrossProfit: '$2.4M',
      fitScore: 9,
      source: 'Dodge Construction Network',
      link: 'https://construction.com/project/12345'
    },
    {
      rank: 2,
      name: 'Tech Campus Expansion Phase 2',
      location: 'San Jose, CA',
      customer: 'Silicon Valley Tech Corp',
      expectedGrossProfit: '$1.8M',
      fitScore: 9,
      source: 'BidClerk',
      link: 'https://bidclerk.com/project/67890'
    },
    {
      rank: 3,
      name: 'Public Library Renovation',
      location: 'Oakland, CA',
      customer: 'City of Oakland',
      expectedGrossProfit: '$1.2M',
      fitScore: 8,
      source: 'PlanHub',
      link: 'https://planhub.com/project/24680'
    },
    {
      rank: 4,
      name: 'Medical Office Building',
      location: 'Sacramento, CA',
      customer: 'Healthcare Realty Partners',
      expectedGrossProfit: '$950K',
      fitScore: 8,
      source: 'ConstructConnect',
      link: 'https://constructconnect.com/project/13579'
    },
    {
      rank: 5,
      name: 'Warehouse Distribution Center',
      location: 'Stockton, CA',
      customer: 'Logistics Solutions Inc',
      expectedGrossProfit: '$780K',
      fitScore: 7,
      source: 'BuildingConnected',
      link: 'https://buildingconnected.com/project/97531'
    },
    {
      rank: 6,
      name: 'Hotel Modernization',
      location: 'Napa, CA',
      customer: 'Hospitality Group West',
      expectedGrossProfit: '$680K',
      fitScore: 7,
      source: 'Dodge Construction Network',
      link: 'https://construction.com/project/86420'
    },
    {
      rank: 7,
      name: 'Elementary School Addition',
      location: 'Fremont, CA',
      customer: 'Fremont Unified School District',
      expectedGrossProfit: '$520K',
      fitScore: 6,
      source: 'PlanHub',
      link: 'https://planhub.com/project/11223'
    },
    {
      rank: 8,
      name: 'Retail Shopping Center Facade',
      location: 'Walnut Creek, CA',
      customer: 'Retail Development Partners',
      expectedGrossProfit: '$420K',
      fitScore: 6,
      source: 'BidClerk',
      link: 'https://bidclerk.com/project/44556'
    }
  ];

  useEffect(() => {
    // Retrieve contractor info from sessionStorage
    const name = sessionStorage.getItem('contractorName');
    if (!name) {
      router.push('/');
      return;
    }
    setContractorName(name);

    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [router]);

  const getFitScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const handleNewSearch = () => {
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#ff6b00] mx-auto mb-4"></div>
          <p className="text-white text-lg">Analyzing construction projects...</p>
          <p className="text-gray-400 text-sm mt-2">Matching with your company profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Header */}
      <header className="bg-[#1a1a1a] border-b border-[#2a2a2a] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg width="32" height="32" viewBox="0 0 40 40" className="text-white">
                <path
                  d="M10 35 L10 15 L18 10 L18 35 Z M22 35 L22 20 L30 15 L30 35 Z"
                  fill="currentColor"
                />
                <rect x="8" y="5" width="4" height="3" fill="#ff6b00" />
              </svg>
              <span className="text-white text-xl font-light tracking-[0.3em]">SITESCOPE</span>
            </div>
            <button
              onClick={handleNewSearch}
              className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white px-4 py-2 rounded-full text-sm transition-colors"
            >
              New Search
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-8 py-8">
        {/* Results Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-white mb-2">
            Prioritized Projects for {contractorName}
          </h1>
          <p className="text-gray-400">
            {projects.length} construction projects ranked by gross profit potential and company fit
          </p>
        </div>

        {/* Projects Table */}
        <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] overflow-hidden">
          {/* Table Header */}
          <div className="bg-[#2a2a2a] border-b border-[#3a3a3a]">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 text-sm font-medium text-gray-400">
              <div className="col-span-1">Rank</div>
              <div className="col-span-2">Name</div>
              <div className="col-span-2">Location</div>
              <div className="col-span-2">Customer</div>
              <div className="col-span-2">Gross Profit</div>
              <div className="col-span-1">Fit</div>
              <div className="col-span-2">Source</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-[#2a2a2a]">
            {projects.map((project) => (
              <div
                key={project.rank}
                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-[#2a2a2a]/50 transition-colors group"
              >
                <div className="col-span-1 flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2a2a2a] text-[#ff6b00] font-semibold">
                    {project.rank}
                  </div>
                </div>
                <div className="col-span-2 flex items-center">
                  <span className="text-white font-medium">{project.name}</span>
                </div>
                <div className="col-span-2 flex items-center">
                  <span className="text-gray-300">{project.location}</span>
                </div>
                <div className="col-span-2 flex items-center">
                  <span className="text-gray-300">{project.customer}</span>
                </div>
                <div className="col-span-2 flex items-center">
                  <span className="text-white font-semibold">{project.expectedGrossProfit}</span>
                </div>
                <div className="col-span-1 flex items-center">
                  <div className="flex items-center gap-1">
                    <span className={`font-bold ${getFitScoreColor(project.fitScore)}`}>
                      {project.fitScore}
                    </span>
                    <span className="text-gray-500">/10</span>
                  </div>
                </div>
                <div className="col-span-2 flex items-center">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ff6b00] hover:text-[#ff8533] underline text-sm transition-colors"
                  >
                    {project.source}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-1">Total Opportunities</div>
            <div className="text-3xl font-light text-white">{projects.length}</div>
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-1">Total Potential Value</div>
            <div className="text-3xl font-light text-white">$9.3M</div>
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-1">Average Fit Score</div>
            <div className="text-3xl font-light text-green-400">7.5/10</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 md:px-8 py-8 mt-12 border-t border-[#2a2a2a]">
        <p className="text-center text-gray-500 text-sm">
          SiteScope surfaces the bids with the highest odds of closing so you scale without gambling.
        </p>
      </footer>
    </div>
  );
}

