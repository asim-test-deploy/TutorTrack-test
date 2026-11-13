import Hero from "./components/Hero.jsx";
import Features from "./components/Features.jsx";
import ProductSections from "./components/ProductSections.jsx";
import Footer from "./components/Footer.jsx";



// App is the page-level component. It puts the independent page sections in order.
function App() {
  return (
    <div
      id="home"
      className="page-enter min-h-screen bg-[#faf9f6] text-slate-900"
    >
      <main>
        <Hero />
        <Features />
        <ProductSections />
      </main>
      <Footer />
    </div>
  );
}

export default App;
