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
    <div className="bg-slate-950 text-slate-100">
      <Navbar />
      <main>
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
