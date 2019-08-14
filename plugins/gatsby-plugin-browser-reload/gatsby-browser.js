// eslint-disable-next-line
export function onServiceWorkerUpdateReady({}, pluginOptions ) {
  const autoReload = pluginOptions.autoReload && pluginOptions.autoReload.toLowerCase() === 'true'
  const answer = autoReload ||  window.confirm(
    `This application has been updated. ` +
      `Reload to display the latest version?`
  )
  if (answer === true) {
    window.location.reload()
  }
}