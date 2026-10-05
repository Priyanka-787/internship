import { useApp } from './context.jsx'
import { useRouter } from './router.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import AuthDialog from './components/AuthDialog.jsx'

// Route Pages
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import ExperiencePage from './pages/ExperiencePage.jsx'
import ReportIssuePage from './pages/ReportIssuePage.jsx'
import TrackPage from './pages/TrackPage.jsx'
import TroubleshootPage from './pages/TroubleshootPage.jsx'
import ReviewsPage from './pages/ReviewsPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import PortalPage from './pages/PortalPage.jsx'

export default function App() {
  const { toastMsg } = useApp()
  const { path } = useRouter()

  const renderPage = () => {
    switch (path) {
      case '/':
        return <HomePage />
      case '/about':
        return <AboutPage />
      case '/services':
      case '/charges':
        return <ServicesPage />
      case '/experience':
      case '/clients':
      case '/vendor':
        return <ExperiencePage />
      case '/report':
        return <ReportIssuePage />
      case '/track':
        return <TrackPage />
      case '/troubleshoot':
      case '/diagnose':
        return <TroubleshootPage />
      case '/reviews':
        return <ReviewsPage />
      case '/contact':
        return <ContactPage />
      case '/dashboard':
        return <DashboardPage />
      case '/portal':
        return <PortalPage />
      default:
        return <HomePage />
    }
  }

  return (
    <>
      <Header />
      <main id="main-content">
        {renderPage()}
      </main>
      <Footer />
      <AuthDialog />
      {toastMsg && (
        <div className="toast" role="status" aria-live="polite">
          {toastMsg}
        </div>
      )}
    </>
  )
}
