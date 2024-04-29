// Write your code here
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {id, name, comment, date, isLiked, initialClassName} = props
  const initail = name ? name[0].toUpperCase() : ''
  const likeTextClassName = isLiked ? 'button active' : 'button'
  const LikeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const postedTime = formatDistanceToNow(date)

  const onClickLike = () => {
    const {toggleIsLiked} = props
    toggleIsLiked(id)
  }

  const onDeleteComment = () => {
    const {deleteComment} = props
    deleteComment(id)
  }

  return (
    <li className="comment-item">
      <div className="comment-container">
        <div className="initail-container">
          <p className={initialClassName}> {initail} </p>
        </div>

        <div>
          <div className="username-time-contaner">
            <p className="username">{name} </p>
            <p className="time"> {postedTime} </p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="button-container">
        <img src={LikeImageUrl} alt="like" className="like-image" />
        <button
          type="button"
          onClick={onClickLike}
          className={likeTextClassName}
        >
          Like
        </button>
        <button
          type="button"
          onClick={onDeleteComment}
          className="deletebtn"
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="comment-line" />
    </li>
  )
}

export default CommentItem
