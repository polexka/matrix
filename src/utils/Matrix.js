export class Matrix {
  constructor(inputString) {
    //задаются публичные характеристики объекта класса
    this.matrix = this._getMatrix(inputString);
    this.transposedMatrix = this._transposeMatrix(this.matrix);
    this.determinant = this._getDeterminant(this.matrix);
    this.rank = this._getRank(this.matrix);
  }

  _getMatrix(inputString) {
    const matrix = [];
    const regex = /-?\d{1,}/g;
    // с помощью регулярного выражения regex из введенной строки 
    // считываются только вещественные числа и записываются в массив elements
    this._elements = inputString.match(regex);

    //размер квадратной матрицы NxN,N = size
    this._size = this._elements ?
      (Math.ceil(Math.sqrt(this._elements.length)) > 1 ?
        Math.ceil(Math.sqrt(this._elements.length)) : 1)
      : 1;

    // преобразуем все считанные элементы в двумерный массив
    for (let i = 0; i < this._size; i++) {
      matrix[i] = [];
      for (let j = 0; j < this._size; j++) {
        matrix[i][j] = this._elements ?
          (this._elements[i * this._size + j] ? this._elements[i * this._size + j] : 0)
          : 0;
        matrix[i][j] = parseInt(matrix[i][j]);
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

  // данный метод - вспомогательный для расчета детерминанта, 
  // убирает строку и столбец элемента, для которого строится минор
  // и возвращает минор для элемента с координатами el_i, el_j
  _getMinor(el_i, el_j, matrix) {
    const minorMatrix = [];
    const minorElements = [];
    const size = matrix.length;

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (i !== el_i && j !== el_j) {
          minorElements.push(matrix[i][j]);
        }
      }
    }

    for (let i = 0; i < size - 1; i++) {
      minorMatrix[i] = [];
      for (let j = 0; j < size - 1; j++) {
        minorMatrix[i][j] = minorElements ?
          (minorElements[i * (size - 1) + j] ? minorElements[i * (size - 1) + j] : 0)
          : 0;
      }
    }

    return minorMatrix;
  }


  // рекурсивно считает детерминант для матриц, где кол-во столбцов > 2
  // для матриц 2х2 по формуле
  // для матриц 1х1 принимает значение единственного элемента
  _getDeterminant(matrix) {
    let determinant = 0;

    if (matrix.length > 2) {
      for (let j = 0; j < matrix.length; j++) {
        if (j % 2 === 0) {
          determinant += matrix[0][j] * this._getDeterminant(this._getMinor(0, j, matrix));
        } else {
          determinant -= matrix[0][j] * this._getDeterminant(this._getMinor(0, j, matrix));
        }
      }
    } else if (matrix.length > 1) {
      determinant = matrix[0][0] * matrix[1][1] - matrix[1][0] * matrix[0][1];
    } else if (matrix.length === 1) {
      determinant = matrix[0][0];
    }

    return determinant;
  }

  // расчет ранга матрицы

  _getRank(matrix) {
    let rang = 0;
    let size = matrix.length;
    // для сравнения с полученным порядком миноров
    let k = 0;

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        //если элемент не нулевой,
        if (matrix[i][j]) {
          //проверяем вокруг него 4 минора
          // и для найденных запускаем поиск наибольшего минора k-порядка

          // проверка, существует ли строка выше
          if (matrix[i - 1]) {
            if (matrix[i - 1][j - 1]) {
              k = this._getMaxMinor(i - 1, i, j - 1, j);
              if (k > rang) {
                rang = k;
              }
            } else if (matrix[i - 1][j + 1]) {
              k = this._getMaxMinor(i - 1, i, j, j + 1);
              if (k > rang) {
                rang = k;
              }
            }
          }

          if (matrix[i + 1]) {
            if (matrix[i + 1][j - 1]) {
              k = this._getMaxMinor(i, i + 1, j - 1, j);
              if (k > rang) {
                rang = k;
              }
            } else if (matrix[i + 1][j + 1]) {
              k = this._getMaxMinor(i, i + 1, j, j + 1);
              if (k > rang) {
                rang = k;
              }
            }
          }

        }
      }
    }

    return rang;
  }

  _getMaxMinor(i_up, i_under, j_left, j_right) {
    const minorMatrix = [];
    const minorElements = [];
    const size = j_right - j_left + 1;
    let maxSize = size;

    // в одномерный массив помещает все элементы минора
    for (let i = i_up; i <= i_under; i++) {
      for (let j = j_left; j <= j_right; j++) {
        minorElements.push(this.matrix[i][j]);
      }
    }

    // создает двумерный массив матрицы-минора
    for (let i = 0; i < size; i++) {
      minorMatrix[i] = [];
      for (let j = 0; j < size; j++) {
        minorMatrix[i][j] = minorElements ?
          (minorElements[i * (size) + j] ? minorElements[i * (size) + j] : 0)
          : 0;
      }
    }

    // если определитель не равен 0, вычисляем дальше, иначе возвращаем 0
    if (this._getDeterminant(minorMatrix)) {
      // переменная для сравнения и выявления наибольшего порядка дочерних миноров
      let k = 0;
      // проверяем четрые угла матрицы, если можно расширить в ту сторону
      // составим новый минор размером больше
      if (this.matrix[i_up - 1]) {
        if (this.matrix[i_up - 1][j_left - 1]) {
          k = this._getMaxMinor(i_up - 1, i_under, j_left - 1, j_right);
          if (k > maxSize) {
            maxSize = k;
          }
        } else if (this.matrix[i_up - 1][j_right + 1]) {
          k = this._getMaxMinor(i_up - 1, i_under, j_left, j_right + 1);
          if (k > maxSize) {
            maxSize = k;
          }
        }
      }
      if (this.matrix[i_under + 1]) {
        if (this.matrix[i_under + 1][j_left - 1]) {
          k = this._getMaxMinor(i_up, i_under + 1, j_left - 1, j_right);
          if (k > maxSize) {
            maxSize = k;
          }
        } else if (this.matrix[i_under + 1][j_right + 1]) {
          k = this._getMaxMinor(i_up, i_under + 1, j_left, j_right + 1);
          if (k > maxSize) {
            maxSize = k;
          }
        }
      }

    } else {
      return 0;
    }
    // возвращает максимальный найденный рекурсивно порядок минора
    return maxSize;
  }

}

