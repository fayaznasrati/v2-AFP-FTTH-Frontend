import { useState } from "react";
import FTTHAdvanceFilterModal from "../components/ftth_ui_components/AdvanceDateFilter/FTTHAdvanceDateFilter";
import { FTTHCustomDateFilter } from "../components/ftth_ui_components/DateFilter/FTTHCustomDateFilter";
import { ListFilter } from "lucide-react";
import FTTHCustomDataTable from "../components/ftth_ui_components/DataTable/FTTHDataTable";

const CustomDataTable = () => {
  const [isAdvanceFilterOpen, setIsAdvanceFilterOpen] = useState(false);
  const filterConfig = [
    {
      key: "type",
      label: "TYPE",
      type: "dropdown",
      options: [
        { value: "IN", label: "IN" },
        { value: "OUT", label: "OUT" },
      ],
      multiSelect: false,
    },
    {
      key: "amount",
      label: "Amount Range",
      type: "range",
      min: 0,
      max: 1000000,
      unit: "AFG",
    },
    //     {
    //   key: 'type',
    //   label: "Customer",
    //   type: 'dropdown',
    //   options: [
    //     { value: 'IN', label: "IN" },
    //     { value: 'OUT', label: "OUT" },
    //   ],
    //   multiSelect: false,
    // },

    {
      key: "status",
      label: "Status",
      type: "checkbox",
      options: [
        { value: "pending", label: "Pending" },
        { value: "approved", label: "Approved" },
        { value: "rejected", label: "Rejected" },
      ],
    },
  ];

  const initialAdvanceValues = {
    type: "",
    amount: {
      min: 0,
      max: 1000000,
    },
  };

  const clearAllFilters = () => {
    setFilter({
      search: "",
      limit: 10,
      page: 1,
      agent_id: userInfo?.id,
      "createdAt[gte]": null,
      "createdAt[lte]": null,
      type: null,
      "amount[gte]": null,
      "amount[lte]": null,
    });
  };
  const handleApplyAdvanceFilters = (filterValues) => {
    setFilter((prev) => {
      const newFilter = { ...prev, page: 1 };

      if (filterValues.type) {
        newFilter.type = filterValues.type;
      } else {
        delete newFilter.type;
      }

      if (filterValues.amount) {
        if (filterValues.amount.min > 0) {
          newFilter["amount[gte]"] = filterValues.amount.min;
        } else {
          delete newFilter["amount[gte]"];
        }

        if (filterValues.amount.max < 100000) {
          newFilter["amount[lte]"] = filterValues.amount.max;
        } else {
          delete newFilter["amount[lte]"];
        }
      } else {
        delete newFilter["amount[gte]"];
        delete newFilter["amount[lte]"];
      }

      return newFilter;
    });

    setIsAdvanceFilterOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsAdvanceFilterOpen(true)}
        className="max-w-[250px] cursor-pointer w-full md:w-auto border border-[#E4E7EC] rounded-md dark:border-gray-500 px-3 py-2 h-[44px] flex items-center justify-center gap-2 bg-gradient-to-r from-[#F8F4FF] to-[#FAF9F3] dark:from-slate-800  dark:text-gray-300 text-[#667085] text-[14px]  dark:to-slate-800 relative"
      >
        <ListFilter size={20} className="dark:text-gray-300 text-[#667085]" />
        Advance Filter
      </button>
      <div>
        this is custom data filter
        <FTTHCustomDateFilter />
        {isAdvanceFilterOpen && (
          <FTTHAdvanceFilterModal
            isOpen={isAdvanceFilterOpen}
            onClose={() => setIsAdvanceFilterOpen(false)}
            onApply={handleApplyAdvanceFilters}
            filterConfig={filterConfig}
            initialValues={initialAdvanceValues}
          />
        )}
      </div>
    </>
  );
};

export default CustomDataTable;
