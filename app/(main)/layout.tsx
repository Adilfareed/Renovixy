import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div >
         

      
      

        <main >
            <Navbar/>
          {children}
            <Footer />
        </main>
      
    </div>
  );
}
