//Do not convert it to ES6 module as it will break inline runs of tests
const Adapter = require('enzyme-adapter-react-16');
const enzyme = require('enzyme');

window.HTMLElement.prototype.scrollIntoView = () => ({});

enzyme.configure({ adapter: new Adapter() });
