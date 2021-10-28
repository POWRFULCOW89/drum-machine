import { Component } from 'react';

const keys = [
  ['Q', 'Heater 1', 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' ],
  ['W', 'Heater 2', 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' ],
  ['E', 'Heater 3', 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' ],
  ['A', 'Heater 4', 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' ],
  ['S', 'Clap', 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' ],
  ['D', 'Open HH', 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' ],
  ['Z', "Kick n' Hat", 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' ],
  ['X', 'Kick', 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' ],
  ['C', 'Closed HH', 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' ],
];

const play = id => {
  let audio = document.getElementById(id);
  audio.play();
}

class Toggle extends Component {
  constructor(props){
    super(props);
    this.state = {
      toggle: true,
      id: Math.floor(Math.random() * 1000)
    }
    
  }
  
  toggle = () => {
     this.setState({toggle: !this.state.toggle}, () => {
      let e = document.getElementById(`toggle-switch-${this.state.id}`);
      e.classList.add( this.state.toggle ? 'toggle-on' : 'toggle-off');
      e.classList.remove( this.state.toggle ? 'toggle-off' : 'toggle-on');
    });
     this.props.onChange();
  }
  
  render(){ 
    return <div className='row center '>
      <div className='col-12 text-center mb-2 h5'>{this.props.label}</div>
      <div className='col-12 toggle-container d-flex justify-content-start flex-row rounded-pill' id={`toggle-container-${this.state.id}`} >
        <div id={`toggle-switch-${this.state.id}`} onClick={this.toggle} className={`toggle-switch ${this.toggle ? 'toggle-on' :  'toggle-off'} rounded-pill`} />
      </div>
    </div>
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      lastKey: '',
      power: true
    } 
  }
  
  componentWillMount(){

    const logKey = e => {
      let arr = keys.filter(arr => arr[0] === e.code[3]).flat();
      if (arr.length > 0 && this.state.power){
        play(e.code[3]);
        this.setState({lastKey: arr[1]});
      }
    }
        
    document.addEventListener('keydown', logKey);
  }
  
  renderDrumPads = () => {
    return keys.map(arr => 
      <button
        className='col-4 btn border drum-pad'
        id={'pad' + arr[0]}
        key={'pad' + arr[0]}
        disabled = {this.state.power ? false : true}
        onClick={() => {
          this.setState({lastKey: arr[1]});  
          play(arr[0]);
        }}
        >{arr[0]}
        <audio id={arr[0]} src={arr[2]} className='clip' />
      </button>);
  }
    
  render(){
    return <div className='container-fluid center m-2'>
    <div 
      id='drum-machine'
      className='row shadow rounded d-flex justify-content-around align-items-center p-4 main' >
      
      <div className='col-8'>
        {this.renderDrumPads()}
      </div>
      <div className='col-4 row d-flex justify-content-around align-items-center'>
        <Toggle className='col-12' label='Power'  onChange={() => this.setState({power: !this.state.power})} />
        
        <div className='col-12 text-center border mt-2' id='display'>{this.state.lastKey}</div>
      </div>
    </div>
  </div> 
  }
}


export default App;
