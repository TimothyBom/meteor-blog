import React from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import AddPost from '../ui/components/modal/AddPost'
import EditPost from '../ui/components/modal/EditPost'
import { Posts } from '../api/posts'

class Dashboard extends React.Component {
    deletePost(e) {
        Meteor.call('posts.remove', e)
    }

    render() {

        const postList = (
            this.props.posts.map(post =>
                <div key={post._id} className="row mb-3">
                    <div className="col-md-3">{post.topic}</div>
                    <div className="col-md-7">{post.body}</div>
                    <div className="col-md-2 text-center">
                        <button type="button" className="btn btn-primary mr-2" data-toggle="modal" data-target={`#${post._id}`}>Edit</button>
                        <button type="button" className="btn btn-danger" onClick={this.deletePost.bind(this, post._id)}>Delete</button>
                    </div>
                    <EditPost post={post} />
                </div>
            )
        )

        return (
            <div className="container mt-5">
                <div className="row text-right mb-4">
                    <div className="col-md-12">
                        <button type="button" className="btn btn-primary mr-3" data-toggle="modal" data-target="#AddPost">New Post</button>
                    </div>
                </div>
                <AddPost />

                <div className="row">
                    <div className="col-md-12">
                        <div className="row mb-3">
                            <div className="col-md-3"><h5>Topic</h5></div>
                            <div className="col-md-7"><h5>Body</h5></div>
                            <div className="col-md-2 text-center"><h5>Action</h5></div>
                        </div>
                        {postList}
                    </div>
                </div>
            </div>
        )
    }
}

export default createContainer(() => {
    Meteor.subscribe('posts')
    return {
        posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user()
    }
}, Dashboard)