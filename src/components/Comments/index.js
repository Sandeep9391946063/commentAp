import {Component} from 'react'

import {v4} from 'uuid'
import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    nameInput: '',
    commentInput: '',
    commentList: [],
  }

  deleteComment = commentId => {
    const {commentList} = this.state

    this.setState({
      commentList: commentList.filter(comment => comment.id !== commentId),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachComment => {
        if (id === eachComment.id) {
          return {
            ...eachComment,
            isLiked: !eachComment.isLiked,
          }
        }
        return eachComment
      }),
    }))
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialContainerBackgroundClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialContainerBackgroundClassName,
    }

    this.setState(prevState => ({
      commentList: [...prevState.commentList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  onChangeNameInput = event => {
    this.setState({
      nameInput: event.target.value,
    })
  }

  onChangeCommentInput = event => {
    this.setState({
      commentInput: event.target.value,
    })
  }

  renderCommentsList = () => {
    const {commentList} = this.state

    return commentList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  render() {
    const {nameInput, commentInput, commentList} = this.state
    return (
      <div className="background">
        <div className="background-2">
          <div className="comments-container">
            <h1 className="heading"> Comments</h1>
            <div className="comments-inputs">
              <form className="form" onSubmit={this.onAddComment}>
                <p className="form-description">
                  Say something about 4.0 Technologies
                </p>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="name-input"
                  value={nameInput}
                  onChange={this.onChangeNameInput}
                />
                <textarea
                  className="comment-input"
                  rows="6"
                  value={commentInput}
                  placeholder="Your Comment"
                  onChange={this.onChangeCommentInput}
                />
                <button type="submit" className="button">
                  Add Comment
                </button>
              </form>
            </div>
          </div>
          <img
            alt="comments"
            className="image"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
          />
        </div>
        <hr className="line" />
        <p className="heading">
          <span className="comment-count">{commentList.length}</span>
          Comments
        </p>
        <ul className="comments-list">{this.renderCommentsList()}</ul>
      </div>
    )
  }
}

export default Comments
