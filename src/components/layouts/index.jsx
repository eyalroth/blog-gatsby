import React from 'react'
import { ContextProvider } from '../Context'
import Layout from './Layout'

export default ({ children, pageContext }) => {
    return (
        <ContextProvider>
            <Layout isStaticPage={pageContext.staticPage}>
                {children}
            </Layout>
        </ContextProvider>
    )
}