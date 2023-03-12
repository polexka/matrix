import React from "react";
import Latex from 'react-latex';

class Interface extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
  }

  handleInputChange(e) {
    this.props.handleInputChange(e);
  }

  handleChangeType(e) {
    this.props.handleChangeType(e);
  }

  render() {
    return (<>
      <header className="header">
        <Latex >{`$$\\textbf{Square matrix calculator. }\\textrm{Click one of the buttons to see the result}$$`}</Latex>
        <a
          className="link"
          href="https://github.com/polexka/matrix"
          target="_blank" rel="noreferrer"
        >
          <Latex >{`$$\\utilde\\text{Github repository}$$`}</Latex>
        </a>
      </header>
      <main>
        <div className='input-panel'>
          <div>
            <textarea
              className='textarea'
              placeholder="Enter the values of the matrix elements."
              cols={60}
              value={this.props.input}
              onChange={this.handleInputChange} />
          </div>
          <div className='selection'>
            <label>
              <input
                type="radio"
                name="type"
                value="1"
                onChange={this.handleChangeType}
                checked={this.props.type === '1' ? true : false} /> Real Numbers
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="2"
                onChange={this.handleChangeType}
                checked={this.props.type === '2' ? true : false} /> Complex Numbers
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="3"
                onChange={this.handleChangeType}
                checked={this.props.type === '3' ? true : false} /> Rational Numbers
            </label>
          </div>
          <div className='control-panel'>
            <button className='button' onClick={this.props.getCurrentMatrix}>
              Current Matrix
            </button>
            <button className='button' onClick={this.props.getTransposedMatrix}>
              Transposed Matrix
            </button>
            <button className='button' onClick={this.props.getDeterminant}>
              Determinant
            </button>
            <button className='button' onClick={this.props.getRank}>
              Rank
            </button>
          </div>
        </div>
        <hr />
        <div className='matrixs'>
          <Latex>{this.props.result}</Latex>
        </div>
      </main>
    </>
    )
  }
}

export default Interface;