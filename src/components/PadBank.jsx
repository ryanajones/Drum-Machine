import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DrumPad } from './DrumPad';

export class PadBank extends Component {
  render() {
    const { currentPadBank, updateDisplay, power } = this.props;
    let padBank;
    if (power) {
      padBank = currentPadBank.map((pad, i, currentPad) => (
        <DrumPad
          clipId={currentPad[i].id}
          key={i}
          keyCode={currentPad[i].keyCode}
          keyLetter={currentPad[i].keyLetter}
          keyClip={currentPad[i].keyClipconsole.log()}
          updateDisplay={updateDisplay}
          power={power}
        />
      ));
    } else {
      padBank = currentPadBank.map((pad, i, currentPad) => (
        <DrumPad
          clipId={currentPad[i].id}
          key={i}
          keyCode={currentPad[i].keyCode}
          keyLetter={currentPad[i].keyLetter}
          keyClip="#"
          updateDisplay={updateDisplay}
          power={power}
        />
      ));
    }

    return <div id="pad-bank-container">{padBank}</div>;
  }
}

PadBank.propTypes = {
  currentPadBank: PropTypes.array.isRequired,
  updateDisplay: PropTypes.func.isRequired,
  power: PropTypes.bool.isRequired,
};
