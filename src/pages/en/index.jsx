import React from 'react'
import Home from '../../components/Home'
import head from '../../components/Head'
import { Languages } from '../../consts/languages'

function en() {
  return <Home languageId={Languages.English.id} />
}

export default en

export const Head = head({
  getLanguageId: () => Languages.English.id,
  getDescription: () => `Home page - ${Languages.English.id}`,
})
