import React from "react"
import Home from '../../components/Home'
import { Languages } from '../../consts/languages'

function en() {
    return <Home languageId={Languages.English.id}/>
}

export default en;
