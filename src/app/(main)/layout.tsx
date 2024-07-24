import Header from "@/container/Header";
import Navigation from "@/container/Navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-144px)] w-full overflow-hidden bg-[#F7F9FA]">
        {children}
      </main>
      <Navigation />
    </>
  );
}
