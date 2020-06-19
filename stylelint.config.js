const capitalizeFirstLetter = str => str.replace(/^[a-z]/, c => c.toUpperCase());

const customBemSelector = fileName => {
  const kebabCase = '[a-z][a-zA-Z-]*';

  const block = capitalizeFirstLetter(fileName);
  const element = `(?:__${kebabCase})?`;
  const modifier = `(?:_${kebabCase})?`;
  return new RegExp(`^(?:\\.${block})${element}${modifier}(?<!-)$`);
};

module.exports = {
  plugins: ['stylelint-selector-bem-pattern'],
  rules: {
    'plugin/selector-bem-pattern': {
      // Derive component names from the file name
      implicitComponents: true,
      // Use the default BEM preset
      preset: 'bem',
      // Configures the valid selectors
      componentSelectors: {
        initial: customBemSelector
      }
    }
  }
};
