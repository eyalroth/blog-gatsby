import React from 'react'
import ContextConsumer, { ContextProvider } from '../Context'
import DefaultLayout from './DefaultLayout'
import StaticPageLayout from './StaticPageLayout'
import '../../assets/scss/init.scss'
import './style.scss'

export default ({ children, pageContext }) => {

    let layout = <DefaultLayout>{children}</DefaultLayout>
    if (pageContext.staticPage) {
        layout = <StaticPageLayout>{children}</StaticPageLayout>
    }

    return (
        <ContextProvider>
            <ContextConsumer>
                {({theme}) => (
                    <div className={`themed-container ${theme.get().cssClass}`}>
                        {layout}
                    </div>
                )}
            </ContextConsumer>
        </ContextProvider>
    )
}