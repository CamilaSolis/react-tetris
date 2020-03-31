import React, { Component } from 'react';
import './App.css';
import Tetris from './tetris';
import ReactDOM from 'react-dom';

const keybordsKeys = [
  [65, 68, 83, 87],
]

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tetris: [],
    }

    const keyListener = (event) => {
      keybordsKeys.forEach((key, index) => {
            const { player } = this.state.tetris[index];

            if (event.type === 'keydown'){
                if (event.keyCode === key[0]) {
                    player.move(-1);
                } else if (event.keyCode === key[1]) {
                    player.move(1);
                } else if (event.keyCode === key[3]) {
                    player.rotate(1);
                }
            }

            if (event.keyCode === key[2]) {
                if (event.type === 'keydown') {
                    if (player.dropInterval !== player.DROP_FAST) {
                        player.drop();
                        player.dropInterval = player.DROP_FAST;
                    }
                } else {
                    player.dropInterval = player.DROP_SLOW;
                }
            }
        });
    }

    document.addEventListener('keydown', keyListener );
    document.addEventListener('keyup', keyListener );
  }

  render () {
    return (
      <div className="App">
        <div className='player' ref={(ref) => {
          const tetris = new Tetris(ref, this.props.events);
          this.state.tetris.push(tetris);
        }}>
          <Player events={this.props.events} />
        </div>
      </div>
    );
  }
}

class Player extends Component {
  constructor (props) {
    super(props)
    this.state = {
      score: 0,
    }

    props.events.on('updateScore', (score) => {
      console.log(score)
      this.setState({
        score,
      })
    })
  }

  render () {
    return (
      <div>
        <Score score={this.state.score} />
        <canvas className="tetris" ref="canvas" width="240" height="400" />
      </div>
    )
  }
}

class Score extends Component {
  render () {
    return (<div>{this.props.score}</div>)
  }
}

export default App;
