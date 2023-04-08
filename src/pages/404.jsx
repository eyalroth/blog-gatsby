import React from 'react'
import NotFound from '../components/NotFound'
import createHead from '../components/Head'
import { Languages } from '../consts/languages'

function notFound() {
  return <NotFound />
}

export default notFound

export const Head = createHead({
  overrideLanguageId: Languages.English.id,
  overrideSubtitle: 'Page Not Found',
})
