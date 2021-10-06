import React from 'react';
import {
  AntDesign,
  FontAwesome5,
  FontAwesome,
  Ionicons,
  Feather,
} from '@expo/vector-icons';
import { colors } from '~/constants';

export interface Elogios {
  icon: (_color?: string) => any;
  enable: boolean;
  count: number;
  message: string;
  color: string;
}

export const getElogios = (): Elogios[] => [
  {
    count: 0,
    enable: false,
    icon: (color?: string) => (
      <AntDesign name="like1" size={24} color={color || colors.greyLight} />
    ),
    message: 'BOM',
    color: '',
  }, // 0 - BOM
  {
    count: 0,
    enable: false,
    icon: (color?: string) => (
      <FontAwesome5
        name="project-diagram"
        size={24}
        color={color || colors.greyLight}
      />
    ),
    message: 'ADAPTÁVEL',
    color: '',
  }, // 1 - ADAPTAVEL
  {
    count: 0,
    enable: false,
    icon: (color?: string) => (
      <AntDesign name="smileo" size={24} color={color || colors.greyLight} />
    ),
    message: 'CARISMÁTICO',

    color: '',
  }, // 2 - CARISMATICO
  {
    count: 0,
    enable: false,
    icon: (color?: string) => (
      <FontAwesome name="trophy" size={24} color={color || colors.greyLight} />
    ),
    message: 'COMPETENTE',

    color: '',
  }, // 3 - COMPETENTE
  {
    count: 0,
    enable: false,
    icon: (color?: string) => (
      <FontAwesome name="users" size={24} color={color || colors.greyLight} />
    ),
    message: 'COPERATIVO',

    color: '',
  }, // 4 - COPERATIVO
  {
    count: 0,
    enable: false,
    icon: (color?: string) => (
      <FontAwesome name="gears" size={28} color={color || colors.greyLight} />
    ),
    message: 'CRIATIVO',

    color: '',
  }, // 5 - CRIATIVO
  {
    count: 0,
    enable: false,
    icon: (color?: string) => (
      <Ionicons name="bar-chart" size={24} color={color || colors.greyLight} />
    ),
    message: 'EFICIENTE',

    color: '',
  }, // 6 - EFICIENTE
  {
    count: 0,
    enable: false,
    icon: (color?: string) => (
      <Ionicons
        name="heart-circle"
        size={30}
        color={color || colors.greyLight}
      />
    ),
    message: 'EXCELENTE',

    color: '',
  }, // 7 - EXCELENTE
  {
    count: 0,
    enable: false,
    icon: (color?: string) => (
      <FontAwesome name="th" size={24} color={color || colors.greyLight} />
    ),
    message: 'ORGANIZADO',

    color: '',
  }, // 8 - ORGANIZADO
  {
    count: 0,
    enable: false,
    icon: (color?: string) => (
      <FontAwesome
        name="hourglass-3"
        size={24}
        color={color || colors.greyLight}
      />
    ),
    message: 'RÁPIDO',

    color: '',
  }, // 9 - RAPIDO
  {
    count: 0,
    enable: false,
    icon: (color?: string) => (
      <Feather
        name="alert-triangle"
        size={24}
        color={color || colors.greyLight}
      />
    ),
    message: 'ZELOSO',

    color: '',
  }, // 10 - ZELOSO
  {
    icon: (color?: string) => (
      <FontAwesome5
        name="grin-tears"
        size={24}
        color={color || colors.greyLight}
      />
    ),
    enable: false,
    count: 0,
    message: 'QUERIDO',
    color: '',
  }, // 11 - QUERIDO
  {
    color: '',
    count: 0,
    enable: false,
    icon: (color?: string) => (
      <FontAwesome name="star" size={24} color={color || colors.greyLight} />
    ),
    message: 'OTIMO',
  }, // 12 - OTIMO
];

export const BOM = 0;
export const ADAPTAVEL = 1;
export const CARISMATICO = 2;
export const COMPETENTE = 3;
export const COPERATIVO = 4;
export const CRIATIVO = 5;
export const EFICIENTE = 6;
export const EXCELENTE = 7;
export const ORGANIZADO = 8;
export const RAPIDO = 9;
export const ZELOSO = 10;
export const QUERIDO = 11;
export const OTIMO = 12;
export const INCRIVEL = 13;
