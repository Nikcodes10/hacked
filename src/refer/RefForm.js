import React, { Component } from 'react';

export default class RefForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             title:""
        }
    }

    handleTitle = (evt) => {
        this.setState({title:evt.target.value}, () => {
            console.log(this.state);
        });
    }

    marginStyle = {
        margin:'30px',
    };
    
    render() {
        return (
            <div>
                <input style={this.marginStyle} type="text" value={this.state.title} onChange={this.handleTitle}></input>
            </div>
        )
    }
}
