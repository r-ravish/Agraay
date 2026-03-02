import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Partner from './pages/Partner';
import Blog from './pages/Blog';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/ios/faq" element={<FAQ />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/ios/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/ios/privacy" element={<Privacy />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
