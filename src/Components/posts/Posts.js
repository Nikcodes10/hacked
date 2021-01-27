import React, { Component } from 'react';
import { BASE_URL } from '../../Shared/constants';

export default class Posts extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             all_posts : []
        }
    }

    componentDidMount() {
        this.getPosts();
    }

    async getPosts() {
        try {
            let result = fetch(BASE_URL+'posts', {
            method:'GET'
            });
            result.then((res) => {
                return res.json();
            }).then(posts=>{
                this.setState({all_posts:posts});
                console.log(posts);
                console.log(this.state);
            });
        } 
        catch(err) {
            console.log(err);
        }
    }
    
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
