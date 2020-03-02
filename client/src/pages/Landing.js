import React, { useEffect } from 'react'
import { connect } from 'react-redux'

const Landing = ({ user }) => {

    const renderChallengers =() => {
        return Object.keys(user.challengers).map(challengerId => {
            const challenger = user.challengers[challengerId]
            return (
                <div key={challenger._id}>
                    <p>{challenger.name}</p>
                </div>
            )
        })
    }

    return (
        <div>
            <h1>Challengers</h1>
            {Object.keys(user.challengers).length > 0 ?
            renderChallengers()
            :
            <p>No One is Logged in Yet :/</p>
            }
        </div>
    )
}

const mapStateToProps =({ user }) => {
    return { user }
}

export default connect(mapStateToProps)(Landing)
