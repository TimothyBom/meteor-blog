import React from 'react'
import { findDOMNode } from 'react-dom'

class EditPost extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            topic: props.post.topic,
            body: props.post.body
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()
        Meteor.call('posts.update', this.props.post._id, this.state)
    }

    render() {
        const { post } = this.props
        const { topic, body } = this.state
        return (
            <div className="modal fade" id={post._id}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Post</h5>
                            <button type="button" className="close" data-dismiss="modal">
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label className="form-control-label">Topic</label>
                                    <input type="text" className="form-control" name="topic" value={topic} onChange={this.onChange} />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Body</label>
                                    <textarea className="form-control" name="body" value={body} onChange={this.onChange}></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={this.onSubmit.bind(this)}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditPost