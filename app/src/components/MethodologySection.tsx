import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { TextAnimate } from './ui/text-animate';
import { 
  FileSpreadsheet, 
  Search, 
  Download, 
  ShieldCheck, 
  AlertTriangle, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  CheckCircle2,
  Database
} from 'lucide-react';

interface RecordItem {
  id: number;
  timestamp: string;
  area_type: string;
  locality: string;
  household_size: string;
  waste_per_day: string;
  segregate_freq: string;
  satisfaction: number | null;
  awareness: number | null;
}

interface MethodologyProps {
  metadata: {
    total_submissions: number;
    study_area: string;
    study_period: string;
    instrument: string;
  };
  records: RecordItem[];
}

export const MethodologySection: React.FC<MethodologyProps> = ({
  metadata,
  records
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Filter and search records
  const filteredData = useMemo(() => {
    return records.filter(r => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        r.locality.toLowerCase().includes(term) ||
        r.area_type.toLowerCase().includes(term) ||
        r.segregate_freq.toLowerCase().includes(term) ||
        r.household_size.toLowerCase().includes(term)
      );
    });
  }, [records, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage) || 1;
  const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleDownloadCSV = () => {
    // Generate CSV string from records
    const headers = ['ID', 'Timestamp', 'Area_Type', 'Locality', 'Household_Size', 'Waste_Per_Day', 'Segregation_Freq', 'Satisfaction_1_to_5', 'Awareness_1_to_5'];
    const rows = records.map(r => [
      r.id,
      `"${r.timestamp}"`,
      `"${r.area_type}"`,
      `"${r.locality}"`,
      `"${r.household_size}"`,
      `"${r.waste_per_day}"`,
      `"${r.segregate_freq}"`,
      r.satisfaction || '',
      r.awareness || ''
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'WasteWise_All_146_Responses.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadJSON = () => {
    const jsonContent = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(records, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', jsonContent);
    link.setAttribute('download', 'WasteWise_All_146_Dataset.json');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="methodology" className="py-10 sm:py-16 md:py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          <TextAnimate
            as="h2"
            animation="blurIn"
            by="word"
            className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 tracking-tight"
          >
            Survey Methodology & Data Transparency
          </TextAnimate>
          <TextAnimate
            as="p"
            animation="blurIn"
            by="word"
            className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed font-normal px-1 sm:px-0"
          >
            Following academic data ethics, all metrics presented on this platform are computed from real primary survey entries without alteration, extrapolation, or simulated numbers.
          </TextAnimate>
        </div>

        {/* Methodology Metadata Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-8 sm:mb-12">
          <div className="p-3 sm:p-4 bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase text-slate-600 font-semibold block">Instrument</span>
            <div className="font-heading font-bold text-sm sm:text-base text-slate-900 mt-1">{metadata.instrument}</div>
            <div className="text-[10px] sm:text-xs text-slate-600 mt-0.5">24 structured items</div>
          </div>
          <div className="p-3 sm:p-4 bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase text-slate-600 font-semibold block">Geography</span>
            <div className="font-heading font-bold text-sm sm:text-base text-slate-900 mt-1">{metadata.study_area}</div>
            <div className="text-[10px] sm:text-xs text-slate-600 mt-0.5">MMR community zones</div>
          </div>
          <div className="p-3 sm:p-4 bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase text-slate-600 font-semibold block">Total Dataset</span>
            <div className="font-heading font-bold text-sm sm:text-base text-slate-900 mt-1">
              {metadata.total_submissions} Responses
            </div>
            <div className="text-[10px] sm:text-xs text-slate-600 mt-0.5">Primary household records</div>
          </div>
          <div className="p-3 sm:p-4 bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase text-slate-600 font-semibold block">Fieldwork</span>
            <div className="font-heading font-bold text-sm sm:text-base text-slate-900 mt-1">{metadata.study_period}</div>
            <div className="text-[10px] sm:text-xs text-slate-600 mt-0.5">Verified submissions</div>
          </div>
        </div>

        {/* Academic Disclosure Alert */}
        <div className="mb-8 sm:mb-12 p-4 sm:p-5 bg-white border border-slate-200 rounded-xl flex items-start gap-3 sm:gap-3.5 text-xs text-slate-800 shadow-xs">
          <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-slate-900 font-bold block text-sm">
              Academic Data Integrity Commitment
            </strong>
            <p className="leading-relaxed text-[11px] sm:text-xs text-slate-700">
              In accordance with research standards, findings reflect the responses of surveyed households within the Mumbai metropolitan study area. All <strong>{metadata.total_submissions} collected survey records</strong> are processed and presented in full across every visualization, dashboard metric, and the raw data viewer below.
            </p>
          </div>
        </div>

        {/* Interactive Raw Data Table Section */}
        <Card className="border-slate-200 bg-white shadow-xl overflow-hidden">
          <CardHeader className="bg-slate-50 border-b border-slate-200 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <CardTitle className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-800" />
                  Raw Field Survey Data Viewer
                </CardTitle>
                <CardDescription className="text-xs text-slate-600 mt-0.5 sm:mt-1">
                  Search, inspect, and verify all collected survey records
                </CardDescription>
              </div>

              {/* Action Buttons: Export CSV / JSON */}
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleDownloadCSV}
                  variant="outline"
                  size="sm"
                  className="bg-white border-slate-200 text-slate-800 hover:bg-slate-50 text-xs font-medium gap-1.5 cursor-pointer shadow-xs h-9"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-800" />
                  Download CSV
                </Button>
                <Button
                  onClick={handleDownloadJSON}
                  variant="outline"
                  size="sm"
                  className="bg-white border-slate-200 text-slate-800 hover:bg-slate-50 text-xs font-medium gap-1.5 cursor-pointer shadow-xs h-9"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-800" />
                  Export JSON
                </Button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search locality, area, segregation..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                />
              </div>

              <div className="text-[11px] sm:text-xs text-slate-700 font-mono">
                Showing <strong>{filteredData.length}</strong> of {records.length} collected records
              </div>
            </div>
          </CardHeader>

          {/* Mobile swipe hint */}
          <div className="sm:hidden px-4 py-1.5 bg-slate-100 border-b border-slate-200 text-[10px] text-slate-600 font-mono flex items-center justify-center">
            <span>← Swipe table horizontally to inspect columns →</span>
          </div>

          {/* Table Container with safe min-width */}
          <CardContent className="p-0 overflow-x-auto w-full max-w-full">
            <Table className="min-w-[680px]">
              <TableHeader className="bg-slate-50 text-[11px] font-mono border-b border-slate-200">
                <TableRow>
                  <TableHead className="w-14">#ID</TableHead>
                  <TableHead>Locality / Area</TableHead>
                  <TableHead>Housing Type</TableHead>
                  <TableHead className="text-center">Household Size</TableHead>
                  <TableHead>Waste / Day</TableHead>
                  <TableHead>Segregation</TableHead>
                  <TableHead className="text-center">Satisfaction</TableHead>
                  <TableHead className="text-center">Awareness</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-xs">
                {paginatedData.length > 0 ? (
                  paginatedData.map((r) => (
                    <TableRow key={r.id} className="hover:bg-slate-50 border-b border-slate-100 transition-colors">
                      <TableCell className="font-mono font-medium text-slate-500">{r.id}</TableCell>
                      <TableCell className="font-medium text-slate-900">{r.locality}</TableCell>
                      <TableCell className="text-slate-600">{r.area_type}</TableCell>
                      <TableCell className="text-slate-600 font-mono text-center">{r.household_size}</TableCell>
                      <TableCell className="text-slate-600">{r.waste_per_day}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`text-[10px] font-sans ${
                            r.segregate_freq === 'Always' 
                              ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                              : r.segregate_freq === 'Often'
                              ? 'border-teal-300 bg-teal-50 text-teal-800'
                              : r.segregate_freq === 'Sometimes'
                              ? 'border-amber-300 bg-amber-50 text-amber-800'
                              : 'border-slate-300 bg-slate-50 text-slate-600'
                          }`}
                        >
                          {r.segregate_freq}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center font-mono font-bold text-slate-700">
                        {r.satisfaction ? `${r.satisfaction} / 5` : '—'}
                      </TableCell>
                      <TableCell className="text-center font-mono font-bold text-slate-700">
                        {r.awareness ? `${r.awareness} / 5` : '—'}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-slate-400 text-xs">
                      No records match your query.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>

          {/* Table Footer with Pagination */}
          <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] sm:text-xs text-slate-600">
            <div>
              Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, filteredData.length)} of {filteredData.length} records
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="font-mono text-xs px-2">
                {currentPage} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

      </div>
    </section>
  );
};
