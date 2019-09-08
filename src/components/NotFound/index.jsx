import React from 'react'
import { Link } from 'gatsby'
import PageHelmet from '../PageHelmet'
import './style.scss'

class NotFound extends React.Component {
    render() {

        return (
            <div className="notfound">
                <PageHelmet subtitle="Page Not Found" />
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
        )
    }
}

export default NotFound