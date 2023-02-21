import React, { useState, useEffect } from 'react'

function App() {

  const [input, setInput] = useState('');

  function handleChange(e) {
    setInput(e.target.value);
  }

  // возвращает из введенного текста матрицу
  function drawMatrix(input) {
    const regex = /-?\d{1,}/g;
    let matrix = input.match(regex);
    const size = matrix ? (Math.ceil(Math.sqrt(matrix.length)) > 2 ? Math.ceil(Math.sqrt(matrix.length)) : 2) : 2;

    let arrMatrix = [];

    for (let i = 0; i < size; i++) {
      arrMatrix[i] = [];
      for (let j = 0; j < size; j++) {
        arrMatrix[i][j] = matrix ? (matrix[i * size + j] ? matrix[i * size + j] : 0) : 0;
        arrMatrix[i][j] = parseInt(arrMatrix[i][j]);
      }
    }

    if (size > 2) {
      getNewMatrix(1,0, arrMatrix);
    }

    return arrMatrix;
  }

  function transposeMatrix(matrix) {
    const newMatrix = [];
    const size = matrix.length;
    
    for (let i = 0; i < size; i++) {
      newMatrix[i] = [];
      for (let j = 0; j < size; j++) {
        newMatrix[i][j] = matrix[j][i]
      }
    }

    return newMatrix;
  }

  function getNewMatrix(el_i, el_j, matrix) {
    const arrMatrix = [];
    let newMatrix = [];
    const size = matrix.length;

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (i !== el_i && j !== el_j) {
          arrMatrix.push(matrix[i][j]);
        }
      }
    }

    for (let i = 0; i < size-1; i++) {
      newMatrix[i] = [];
      for (let j = 0; j < size-1; j++) {
        newMatrix[i][j] = arrMatrix ? (arrMatrix[i * (size-1) + j] ? arrMatrix[i * (size-1) + j] : 0) : 0;
        newMatrix[i][j] = parseInt(newMatrix[i][j]);
      }
    }

    return newMatrix;
  }

  function determinant(matrix) {
    let dtm = 0;
    if (matrix.length > 2) {
      for (let j = 0; j < matrix.length; j++) {
        if (j % 2 === 0) {
          dtm += matrix[0][j] * determinant(getNewMatrix(0,j,matrix));
        } else {
          dtm -= matrix[0][j] * determinant(getNewMatrix(0,j,matrix));
        }
        
      }
    } else {
      dtm = matrix[0][0] * matrix[1][1] - matrix[1][0] * matrix[0][1];
    }
    return dtm;
  }

  useEffect(() => {
    drawMatrix(input);
  }, [input])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Application for given calculations over a square matrix.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          GH repo
        </a>
      </header>
      <main>
        <textarea
          placeholder="Введите значения ячеек матрицы через любой разделяющий знак"
          cols={60}
          value={input || ''}
          onChange={handleChange} />

        <div className='matrix-draw'>
          <p>Введенная матрица:</p>
          {drawMatrix(input).map((i) => {
            return (<p>{i.map((j) => (j + ` `))}</p>);
          })}
        </div>
        <div>
          <p>Определитель матрицы: {determinant(drawMatrix(input))}</p>
        </div>
        <div className='matrix-draw'>
          <p>Транспонированная матрица:</p>
          {transposeMatrix(drawMatrix(input)).map((i) => {
            return (<p>{i.map((j) => (j + ` `))}</p>);
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
