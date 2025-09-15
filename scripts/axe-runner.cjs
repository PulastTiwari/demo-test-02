#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const axios = require('axios')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const axeCore = require('axe-core')

async function run() {
  const url = process.argv[2] || 'http://localhost:3000'
  console.log('Fetching', url)
  const res = await axios.get(url)
  const dom = new JSDOM(res.data, { url, runScripts: 'outside-only', resources: 'usable' })
  const { window } = dom
  // inject axe into the JSDOM window using a vm context so axe has a proper global
  const vm = require('vm')
  const script = new vm.Script(axeCore.source)
  const sandbox = {
    window: window,
    document: window.document,
    console,
    setTimeout: window.setTimeout,
    clearTimeout: window.clearTimeout,
    setInterval: window.setInterval,
    clearInterval: window.clearInterval,
    fetch: window.fetch,
    Promise: window.Promise,
  }
  const context = vm.createContext(sandbox)
  script.runInContext(context)
  // axe should now be available as window.axe
  if (!window.axe) {
    throw new Error('axe not available on window')
  }
  const results = await window.axe.run(window.document)
  const outPath = path.join(process.cwd(), 'axe-report.json')
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2))
  console.log('Wrote', outPath)
  const violations = results.violations || []
  console.log('\nAccessibility violations found:', violations.length)
  violations.slice(0, 10).forEach((v, i) => {
    console.log(`\n${i + 1}. ${v.id} - ${v.impact} - ${v.help}`)
    console.log('   Help: ', v.helpUrl)
    v.nodes.slice(0, 3).forEach((n) => {
      console.log('   Target:', n.target.join(', '))
      console.log('   Failure summary:', (n.failureSummary || '').split('\n').slice(0,2).join(' '))
    })
  })
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
