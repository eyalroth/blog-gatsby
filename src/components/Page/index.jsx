import React, { Children } from 'react'
import Layout from '../Layout'
import './style.scss'

class Page extends React.Component {
    render() {
        const { title, children } = this.props

        return (
            <Layout subtitle={title}>
                <div className="page">
                    <h1 className="page__title">{title}</h1>
                    <div className="page__body">
                        {children}
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Page