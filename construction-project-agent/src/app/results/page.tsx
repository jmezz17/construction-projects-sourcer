'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Rfp {
  id: number;
  title: string;
  description: string;
  source_url: string;
  source_type: string | null;
  publish_date: string | null;
  deadline: string | null;
  estimated_budget: number | null;
  industry: string | null;
  location: string | null;
  tags: string[] | null;
  profitability_score: number | null;
  skillset_match_score: number | null;
}

interface ProjectRow {
  id: number;
  rank: number;
  name: string;
  location: string;
  customer: string;
  expectedGrossProfit: string;
  rawBudget: number | null;
  fitScore: number | null;
  source: string;
  link: string;
}

export default function ResultsPage() {
  const router = useRouter();
  const [contractorName, setContractorName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve contractor info from sessionStorage
    const name = sessionStorage.getItem('contractorName');
    if (!name) {
      router.push('/');
      return;
    }
    setContractorName(name);

    const fetchProjects = async () => {
      try {
        const response = await fetch(
          'https://construction-projects-sourcer-api.onrender.com/api/rfps/'
        );

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data: Rfp[] = await response.json();

        setProjects(
          data.map((rfp, index) => {
            const formattedBudget =
              typeof rfp.estimated_budget === 'number'
                ? `$${rfp.estimated_budget.toLocaleString('en-US')}`
                : 'N/A';

            const fitScore =
              rfp.profitability_score ?? rfp.skillset_match_score ?? null;

            let sourceLabel = rfp.source_type ?? '';
            try {
              const url = new URL(rfp.source_url);
              sourceLabel = url.hostname;
            } catch {
              // Ignore URL parsing errors and fall back to source_type
            }

            return {
              id: rfp.id,
              rank: index + 1,
              name: rfp.title,
              location: rfp.location ?? '—',
              customer: rfp.industry ?? 'General',
              expectedGrossProfit: formattedBudget,
              rawBudget: rfp.estimated_budget,
              fitScore,
              source: sourceLabel || '—',
              link: rfp.source_url,
            } satisfies ProjectRow;
          })
        );
      } catch (error) {
        console.error(error);
        setError('Failed to load construction projects. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [router]);

  const getFitScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const handleNewSearch = () => {
    router.push('/');
  };

  const stats = useMemo(() => {
    const totalValue = projects.reduce((sum, project) => {
      if (typeof project.rawBudget === 'number') {
        return sum + project.rawBudget;
      }
      return sum;
    }, 0);

    const fitScores = projects
      .map((project) => project.fitScore)
      .filter((value): value is number => value !== null);

    const averageFit =
      fitScores.length > 0
        ? Number((fitScores.reduce((sum, score) => sum + score, 0) / fitScores.length).toFixed(1))
        : null;

    return {
      totalValue,
      averageFit,
    };
  }, [projects]);

  const totalValueLabel =
    stats.totalValue > 0 ? `$${stats.totalValue.toLocaleString('en-US')}` : '—';

  const averageFitLabel =
    stats.averageFit !== null ? `${stats.averageFit}/10` : 'N/A';

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
          {error && (
            <p className="text-sm text-red-400 mt-2">{error}</p>
          )}
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
            {projects.length === 0 ? (
              <div className="px-6 py-6 text-center text-gray-400 text-sm">
                No projects available yet.
              </div>
            ) : (
              projects.map((project) => (
                <div
                  key={project.id}
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
                      <span
                        className={`font-bold ${
                          project.fitScore !== null
                            ? getFitScoreColor(project.fitScore)
                            : 'text-gray-500'
                        }`}
                      >
                        {project.fitScore !== null ? project.fitScore : 'N/A'}
                      </span>
                      {project.fitScore !== null && <span className="text-gray-500">/10</span>}
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
              ))
            )}
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
            <div className="text-3xl font-light text-white">{totalValueLabel}</div>
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-1">Average Fit Score</div>
            <div className="text-3xl font-light text-green-400">{averageFitLabel}</div>
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

