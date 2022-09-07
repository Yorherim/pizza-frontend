import { nanoid } from '@reduxjs/toolkit';

type IdsType = Record<string, string>;

/**
 * функция для генерации ids для компонента Pizza
 *
 * ключ - это строковое значение size + width
 *
 * значение - уникальный id, сгенерированный nanoid
 * @param {number[]} widths - толщина пиццы
 * @param {number[]} sizes - размер пиццы
 * @example
 * // returns { 250: "9xjCDv8_7lfhQ4bi1CzQw", 251: "bbGQYNp0lUGXh4XafebSz", 300: "veFtboCeRUxYG_vRdCxcp", 301: "WcutRreZxAotyQ34kSYC_" }
 * generateIdsForPizza([0, 1], [25, 30]);
 * @returns {IdsType} объект
 */
export const generateIdsForPizza = (widths: number[], sizes: number[]): IdsType => {
	const ids: IdsType = {};
	for (let i = 0; i < widths.length; i++) {
		for (let j = 0; j < sizes.length; j++) {
			const widthsNumber = widths[i];
			const sizesNumber = sizes[j];
			const key = sizesNumber.toString() + widthsNumber.toString();
			ids[key] = nanoid();
		}
	}
	return ids;
};
