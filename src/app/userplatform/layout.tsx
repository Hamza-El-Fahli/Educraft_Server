
import "@/styles/globals.css";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode; 
}) {
  return (
    <div style={{ background: 'url(/networking-bg.png)' , backgroundRepeat: 'repeat'}}>
      {children}
    </div>
  );
}