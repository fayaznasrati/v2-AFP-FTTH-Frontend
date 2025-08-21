import FTTHCustomDataTable from "../../components/ftth_ui_components/DataTable/FTTHDataTable";
import { Search } from "lucide-react";

export default function CustomDataTable() {

const mockData = [
    { id: 1, type: 'IN', amount: 1200, date: '2025-08-01' },
    { id: 2, type: 'OUT', amount: 800, date: '2025-08-03' },
    { id: 3, type: 'IN', amount: 5000, date: '2025-08-05' },
  ];

  const mockMeta = {
    total: 3,
    page: 1,
    limit: 10,
    totalPages: 1,
  };

  const mockColumns = [
    { key: 'id', label: 'ID' },
    { key: 'type', label: 'Type' },
    { key: 'amount', label: 'Amount (AFG)' },
    { key: 'date', label: 'Date' },
  ];

  const mockFilter = {
    search: '',
    page: 1,
    limit: 10,
  };

  const mockTranslation = (key, params) => {
    if (key === 'walletManagement.noResults') {
      return `No results found for "${params.search}"`;
    }
    if (key === 'walletManagement.noTransactions') {
      return 'No transactions available';
    }
    return key;
  };


  return (
    <>
    <div>
   <FTTHCustomDataTable
      data={mockData}
      meta={mockMeta}
      columns={mockColumns}
      loading={false}
      isError={false}
      error={null}
      onRetry={() => console.log('Retry triggered')}
      onPageChange={(page) => console.log('Page changed to:', page)}
      onLimitChange={(limit) => console.log('Limit changed to:', limit)}
      searchQuery={mockFilter.search}
      className="border border-gray-200 rounded-xl"
      rowClassName="cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.05]"
      emptyState={
        <div className="w-full min-h-[200px] flex flex-col items-center justify-center p-4">
          <div className="text-gray-400 mb-2">
            <Search size={48} />
          </div>
          <p className="text-gray-500">
            {mockFilter.search
              ? mockTranslation('walletManagement.noResults', { search: mockFilter.search })
              : mockTranslation('walletManagement.noTransactions')}
          </p>
        </div>
      }
    />
    </div>
    </>
  );
}
