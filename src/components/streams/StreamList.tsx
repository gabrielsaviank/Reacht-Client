import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../ducks/actions';
import { Link } from 'react-router-dom';

interface StreamProps {
  streams?: object | any,
  fetchStreams?: any,
  currentUserId?: string,
  isSignedIn?: boolean,
};

class StreamList extends React.Component<StreamProps> {
  componentDidMount () {
    this.props.fetchStreams();
  };

  renderAdmin(stream: any) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>

          <button className="ui button negative">
            Delete
          </button>
        </div>
      );
    };
  };

  renderList = () => {
    return this.props.streams.map((stream: any) =>  {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera"/>
          <div className="content">
            {stream.title}
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  };

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    };
  };

  render(){
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">
          {this.renderList()}
          {this.renderCreate()}
        </div>
      </div>
    )
  }
};

const mapStateToProps = ( state: any) => {
  return { 
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect( 
  mapStateToProps,
  {fetchStreams}
)(StreamList);