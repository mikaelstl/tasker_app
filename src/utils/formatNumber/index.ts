export const formatNumber = (value: number, digits?: number) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumIntegerDigits: digits ?? 2,
    useGrouping: false,
  }).format(value);
}