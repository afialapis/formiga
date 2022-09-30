const LOG_ENABLED= false

const log = (w, s) => {
  if (! LOG_ENABLED) {
    return
  }
  if (w=='form') {
    console.log(`%cFormiga Form: ${s}`, "color: orange");
  } else {
    console.log(`Formiga Input: ${s}`);
  }
}

export {log}