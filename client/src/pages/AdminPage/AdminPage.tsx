import AdminNavigation from "@/components/Layout/AdminPage/AdminNavigation";
import BrandController from "@/components/Layout/AdminPage/Brand/BandController";
import DeviceController from "@/components/Layout/AdminPage/Device/DeviceController";
import type { FC } from "react";
import { Route, Routes } from "react-router-dom";

interface AdminPageProps {}

const AdminPage: FC<AdminPageProps> = () => {
  return (
    <div className="grid grid-cols-6 gap-20 w-full pt-10">
      <div className="">
        <AdminNavigation />
      </div>
      <div className="col-span-5">
        <Routes>
          <Route path="devices" element={<DeviceController />} />
          <Route path="brands" element={<BrandController />} />
          <Route path="contacts" element={<p>OurContacts</p>} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;
