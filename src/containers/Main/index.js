import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { dataServices } from '../../services/data.service'
import Loading from "../../components/Loading/Loading";
import './index.css'

export default function Main() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        dataServices.getUsers({ signal })
            .then(res => setUsers(res.data))
            .then(() => setLoading(false))

        return function cleanup() {
            abortController.abort()
        }
    }, [])

    return(
        <div>
            { loading
                ?
                <Loading />
                :
                <div className="users">
                    {users.map(user =>
                        <Link to={`/user/${ user.id }`} key={ user.id }>
                            <div className="userName">{ user.username }</div>
                        </Link>
                    )}
                </div>
            }
        </div>
    )
}
