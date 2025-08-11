import Sidebar from "./Sidebar";
import MarqueeTip from "./MarqueeTip";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex overflow-x-hidden">
      <Sidebar />
      <div className="bg-green-100 fixed top-0 left-[280px] right-0 z-50">
        <MarqueeTip />
      </div>
     
      <main className="pl-0 lg:pl-[280px] pt-[90px] lg:pt-0 flex flex-col justify-center mx-auto items-center min-h-screen">
        <div className="w-full flex flex-col justify-center">{children}</div>
      </main>
    </div>
  );
}
