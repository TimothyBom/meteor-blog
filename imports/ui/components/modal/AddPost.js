import React from 'react'
import { findDOMNode } from 'react-dom'

class AddPost extends React.Component {
    onSubmit(e) {
        e.preventDefault()

        const topic = findDOMNode(this.refs.topic).value.trim()
        const body = findDOMNode(this.refs.body).value.trim()

        Meteor.call('posts.insert', topic, body)

        findDOMNode(this.refs.topic).value = ''
        findDOMNode(this.refs.body).value = ''
    }

    render() {
        return (
            <div className="modal fade" id="AddPost">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">New Post</h5>
                            <button type="button" className="close" data-dismiss="modal">
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label className="form-control-label">Topic</label>
                                    <input type="text" className="form-control" ref="topic" />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Body</label>
                                    <textarea className="form-control" ref="body"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={this.onSubmit.bind(this)}>Post</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddPost