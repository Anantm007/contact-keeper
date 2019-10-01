import React from 'react'
import Contacts from '../contacts/Contacts';

const Home = () => {
    return (
        <div className="grid-2">
            <div>
                {/*Contact form*/}
                <div>
                    <Contacts/>
                </div>
            </div>
        </div>
    )
}

export default Home
