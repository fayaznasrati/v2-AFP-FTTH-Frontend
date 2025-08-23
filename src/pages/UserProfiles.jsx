import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import UserAddressCard from "../components/UserProfile/UserAddressCard";
import PageMeta from "../components/common/PageMeta";
import MultiSelect from "../components/ftth_ui_components/MultiSelectElement";
import { useState } from "react";
import SingleSelect from "../components/ftth_ui_components/selectElements";
import AyncMultiSelect from "../components/ftth_ui_components/asyncMultiSelect";
import AsyncSingleSelect from "../components/ftth_ui_components/asyncSelect";
import Button from "../components/ftth_ui_components/Button";
import { FaPlus, FaTrash } from "react-icons/fa";
import Checkbox from "../components/ftth_ui_components/Checkbox";
import Switch from "../components/ftth_ui_components/Switch";
import Avatar from "../components/ftth_ui_components/Avatar";

export default function UserProfiles() {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

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
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
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
      <AsyncSingleSelect
        items={usersFromDB}
        valueKey="lastName"
        getLabel={(item) =>
          `${item.firstName} ${item.lastName} (${item.address.city})`
        }
        placeholder="Select users async..."
        onChange={setSelectedUsers}
        isLoading={false}
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

      <Button label="Add Item" icon={<FaPlus />} onClick={() => {}} />

      <Button
        label="Delete"
        icon={<FaTrash />}
        iconPosition="left"
        error
        onClick={() => {}}
        isLoading={true}
      />

      <Button
        label="Save"
        isLoading={false}
        width="52px"
        isFillOnHover={true}
        bg="bg-primary1"
      />
      <Button
        label="continue"
        isLoading={false}
        width="52px"
        bg="bg-primary2"

        // isFillOnHover={true}
        // bg="bg-primary1"
      />
      <Button
        label="continue"
        isLoading={false}
        width="52px"
        // bg="bg-primary2"
        success
        // isFillOnHover={true}
        // bg="bg-primary1"
      />
      <Checkbox
        value={isChecked}
        variant="blank"
        onChange={(e) => {
          console.log("from onchange", e);
          setIsChecked(e);
        }}
        size="lg"
      />
      <Checkbox
        value={isChecked}
        // variant="blank"
        onChange={(e) => {
          console.log("from onchange", e);
          setIsChecked(e);
        }}
        size="lg"
      />

      <Switch
        color="red"
        size="lg"
        value={isChecked}
        onChange={(e) => {
          console.log("from onchange", e);
          setIsChecked(e);
        }}
      />
      <Avatar
        src="https://randomuser.me/api/portraits/women/2.jpg"
        size="lg"
        fallback="MS"
        // variant="square"
        badge={{
          content: "NEW",
          color: "#22c55e",
          position: "bottom-left",
        }}
      />

      <Switch
        color="green"
        size="sm"
        value={isChecked}
        onChange={(val) => console.log(val)}
      />
      <Switch color="primary1" size="md" value={isChecked} />

      <div className="flex items-center gap-4 my-8 justify-between">
        <Avatar
          src="https://randomuser.me/api/portraits/women/2.jpg"
          size="sm"
          badge={{ color: "#22c55e" }}
        />
        <Avatar
          src="https://randomuser.me/api/portraits/women/17.jpg"
          size="md"
          badge={{ content: "New", color: "#3b82f6" }}
        />
        <Avatar
          // variant="square"
          src="https://randomuser.me/api/portraits/women/11.jpg"
          size="md"
          badge={{ content: "VIP", position: "top-right", color: "#f97316" }}
        />
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
