// the desired length of the site's password
const PW_LENGTH = 20

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({file: "/content_scripts/hashcrypt.js"})
  .then(initialize)
  .catch(reportExecuteScriptError)

function initialize () {
  const qs = document.querySelector.bind(document)
  const inputMasterPassword = qs('#master-password')
  const outputSitePassword = qs('#site-password')
  const actionInject = qs('#action-inject')
  const outputSiteId = qs('#site-id')

  const outputDebug = qs('#debug-output')

  browser.tabs.query({active: true, currentWindow: true})
    .then(tabs => tabs[0])
    .then(tab => {
      const siteId = new URL(tab.url).host
      outputSiteId.value = siteId
    })

  inputMasterPassword.addEventListener('input', event => {
    const masterPassword = event.target.value
    if (!masterPassword) {
      outputSitePassword.value = ''
      return
    }

    browser.tabs.query({active: true, currentWindow: true})
      .then(tabs => tabs[0])
      .then(tab => {
        const siteId = new URL(tab.url).host
        const sitePassword = sha512(siteId + masterPassword).slice(0, PW_LENGTH)
        outputSitePassword.value = sitePassword
      })
  })

  actionInject.addEventListener('click', doInject)
  inputMasterPassword.addEventListener('keyup', event => {
    if (event.keyCode === 13) {
      return doInject(event)
    }
  })

  function doInject (event) {
    browser.tabs.query({active: true, currentWindow: true})
      .then(tabs => tabs[0])
      .then(tab => {
        browser.tabs.sendMessage(tab.id, {
          action: 'injectPassword',
          data: outputSitePassword.value
        })
      })
  }
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError (error) {
  const qs = document.querySelector.bind(document)
  const outputDebug = qs('#debug-output')
  outputDebug.display = 'block'
  outputDebug.textContent = `
https://github.com/roobie/hashcrypt/issues"
${error.message}`
}

// function checkStoredSettings (storedSettings) {
//   if (!storedSettings.thing) {
//     browser.storage.local.set({ thing: 1 })
//   }
// }

// const gettingStoredSettings = browser.storage.local.get()
// gettingStoredSettings.then(checkStoredSettings, reportExecuteScriptError)
