import React from 'react'
import Layout from './Layout'

export default ({ children, pageContext }) => {
    return (
        <Layout isStaticPage={pageContext.staticPage}>
            {children}
        </Layout>
    )
}