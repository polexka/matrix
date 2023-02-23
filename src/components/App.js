import React, { useState, useEffect } from 'react'
import { Matrix } from '../utils/Matrix';
import Latex from 'react-latex';

function App() {

  const [input, setInput] = useState('');
  const [matrix, setMatrix] = useState(new Matrix(input));

  function handleChange(e) {
    setInput(e.target.value);
  }

  // при вводе обновляет значение matrix
  useEffect(() => {
    setMatrix(new Matrix(input));
  }, [input])

  // генерирует LaTex - строку для отображения матрицы
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
      <header className="header">
        <Latex>{`$$\\hearts$$`}</Latex>
        <Latex >{`$$\\textbf{Application for given calculations over a square matrix.}$$`}</Latex>
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
          <textarea
            className='textarea'
            placeholder="Enter the values of the matrix elements."
            cols={60}
            value={input}
            onChange={handleChange} />
        </div>
        <div className='results'>
          <div className='matrixs'>
            <div className='matrix'>
              <Latex>{`$$\\textrm{Your matrix:}$$`}</Latex>
              <Latex>{`$$${renderLatexMatrix(matrix.matrix)}$$`}</Latex>
            </div>
            <div className='matrix'>
              <Latex>{`$$\\textrm{Transposed matrix:}$$`}</Latex>
              <Latex>{`$$${renderLatexMatrix(matrix.transposedMatrix)}$$`}</Latex>
            </div>
          </div>
          <div className='res'>
            <Latex>{`$$\\textrm{Determinant: }${matrix.determinant}$$`}</Latex>
            <Latex>{`$$\\textrm{Rank: }${matrix.rank}$$`}</Latex>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
