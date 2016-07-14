var flatten = a => Array.isArray(a) ? [].concat(...a.map(flatten)) : a;

export default flatten;