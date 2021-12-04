import React from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';

import { fetchStream } from "../../ducks/actions";

interface StreamShowProps{
    videoRef: any,
    fetchStream: any,
    match: any,
    stream: any,
    player: any
}

class StreamShow extends React.Component<StreamShowProps, any>{
    private videoRef: any;
    private player: any;
    constructor(props: any){
        super(props);

        this.videoRef = React.createRef();
    };

  componentDidMount() {
      const { id } = this.props.match.params;

    this.props.fetchStream(this.props.match.params.id);
    flv.createPlayer({
        type: 'flv',
        url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load()
  };

  render(){
    if(!this.props.stream){
      return <div>Loading...</div>
    }

    const {title, description } = this.props.stream;

    return (
        <div>
            <video
                ref={this.videoRef}
                style={{width: '55%', marginLeft: 400}}
                controls={true}
            />
          <h1 style={{marginLeft: 400}}>{title}</h1>
          <h5 style={{marginLeft: 400}}>{description}</h5>
        </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return { stream: state.streams[ownProps.match.params.id]};
};

export default connect(
    mapStateToProps,
    { fetchStream }
)(StreamShow)
