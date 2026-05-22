import Navbar from "../components/Navbar";
import HomeSection from "./sections/Home/Home";

export default function Home() {
  return (
    <main style={{ background: 'var(--color-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <HomeSection />
    </main>
  );
}
