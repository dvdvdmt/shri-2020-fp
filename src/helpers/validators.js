import {allPass, equals, pipe, prop} from 'ramda';
import {SHAPES as Shape, COLORS as Color} from '../constants.js';

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
const isCircleWhite = pipe(getCircle, isWhite);
const isTriangleWhite = pipe(getTriangle, isWhite);
export const validateFieldN1 = allPass([isStarRed, isSquareGreen, isCircleWhite, isTriangleWhite]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = () => false;

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = () => false;

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = () => false;

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = () => false;

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = () => false;

// 7. Все фигуры оранжевые.
export const validateFieldN7 = () => false;

// 8. Не красная и не белая звезда.
export const validateFieldN8 = () => false;

// 9. Все фигуры зеленые.
export const validateFieldN9 = () => false;

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = () => false;
