const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { MailDetails } from './apps/mail/pages/MailDetails.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'

export function App() {
  return (
    <React.Fragment>
      <Router>
        <section className="app" style={{ height: '100%', minHeight: 'calc( 100vh - 71px)' }}>
          <AppHeader />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/note" element={<NoteIndex />} />
            <Route path="/mail" element={<MailIndex />} >
              <Route path="/mail/:id" element={<MailDetails />} />
            </Route>
          </Routes>
        </section>
      </Router>
      <Footer />
    </React.Fragment>
  )
}


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>&copy; {currentYear} Appsus. All rights reserved.</p>
      <p className="footer-names">Designed and developed by Adir Gamil, and Amir Boxer.</p>
    </footer>
  );
};

export default Footer;