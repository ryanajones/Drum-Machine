import React from 'react';
import './App.scss';
import { PadBank } from './components/PadBank';

const setOne = [
  {
    id: 'Heater-1',
    keyCode: 81,
    keyLetter: 'Q',
    keyClip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  },
  {
    id: 'Heater-2',
    keyCode: 87,
    keyLetter: 'W',
    keyClip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  },
  {
    id: 'Heater-3',
    keyCode: 69,
    keyLetter: 'E',
    keyClip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  },
  {
    id: 'Heater-4',
    keyCode: 65,
    keyLetter: 'A',
    keyClip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  },
  {
    id: 'Clap',
    keyCode: 83,
    keyLetter: 'S',
    keyClip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  },
  {
    id: 'Open-HH',
    keyCode: 68,
    keyLetter: 'D',
    keyClip: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
  },
  {
    id: 'Kick-n-Hat',
    keyCode: 90,
    keyLetter: 'Z',
    keyClip: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  },
  {
    id: 'Kick',
    keyCode: 88,
    keyLetter: 'X',
    keyClip: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  },
  {
    id: 'Closed-HH',
    keyCode: 67,
    keyLetter: 'C',
    keyClip: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
  },
];

const setTwo = [
  {
    id: 'Chord-1',
    keyCode: 81,
    keyLetter: 'Q',
    keyClip: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3',
  },
  {
    id: 'Chord-2',
    keyCode: 87,
    keyLetter: 'W',
    keyClip: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3',
  },
  {
    id: 'Chord-3',
    keyCode: 69,
    keyLetter: 'E',
    keyClip: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3',
  },
  {
    id: 'Shaker',
    keyCode: 65,
    keyLetter: 'A',
    keyClip: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3',
  },
  {
    id: 'Open-HH',
    keyCode: 83,
    keyLetter: 'S',
    keyClip: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3',
  },
  {
    id: 'Closed-HH',
    keyCode: 68,
    keyLetter: 'D',
    keyClip: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3',
  },
  {
    id: 'Punchy-Kick',
    keyCode: 90,
    keyLetter: 'Z',
    keyClip: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
  },
  {
    id: 'Side-Stick',
    keyCode: 88,
    keyLetter: 'X',
    keyClip: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3',
  },
  {
    id: 'Snare',
    keyCode: 67,
    keyLetter: 'C',
    keyClip: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3',
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      power: true,
      display: '',
      currentPadBank: false,
      currentPadBankId: setOne,
      sliderVol: 0.5,
    };
  }

  componentDidMount() {
    const keys = document.querySelectorAll('.drum-pad');
    keys.forEach(key =>
      key.addEventListener('transitionend', function(e) {
        if (e.propertyName !== 'transform') return;
        this.classList.remove('drum-effect');
      })
    );
  }

  powerControl = () => {
    const { checked } = this.state;
    if (checked) {
      this.setState({ power: true });
    } else if (!checked) {
      this.setState({ power: false });
    }
  };

  powerChecked = () => {
    const { checked, power } = this.state;
    this.setState({
      checked: !checked,
      power: !power,
    });
    this.clearDisplay();
  };

  adjustVolume = e => {
    const { power } = this.state;
    if (power) {
      this.setState({
        sliderVol: e.target.value,
        display: `volume: ${Math.round(e.target.value * 100)}`,
      });
      setTimeout(() => {
        this.clearDisplay();
      }, 1000);
    }
  };

  clearDisplay = () => {
    this.setState({
      display: '',
    });
  };

  selectSet = () => {
    const { power, currentPadBank } = this.state;
    if (power) {
      this.setState({
        currentPadBank: !currentPadBank,
      });
      if (!currentPadBank) {
        this.setState({
          currentPadBankId: setTwo,
          display: 'Piano Kit',
        });
        setTimeout(() => {
          this.clearDisplay();
        }, 1000);
      } else {
        this.setState({
          currentPadBankId: setOne,
          display: 'Heater Kit',
        });
        setTimeout(() => {
          this.clearDisplay();
        }, 1000);
      }
    }
  };

  title = () => (
    <div id="title-wrapper">
      <div id="title">
        <div id="title-name">Drum Machine</div>
        <div id="triangle-container">
          <div className="triangle" id="triangle-top" />
          <div className="triangle-bottom-set">
            <div className="triangle" id="triangle-left" />
            <div className="triangle" id="triangle-right" />
          </div>
        </div>
      </div>
    </div>
  );

  displayUpdate = newName => {
    this.setState({
      display: newName,
    });
  };

  render() {
    const {
      sliderVol,
      power,
      currentPadBankId,
      currentPadBank,
      checked,
      display,
    } = this.state;

    const clip = [].slice.call(document.getElementsByClassName('clip'));
    clip.forEach(audio => {
      audio.volume = sliderVol;
    });

    return (
      <div>
        <div id="drum-machine">
          {this.title()}
          <div id="components-wrapper">
            <PadBank
              power={power}
              updateDisplay={this.displayUpdate}
              currentPadBank={currentPadBankId}
            />
            <div id="controls-container">
              <div id="power">
                <p>Power</p>
                <label htmlFor="power-input">
                  <input
                    id="power-input"
                    type="checkbox"
                    checked={checked}
                    onClick={this.powerChecked}
                  />
                  <span />
                </label>
              </div>
              <div id="display">{display}</div>
              <div id="volume">
                <p>Volume</p>
                <input
                  type="range"
                  min="0.01"
                  max="1"
                  step="0.01"
                  className="volumeSlider"
                  value={sliderVol}
                  id="myRange"
                  onChange={this.adjustVolume}
                />
              </div>
              <div id="selectSet">
                <p>Kit</p>
                <label htmlFor="kit-input">
                  <input
                    id="kit-input"
                    type="checkbox"
                    checked={currentPadBank}
                    onClick={this.selectSet}
                  />
                  <span />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
