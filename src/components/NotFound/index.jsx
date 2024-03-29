import React from 'react'
import { Link } from 'gatsby'
import Page from '../Page'
import { Languages } from '../../consts/languages'
import './style.scss'

class NotFound extends React.Component {
    render() {
        return (
            <Page languageId={Languages.English.id}>
                <div className="notfound">
                    <h1 className="notfound__title">
                        Page not found :(
                    </h1>
                    <p className="notfound__subtitle">
                        The link you followed may be broken, or the page may have been removed
                    </p>
                    <Link className="notfound__link" to="/">
                        Go back
                    </Link>
                </div>
            </Page>
        )
    }
}

export default NotFound
