import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Journals = props => (
    <tr>
        <td>{props.journal.username}</td>
        <td>{props.journal.content}</td>
        <td>{props.journal.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.journal._id}>edit</Link> | <a href="#" onClick={() => { props.deleteJournal(props.journal._id)}}>delete</a>
        </td>
    </tr>
)

export default class JournalList extends Component {
    constructor(props) {
        super(props);
        
        this.deleteJournal = this.deleteJournal.bind(this);
        
        this.state = {journals: []};
    }

    componentDidMount() {
        axios.get("http://localhost:5000/journal")
            .then(response => {
                this.setState({ journals: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteJournal(id) {
        axios.delete("http://localhost:5000/journal/"+id)
            .then(res => console.log(res.data));

        this.setState({
            journals: this.state.journals.filter(jl => jl._id !== id)
        })
    }

    JournalList() {
        return this.state.journals.map(currentJournals => {
            return<Journals journal={currentJournals} deleteJournal={this.deleteJournal} key={currentJournals._id} />;
        })
    }

    render() {
        return (
            <div> 
                <h3>Logged Journals</h3>
                <table className="table">
                    <thead className="thead-lights">
                        <tr>
                            <th>Username</th>
                            <th>Content</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.JournalList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
