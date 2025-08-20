import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import UserAddressCard from "../components/UserProfile/UserAddressCard";
import PageMeta from "../components/common/PageMeta";
import MultiSelect from "../components/ftth_ui_components/MultiSelectElement";
import { useState } from "react";
import SingleSelect from "../components/ftth_ui_components/selectElements";
import AyncMultiSelect from "../components/ftth_ui_components/asyncMultiSelect";

export default function UserProfiles() {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const usersFromDB = [
    {
      id: "1",
      firstName: "Alice",
      lastName: "Johnson",
      address: { city: "NY" },
    },
    { id: "2", firstName: "Bob", lastName: "Smith", address: { city: "LA" } },
    {
      id: "3",
      firstName: "Charlie",
      lastName: "Davis",
      address: { city: "SF" },
    },
  ];
  return (
    <>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      <MultiSelect
        items={usersFromDB}
        valueKey="lastName"
        getLabel={(item) =>
          `${item.firstName} ${item.lastName} (${item.address.city})`
        }
        placeholder="Select users..."
        onChange={setSelectedUsers}
        // disabled={true}
        // error={true}
        hint={"This is an error message"}
      />
      <SingleSelect
        items={usersFromDB}
        valueKey="lastName"
        getLabel={(item) =>
          `${item.firstName} ${item.lastName} (${item.address.city})`
        }
        placeholder="Select users single user"
        onChange={setSelectedUsers}
        // disabled={true}
        // error={true}
        hint={"This is an error message"}
      />
      <AyncMultiSelect
        items={usersFromDB}
        valueKey="lastName"
        getLabel={(item) =>
          `${item.firstName} ${item.lastName} (${item.address.city})`
        }
        placeholder="async Select users..."
        onChange={setSelectedUsers}
        // async={true}
        // asyncFetch={(value) => {
        //   console.log("Fetching data for:", value);
        // }}
        isLoading={isLoading}
        // disabled={true}
        // error={true}
        hint={"This is an error message"}
      />

      <div className="mt-4">
        <strong>Selected:</strong> {selectedUsers?.firstName}
      </div>
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard />
          <UserInfoCard />
          <UserAddressCard />
        </div>
      </div>
    </>
  );
}
