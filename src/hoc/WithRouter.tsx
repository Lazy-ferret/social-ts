import React from 'react'
import { useParams } from 'react-router-dom'

function withRouter<WrappedComponentProps>(WrappedComponent: React.ComponentType<WrappedComponentProps>) {
    const WithRouterComponent = (props: WrappedComponentProps) => {
        return (<WrappedComponent {...props} params={useParams()} />)
    }
    return WithRouterComponent
}

export default withRouter


