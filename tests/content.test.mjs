import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { scrumReference, terms, roles, sprintProcess, cautions, examples } from '../src/data/scrumData.js'

test('reference edition and links point to verified official sources', () => {
  assert.equal(scrumReference.edition, '2020年11月版')
  assert.equal(scrumReference.checkedAt, '2026-11-10')
  for (const key of ['officialUrl', 'japaneseUrl', 'revisionsUrl']) {
    const url = new URL(scrumReference[key])
    assert.equal(url.protocol, 'https:'); assert.equal(url.hostname, 'scrumguides.org')
  }
})
test('terms separate optional practices and avoid mandatory three-question daily', () => {
  assert.equal(terms.length, 13)
  assert.equal(new Set(terms.map(x => x.id)).size, 13)
  assert.deepEqual(terms.filter(x => x.optionalPractice).map(x => x.id), [7, 8, 9, 12, 13])
  assert.ok(terms.find(x => x.id === 4).definition.includes('必須ではない'))
  assert.ok(terms.find(x => x.id === 11).definition.includes('完成の定義を満たし'))
})
test('daily is for developers and retrospective includes the whole Scrum Team', () => {
  assert.deepEqual(sprintProcess.find(x => x.step === 2).participants, ['開発者'])
  assert.deepEqual(sprintProcess.find(x => x.step === 5).participants, ['PO', 'SM', '開発者'])
  assert.ok(roles.find(x => x.id === 'dev').title.includes('Developers'))
  assert.ok(!JSON.stringify(roles).includes('3〜9人'))
})
test('timeboxes and scope changes are not presented as fixed rituals', () => {
  for (const [step, hours] of [[1, 8], [4, 4], [5, 3]]) assert.ok(sprintProcess.find(x => x.step === step).duration.includes(`最大${hours}時間`))
  assert.ok(cautions.some(x => x.solution.includes('一律に変更を禁止せず')))
  assert.ok(!JSON.stringify(cautions).includes('黄金標準'))
})
test('each explanatory case offers a concrete next action', () => {
  assert.ok(examples.every(x => typeof x.nextAction === 'string' && x.nextAction.length > 10))
})
test('reference is visible and company filters expose pressed state', async () => {
  const app = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8')
  const company = await readFile(new URL('../src/components/CompaniesSection.jsx', import.meta.url), 'utf8')
  const cases = await readFile(new URL('../src/components/ExamplesSection.jsx', import.meta.url), 'utf8')
  assert.ok(app.includes('<ReferenceNote />'))
  assert.ok(company.includes('aria-pressed={active === f.key}'))
  assert.ok(company.includes('一次資料と未照合'))
  assert.ok(cases.includes('実在組織の検証済み実績としては扱わない'))
})
