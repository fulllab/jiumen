export const modeProps = {
  mode: { type: String, validator: (v) => ['body', 'label', 'stroke'].includes(v) },
};
