/**
 * Normaliza um valor de local, deixando-o no formato esperado pelo sistema,
 * dentro do possível. Isso não garante que o valor em si é válido; para checar a
 * validade, use validateLocal.
 *
 * @param local Local a ser normalizado
 */
export const sanitizeLocal = (local: string) => {
  return (local || '')
    .toUpperCase()
    .replace(/[ÁÅÃÀÂÄ]/g, 'A')
    .replace(/[ÉÊÈË]/g, 'E')
    .replace(/[ÍÎÌÏ]/g, 'I')
    .replace(/[ÓÕÒÔÖ]/g, 'O')
    .replace(/[ÚÙÛÜ]/g, 'U')
    .replace(/[Ç]/g, 'C')
    .replace(/[,\- ]/g, '_')
    .replace(/_+/g, '_')
    .replace(/[^A-Z_]/g, '');
};
