import React from 'react'
// @ts-ignore
import preloader from '../../../assets/images/loader.gif'

const Preloader: React.FC = () => {
    return (
        <div style={{ backgroundColor: 'white' }}>
            <img src={preloader} alt='preloader' />
        </div>
    )
}

export default Preloader