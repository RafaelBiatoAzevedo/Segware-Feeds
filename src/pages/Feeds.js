import React from 'react';
import Feed from '../components/Feed';
import LogoSegware from '../images/logoSegware.png';
import requestFeeds from '../services/serviceAPI';
import '../styles/feeds.css';

class Feeds extends React.Component {
  constructor(props) {
    super(props);
    this.handleclick = this.handleclick.bind(this);
    this.setUpvotes = this.setUpvotes.bind(this);
    this.state = {
      feeds: [
        {
          name: 'Segware',
          content: 'Bem vindo(a) ao nooso feeds ! Deixe seu comentário.',
          countUpvotes: 0,
        }
      ],
      feed: {
        name: '',
        content: '',
        countUpvotes: 0,
      },
    }
  }

  componentDidMount() {
    requestFeeds().then((response) => this.setFeeds(response));
  }
  
  setFeed(evt) {
    const { name, value } = evt.target;
    this.setState((state) => ({ feed: { ...state.feed, [name]: value } }));
  }

  setFeeds(Apifeeds) {
    this.setState((state) => ({ feeds: [...state.feeds, ...Apifeeds] }));
  }

  setUpvotes(index) {
    const { feeds } = this.state;
    const cloneFeeds = [...feeds];
    cloneFeeds[index].countUpvotes += 1;
    this.setState((state) => ({ ...state, feeds: cloneFeeds }));
  }

  handleclick() {
    const { feed } = this.state;
    const { content } = feed;
    if ( content === '' ) alert('Por favor digite uma mensagem.');
    else {
      this.setState((state) => ({ feeds: [...state.feeds, state.feed] }));
      this.setState({ feed: { name: '', content: '', countUpvotes: 0} });
    }
  }

  renderHeaderFeeds() {
    return (
      <div className="container-header-feeds">
        <img data-testid="logoSegware-header" src={ LogoSegware } alt="logo" />
        <h1 data-testid="h1-header">Feeds</h1>
      </div>
    );
  }

  renderFeeds() {
    const { feeds } = this.state;
    return (
      <div className="container-feeds">
        { 
          feeds.map((feed, index) => (
            <Feed
              key={ index }
              feed={ feed }
              index={ index }
              setUpvotes={ this.setUpvotes }
            />
          ))
        }
      </div>
    );
  }

  renderAddFeed() {
    const { feed } = this.state;
    const { name, content } = feed;
    return (
      <div className="container-form">
        <form className="form-feed">
          <div className="container-inputs-form">
            <input
              data-testid="input-name"
              value={ name }
              className="input-feed"
              name="name"
              type="text"
              placeholder="Digite seu nome (opcional)"
              onChange = { (evt) => this.setFeed(evt) }
            />
            <textarea
              data-testid="input-msg"
              value={ content }
              className="input-feed"
              name="content"
              rows="3"
              cols="50"
              placeholder="Digite sua mensagem"
              onChange = { (evt) => this.setFeed(evt) }
            />
          </div>
          <button
            data-testid="btn-post"
            className="btn-post"
            type="button"
            onClick={ this.handleclick }
          >
            Postar
          </button>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div>
        { this.renderHeaderFeeds() }
        { this.renderFeeds()  }
        { this.renderAddFeed() }
      </div>
    );
  }
}

export default Feeds;
