export default (params) => {
  const cache = {
    args: null,
    result: null,
  };

  return function(...fnArgs) {
    const args = params.getArgs(...fnArgs);

    let shouldExecute = false;
    if (cache.args === null) {
      shouldExecute = true;
    } else if (args.length !== cache.args.length) {
      shouldExecute = true;
    } else {
      var idx = 0;
      while (idx < args.length) {
        if (args[idx] !== cache.args[idx]) {
          shouldExecute = true;
          break;
        }
        idx += 1;
      }
    }

    if (shouldExecute) {
      cache.args = args;
      cache.result = params.fn(...args);
    }

    return cache.result;
  }
}
