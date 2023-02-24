export class Matrix {
  constructor(inputString) {
    //задаются публичные характеристики объекта класса
    this.matrix = this._getMatrix(inputString);
    this.transposedMatrix = this._transposeMatrix(this.matrix);
    this.determinant = this._getDeterminant(this.matrix);
    this.gaussMatrix = this.matrix.map(row => [...row]);
    this.rank = this._getRank(this.gaussMatrix);
  }

  _getMatrix(str) {
    const regex = /-?\d+(\.\d+)?/g;
    // считываем вещественные числа из строки и записываем в массив
    const elements = str ? str.match(regex) : [];
    // вычисляем размер квадратной матрицы
    const size = elements ? Math.ceil(Math.sqrt(elements.length)) : 1;
    const matrix = [];

    for (let i = 0; i < size; i++) {
      matrix[i] = [];
      for (let j = 0; j < size; j++) {
        if (elements && i * size + j < elements.length) {
          matrix[i][j] = parseFloat(elements[i * size + j]);
        } else {
          matrix[i][j] = 0;
        }
      }
    }

    return matrix;
  }

  _transposeMatrix(matrix) {
    const transposed = [];

    for (let i = 0; i < matrix.length; i++) {
      transposed[i] = [];
      for (let j = 0; j < matrix.length; j++) {
        transposed[i][j] = matrix[j][i];
      }
    }

    return transposed;
  }

  _getRank(matrix) {
    const size = matrix.length;
    const eps = 1e-10; // погрешность

    let rank = 0;

    for (let i = 0; i < size; i++) {
      // Ищем максимальный элемент в столбце i
      let maxEl = Math.abs(matrix[i][i]);
      let maxRow = i;
      for (let j = i + 1; j < size; j++) {
        if (Math.abs(matrix[j][i]) > maxEl) {
          maxEl = Math.abs(matrix[j][i]);
          maxRow = j;
        }
      }

      // Если максимальный элемент равен нулю, то текущий столбец нулевой
      if (Math.abs(maxEl) < eps) {
        continue;
      }

      // Обменяем максимальную строку со строкой i
      for (let k = i; k < size; k++) {
        const tmp = matrix[maxRow][k];
        matrix[maxRow][k] = matrix[i][k];
        matrix[i][k] = tmp;
      }

      // Делим строку i на matrix[i][i]
      const divisor = matrix[i][i];
      for (let k = i; k < size; k++) {
        matrix[i][k] /= divisor;
      }

      // Вычитаем i-ую строку из всех нижерасположенных строк
      for (let j = i + 1; j < size; j++) {
        const factor = matrix[j][i];
        for (let k = i; k < size; k++) {
          matrix[j][k] -= factor * matrix[i][k];
        }
      }

      rank++;
    }

    return rank;
  }

  _getDeterminant(matrix) {
    const size = matrix.length;

    if (size === 1) {
      return matrix[0][0];
    }

    if (size === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    let determinant = 0;
    // рекурсивно вычисляем определитель
    for (let j = 0; j < size; j++) {
      const minor = [];
      for (let i = 1; i < size; i++) {
        minor.push(matrix[i].slice(0, j).concat(matrix[i].slice(j + 1)));
      }
      determinant += matrix[0][j] * Math.pow(-1, j) * this._getDeterminant(minor);
    }

    return determinant;
  }

}

