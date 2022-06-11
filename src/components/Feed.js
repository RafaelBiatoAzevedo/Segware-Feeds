import React from 'react';
import AvatarSegware from '../images/avatarSegware.png';
import UpvoteIcon from '../images/upvoteIcon.png';
import AnonymusIcon from '../images/anonymusAvatar.png';
import GenericAvatar from '../images/genericAvatar.jpg';

function Feed({ feed, index, setUpvotes }) {
  const { name = '', content, countUpvotes = 0 } = feed;
  return (
    <div data-testid="feed" className="feed">
      <div className="top-feed">
        <img
          data-testid="imgAvatar-feed"
          className="imgAvatar"
          src={ name === '' ? AnonymusIcon : index === 0 ? AvatarSegware : GenericAvatar }
          alt="avatar"
        />
        <h4 data-testid="name-feed">{ name === '' ? 'Anônimo' : name }</h4>
      </div>
      <div className="container-msg">
        <p data-testid="msg-feed" className="msg-feed">{ content }</p>
        <div className="container-upvotes">
          <button
            data-testid="btnUpvotes-feed"
            className="btn-upvotes"
            type="button"
            onClick={ () => setUpvotes(index) }
          >
            <img data-testid="imgUpvotes-feed" className="upvoteIcon" src={ UpvoteIcon } alt="upvoteIcon"/>
          </button>
          <span data-testid="countUpvotes-feed">{ countUpvotes }</span>
        </div>
      </div>
    </div>
  );
}

export default Feed;
