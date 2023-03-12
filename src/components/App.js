import React, { useState, useEffect} from 'react'
import { Matrix } from './Matrix';
import { defaultMatrix } from '../utils/constants';
import Interface from './Interface';

function App() {

  const [input, setInput] = useState('');
  const [matrix, setMatrix] = useState(new Matrix(defaultMatrix));
  const [type, setType] = useState('1');
  const [result, setResult] = useState(`$$\\textrm{Click one of the buttons to see the result}$$`);

  useEffect(() => {
    setMatrix(new Matrix(input));
  }, [input])

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  function handleSetType(e) {
    setType(e.target.value);
  }

  function updateMatrix() {
    setMatrix(new Matrix(input));
  }

  function getCurrentMatrix() {
    updateMatrix();
    if (type === '1') {
      setResult(`$$\\textrm{Your matrix:}${renderLatexMatrix(matrix.matrix)}$$`);
    }
  }

  function getTransposedMatrix() {
    updateMatrix();
    if (type === '1') {
      setResult(`$$\\textrm{Transposed matrix:}${renderLatexMatrix(matrix.transposedMatrix)}$$`);
    }
  }

  function getDeterminant() {
    updateMatrix();
    if (type === '1') {
      setResult(`$$\\textrm{Determinant: }${matrix.determinant}$$`);
    }
  }

  function getRank() {
    updateMatrix();
    if (type === '1') {
      setResult(`$$\\textrm{Rank: }${matrix.rank}$$`);
    }
  }

  const renderLatexMatrix = (matrix) => {
    return (
      "\\begin{pmatrix}\n" +
      matrix
        .map((row, index) => {
          if (index === matrix.length) return row.join(" & ") + "\n"
          else return row.join(" & ") + "\\\\\n"
        })
        .join("") +
      "\\end{pmatrix}"
    )
  }

  return (
    <div className="page">
        <Interface
          input={input}
          handleInputChange={handleInputChange}
          type={type}
          handleChangeType={handleSetType}
          
          getCurrentMatrix={getCurrentMatrix}
          getTransposedMatrix={getTransposedMatrix}
          getDeterminant={getDeterminant}
          getRank={getRank}
          
          result={result} />
    </div>
  );
}

export default App;
