import React from 'react'
import NotFound from '../components/NotFound'
import head from '../components/Head'
import { Languages } from '../consts/languages'

function notFound() {
  return <NotFound />
}

export default notFound

export const Head = head({
  getLanguageId: () => Languages.English.id,
  getSubtitle: () => "Page Not Found",
})
