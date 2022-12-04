import React from 'react'
import { useParams } from 'react-router-dom'

const withRouter = (Component) => {
    const WithRouterComponent = (props) => {
        return (<Component {...props} params={useParams()} />)
    }
    return WithRouterComponent
}

export default withRouter


