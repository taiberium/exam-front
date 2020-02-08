import {isNumber} from "lodash/lang";
import {round} from "lodash/math";
import React from "react";

const numberLocale = 'ru';

const formatNumber = (number, precision) =>
    isNumber(number)
        ? round(number, precision).toLocaleString(numberLocale, {minimumFractionDigits: precision})
        : null;

const percentFormatRenderer = value =>
    value !== null ? `%${value}` : '';

export const precisionPercentRenderer = (value, precision = 2) =>
    isNumber(value) ? percentFormatRenderer(formatNumber(value * 100, precision)) : '';

export const ratioFormatter = (value, precision = 2) =>
    isNumber(value) ? formatNumber(value, precision) : '';