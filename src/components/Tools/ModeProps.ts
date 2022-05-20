export const modeProps = {
  mode: { type: String, validator: (v) => ['body', 'text', 'stroke'].includes(v) },
};
