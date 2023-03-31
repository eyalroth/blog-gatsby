import React from "react"
import Home from '../../components/Home'
import { Languages } from '../../consts/languages'

function he() {
    return <Home languageId={Languages.Hebrew.id}/>
}

export default he;
