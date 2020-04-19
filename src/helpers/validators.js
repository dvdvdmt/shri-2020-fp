import {
  __,
  all,
  allPass,
  any,
  anyPass,
  countBy,
  equals,
  filter,
  gte,
  identity,
  keys,
  length, not,
  omit,
  pipe,
  prop,
  propEq,
  tap,
  values,
} from 'ramda';
import {COLORS as Color, SHAPES as Shape} from '../constants.js';

/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

// utils
const log = (message = 'log') => tap((value) => console.log(message, value));

// prop getters
const getStar = prop(Shape.STAR);
const getSquare = prop(Shape.SQUARE);
const getCircle = prop(Shape.CIRCLE);
const getTriangle = prop(Shape.TRIANGLE);

// color predicates
const isRed = equals(Color.RED);
const isGreen = equals(Color.GREEN);
const isOrange = equals(Color.ORANGE);
const isBlue = equals(Color.BLUE);
const isWhite = equals(Color.WHITE);

// 1. Красная звезда, зеленый квадрат, все остальные белые.
const isStarRed = pipe(getStar, isRed);
const isSquareGreen = pipe(getSquare, isGreen);
const isOtherWhite = pipe(omit([Shape.STAR, Shape.SQUARE]), values, all(isWhite));
export const validateFieldN1 = allPass([isStarRed, isSquareGreen, isOtherWhite]);

// 2. Как минимум две фигуры зеленые.
const isEqualOrGreaterThanTwo = gte(__, 2);
const isTwoGreen = pipe(values, filter(isGreen), length, isEqualOrGreaterThanTwo);
export const validateFieldN2 = isTwoGreen;

// 3. Количество красных фигур равно кол-ву синих.
const isRedCountEqualBlue = ({red, blue}) => (red === blue);
const countColors = pipe(values, countBy(identity));
export const validateFieldN3 = pipe(countColors, isRedCountEqualBlue);

// 4. Синий круг, красная звезда, оранжевый квадрат
const isCircleBlue = propEq(Shape.CIRCLE, Color.BLUE);
const isSquareOrange = propEq(Shape.SQUARE, Color.ORANGE);
export const validateFieldN4 = allPass([isCircleBlue, isStarRed, isSquareOrange]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
const getWhite = prop(Color.WHITE);
const lessOrEqualThanOne = anyPass([gte(1), equals(undefined)]);
const countOfWhiteShapesLessOrEqualToOne = pipe(getWhite, lessOrEqualThanOne);
const atLeastThreeShapesOfSameColor = pipe(omit([Color.WHITE]), values, log('values'), any(gte(__, 3)));
export const validateFieldN5 = pipe(countColors, allPass([countOfWhiteShapesLessOrEqualToOne, atLeastThreeShapesOfSameColor]));

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
const isTriangleGreen = propEq(Shape.TRIANGLE, Color.GREEN);
const twoShapesAreGreen = propEq(Color.GREEN, 2);
const oneShapeIsRed = propEq(Color.RED, 1);
const twoShapesAreGreenAndOneRed = pipe(countColors, allPass([twoShapesAreGreen, oneShapeIsRed]))
export const validateFieldN6 = allPass([isTriangleGreen, twoShapesAreGreenAndOneRed]);

// 7. Все фигуры оранжевые.
const allShapesOfOneColor = pipe(keys, length, equals(1));
const getOrange = prop(Color.ORANGE);
const allShapesAreOrange = pipe(countColors, allPass([allShapesOfOneColor, getOrange]))
export const validateFieldN7 = allShapesAreOrange;

// 8. Не красная и не белая звезда.
const colorIsNotRedNorWhite = pipe(anyPass([isRed, isWhite]), not);
const starIsNotRedNorWhite = pipe(getStar, colorIsNotRedNorWhite);
export const validateFieldN8 = starIsNotRedNorWhite;

// 9. Все фигуры зеленые.
const getGreen = prop(Color.GREEN);
const allShapesAreGreen = pipe(countColors, allPass([allShapesOfOneColor, getGreen]))
export const validateFieldN9 = allShapesAreGreen;

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = () => false;
