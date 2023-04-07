import React from 'react'
import Home from '../../components/Home'
import { Languages } from '../../consts/languages'
import head from '../../components/Head'

function he() {
  return <Home languageId={Languages.Hebrew.id} />
}

export default he

export const Head = head({
  getLanguageId: () => Languages.Hebrew.id,
  getDescription: () => `Home page - ${Languages.Hebrew.id}`,
})
