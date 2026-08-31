import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop';

import Home from './pages/Home';
import About from './pages/About';
import Board from './pages/Board';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Flagships from './pages/Flagships';
import Bulletins from './pages/Bulletins';
import DppTheme from './pages/DppTheme';
import Awards from './pages/Awards';
import Blogs from './pages/Blogs';
import BlogDetails from './pages/BlogDetails';
import Contact from './pages/Contact';

function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl font-extrabold text-[#F1F1F1] mb-4">404</div>
      <h1 className="text-2xl font-extrabold text-[#1A1A1A] mb-3">Page Not Found</h1>
      <p className="text-[#666666] mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <a href="/" className="btn-primary">
        Back to Home
      </a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/board" element={<Board />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />
          <Route path="/flagships" element={<Flagships />} />
          <Route path="/bulletins" element={<Bulletins />} />
          <Route path="/dpp-theme" element={<DppTheme />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </BrowserRouter>
  );
}
