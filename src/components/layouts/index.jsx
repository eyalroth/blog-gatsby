import React from 'react'
import { ContextProvider } from '../Context'
import Layout from './Layout'

function layouts({ children, pageContext }) {
    return (
        <ContextProvider>
            <Layout isStaticPage={pageContext.staticPage}>
                {children}
            </Layout>
        </ContextProvider>
    )
}

export default layouts;
