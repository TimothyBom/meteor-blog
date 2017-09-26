import React from 'react'
import moment from 'moment'

class PostList extends React.Component {
    render() {
        const { post } = this.props
        const time = moment(post.createdAt).format('MMMM D, YYYY')
        return (
            <div className="blog-post">
                <h2 className="blog-post-title">{post.topic}</h2>
                <p className="blog-post-meta">{time} by {post.username}</p>
                <p>{post.body}</p>
            </div>
        )
    }
}

export default PostList