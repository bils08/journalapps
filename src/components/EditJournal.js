import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default class EditJournals extends Component {
    constructor(props){
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        
        this.state = {
            username: "",
            content: "",
            date: new Date()
        }
    }

    componentDidMount() {
        axios.get("http://localhost:5000/journal/"+this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    content: response.data.content,
                    date: new Date(response.data.date)
                })
            })
            .catch(function(error) {
                console.log("line 31: " + error);
            })
        
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
        e.prevenDefault();

        const journal = {
            username: this.state.username,
            content: this.state.content,
            date: this.state.date
        }

        console.log(journal);

        axios.post("http://localhost:5000/journal/update/"+this.props.match.params.id, journal)
            .then(res => console.log(res.data));
        
        window.location = "/";
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
                               onChange={this.onChangeUsername} required />
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
                        <input type="submit" value="Edit Journal" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}