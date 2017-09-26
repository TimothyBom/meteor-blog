import React from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import PostList from '../ui/components/PostList'
import { Posts } from '../api/posts'

class Home extends React.Component {
    render() {

        const postList = (
            this.props.posts.map(post => <PostList key={post._id} post={post} />)
        )

        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
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
        posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch()
    }
}, Home)