import React, { Component } from 'react';
import './Signup.css';
import { BASE_URL } from '../../Shared/constants';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
         
        };
    }

    handleSubmit = ($event) => {
        $event.preventDefault();
    
        const formData = new FormData($event.target);

        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

        try {
            let result = fetch( BASE_URL +'users/signup', {
                method: 'POST',
                
                body: formData
            })
            result.then((res) => { 
                if(res.status === 200) {
                    console.log("Signup Success");
            
                } else if(res.status === 201) {
                    console.log("User already exists");
                } else {
                    console.log("error");
                }
             });
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} encType="multipart/form-data">

                    <input className="s-input" type="text" id="username" aria-label="username" 
                        placeholder="username" name="username" required></input>

                    <input className="s-input" type="text" id="name" aria-label="name" 
                        placeholder="Name" name="name" required></input>

                    <input className="s-input" type="password" id="password" aria-label="password" 
                        placeholder="password" name="password" required></input>

                    <input className="s-input" type="email" id="email" aria-label="email-id" 
                        placeholder="email" name="email" required></input>

                    <input className="s-input" type="text" id="job" aria-label="job" 
                        placeholder="job" name="job" required></input>

                    <button type="submit">Sign-up</button>

                </form>
            </div>
        )
    }
}
