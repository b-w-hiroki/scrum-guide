import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TermsSection from './components/TermsSection'
import RolesSection from './components/RolesSection'
import ProcessSection from './components/ProcessSection'
import PracticalSection from './components/PracticalSection'
import CautionsSection from './components/CautionsSection'
import ExamplesSection from './components/ExamplesSection'
import CompaniesSection from './components/CompaniesSection'
import Footer from './components/Footer'
import {
  terms,
  roles,
  sprintProcess,
  practicalTips,
  cautions,
  examples,
  companies,
} from './data/scrumData'

function App() {
  return (
    <div className="bg-surface-50 text-ink-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:shadow-lg"
      >
        メインコンテンツへスキップ
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <TermsSection terms={terms} />
        <RolesSection roles={roles} />
        <ProcessSection sprintProcess={sprintProcess} />
        <PracticalSection practicalTips={practicalTips} />
        <CautionsSection cautions={cautions} />
        <ExamplesSection examples={examples} />
        <CompaniesSection companies={companies} />
      </main>
      <Footer />
    </div>
  )
}

export default App
