let LOG_ENABLED= false

// try {
//   if (process.env.NODE_ENV !== "production") {
//     LOG_ENABLED= true
//   }
// } catch(_){}

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

const log_input = (inputNode, s) => {
  // const value = (inputNode?.value || inputNode?.checked)?.toString() || ''
  // const msg= `${inputNode.name} (t: ${inputNode.type}, #${inputNode?.id || ''}, v: ${value}) => ${s}`
  // log('input', msg)
}

export {log, log_input}