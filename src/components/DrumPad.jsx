import React from 'react';
import PropTypes from 'prop-types';

const activeStyle = {
  backgroundColor: '#4b4b4b',
  transform: 'translate(0px, 10px) scale(1.3, 1.3)',
};

const inactiveStyle = {
  boxShadow: '4px 4px 4px',
  backgroundColor: '#F2ECFF',
};

export class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: inactiveStyle,
    };
  }

  componentDidMount = () => {
    window.addEventListener('keydown', this.handleKeyPress);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleKeyPress);
  };

  handleKeyPress = e => {
    const { keyCode } = this.props;
    if (e.keyCode === keyCode) {
      this.playSound();
    }
  };

  activatePad = () => {
    const { power } = this.props;
    const { padStyle } = this.state;
    if (power) {
      if (padStyle.backgroundColor === '#4b4b4b') {
        this.setState({
          padStyle: inactiveStyle,
        });
      } else {
        this.setState({
          padStyle: activeStyle,
        });
      }
    } else if (padStyle.transform === 'translate(0px, 10px) scale(1.3, 1.3)') {
      this.setState({
        padStyle: inactiveStyle,
      });
    } else {
      this.setState({
        padStyle: {
          transform: 'translate(0px, 10px) scale(1.3, 1.3)',
          backgroundColor: '#F2ECFFq',
        },
      });
    }
  };

  playSound = () => {
    const { power, keyLetter, clipId, updateDisplay } = this.props;

    const audio = document.getElementById(keyLetter);
    this.activatePad();
    setTimeout(() => this.activatePad(), 100);
    if (power) {
      audio.currentTime = 0;
      audio.play();
      updateDisplay(clipId.replace(/-/g, ' '));
    }
  };

  render() {
    const { clipId, keyLetter, keyClip } = this.props;
    const { padStyle } = this.state;

    return (
      <div
        className="drum-pad"
        id={clipId}
        style={padStyle}
        onClick={this.playSound}
        onKeyDown={this.playSound}
        role="button"
        tabIndex={0}
      >
        {keyLetter}
        <audio className="clip" id={keyLetter} src={keyClip}>
          <track kind="captions" />
        </audio>
      </div>
    );
  }
}

DrumPad.propTypes = {
  clipId: PropTypes.string.isRequired,
  keyCode: PropTypes.number.isRequired,
  keyLetter: PropTypes.string.isRequired,
  keyClip: PropTypes.string.isRequired,
  updateDisplay: PropTypes.func.isRequired,
  power: PropTypes.bool.isRequired,
};
