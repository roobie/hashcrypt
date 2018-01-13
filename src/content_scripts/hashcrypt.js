(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return
  }
  window.hasRun = true

  /**
   * Listen for messages from the background script.
  */
  browser.runtime.onMessage.addListener(message => {
    switch (message.action) {
    case 'injectPassword':
      const pw = message.data
      const pwInputs = document.querySelectorAll('[type=password]')
      for (let i = 0; i < pwInputs.length; ++i) {
        const pwInput = pwInputs[i]
        pwInput.value = pw
      }
      break;

    default:
      break;
    }
  })
})()
