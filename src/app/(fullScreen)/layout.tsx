export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen w-full overflow-hidden bg-[#F7F9FA]">
      {children}
    </main>
  );
}
