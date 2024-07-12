import { NavSideBar } from '@/components/nav-sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavSideBar />
      <div className="lg:pl-60">
        <div className=" mb-4 mt-4 max-w-4xl pl-5"></div>
        <div className="pl-5 pr-5">{children}</div>
      </div>
    </>
  );
}
