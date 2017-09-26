import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'

export const Posts = new Mongo.Collection('posts')

if (Meteor.isServer) {
    Meteor.publish('posts', function postsPublication() {
        return Posts.find()
    })
}

Meteor.methods({
    'posts.insert'(topic, body) {
        check(topic, String)
        check(body, String)

        if (!this.userId) {
            throw new Meteor.Error('not-authorized')
        }

        Posts.insert({
            topic,
            body,
            owner: this.userId,
            createdAt: new Date(),
            username: Meteor.users.findOne(this.userId).username
        })
    },
    'posts.update'(postId, data) {
        check(postId, String)
        check(data.topic, String)
        check(data.body, String)

        const post = Posts.findOne(postId)
        if (post.owner !== this.userId) {
            throw new Meteor.Error('not-authorized')
        }

        Posts.update(postId, { $set: { topic: data.topic, body: data.body } })
    },
    'posts.remove'(postId) {
        check(postId, String)

        const post = Posts.findOne(postId)
        if (post.owner !== this.userId) {
            throw new Meteor.Error('not-authorized')
        }

        Posts.remove(postId)
    }
})