const { withMdx } = require('./mdx')

exports.wrapRootElement = ({ element }) => {
    return withMdx(element)
}
