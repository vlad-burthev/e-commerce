import { UiLinkPrimary } from "@/components/UI/Ui-link/Ui-link";
import type { FC } from "react";

interface AdminNavigationProps {}

const AdminNavigation: FC<AdminNavigationProps> = () => {
  return (
    <aside className=" sticky top-0 bg-green-200 p-4 rounded-md">
      <UiLinkPrimary className=" text-center" to="">
        Користувачі
      </UiLinkPrimary>
      <UiLinkPrimary className=" my-4 text-center" to="devices">
        Девайси
      </UiLinkPrimary>
      <UiLinkPrimary className=" text-center" to="brands">
        Бренди
      </UiLinkPrimary>
      <UiLinkPrimary className=" mt-4 text-center" to="types">
        Типи
      </UiLinkPrimary>
    </aside>
  );
};

export default AdminNavigation;
