import axios from 'axios';
import React, { Component } from 'react';

const Users = props => (
    <tr>
        <td>{props.user.username}</td>
    </tr>
)

export default class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:5000/user")
            .then(response => {
                this.setState({ users: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    UserList() {
        return this.state.users.map(currentUsers => {
            return<Users user={currentUsers}  key={currentUsers._id} />
        })
    }

    render() {
        return (
            <div>
                <h3>Users</h3>
                <table className="table">
                    <thead className="thead-lights">
                        <tr>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.UserList()}
                    </tbody>
                </table>
            </div>
        )
    }
}