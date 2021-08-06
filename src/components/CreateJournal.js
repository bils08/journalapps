import axios from 'axios';
import React, { Component } from 'react';
import DatePicker from "react-datepicker";

// import { Form } from 'react-bootstrap';

import "react-datepicker/dist/react-datepicker.css";

export default class CreateJournal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            content: '',
            date: new Date()
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeContent(e) {
        this.setState({
            content: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        const journal = {
            username: this.state.username,
            content: this.state.content,
            date: this.state.date
        }

        console.log(journal);

        axios.post('http://localhost:5000/journal/add', journal)
            .then(res => console.log(res.data));

        window.location = '/';
    }
    
    render() {
        return (
            <div className="container"> 
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control"
                               value={this.state.username}
                               onChange={this.onChangeUsername} />
                    </div>
                    <div className="form-group">
                        <label>Content: </label>
                        <textarea type="text"
                               className="form-control"
                               value={this.state.content}
                               onChange={this.onChangeContent} />
                    </div>
                    <br/>
                    <div>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate} />
                    </div>
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Create Journal" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
