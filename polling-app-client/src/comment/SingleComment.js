import React, { Component } from 'react';

class SingleComment extends Component {

	constructor(props) {
        super(props);
	
		
    }

	
        
    render() {    
		console.log(this.props.comment); 
        return (
            <div className="poll-content">
                <div className="poll-header">
					<div>
						<p>Comment: {this.props.comment.text}</p>
						<p>Author: {this.props.comment.userName}</p>
                     </div>
                </div>
				
            </div>
        );
    }
}

export default SingleComment;