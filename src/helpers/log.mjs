const log = (w, s) => {
  if (typeof window === 'undefined') {
    return
  }
  const enabled = typeof localStorage !== 'undefined'
    ? localStorage.getItem('formiga-debug')
    : false
  if (enabled !== 'true') {
    return
  }
  if (w=='form') {
    console.log(`%cFormiga Form: ${s}`, "color: orange");
  } else {
    console.log(`Formiga Input: ${s}`);
  }
}

const log_input = (inputNode, s) => {
  const value = (inputNode?.value || inputNode?.checked)?.toString() || ''
  const msg= `${inputNode.name} (t: ${inputNode.type}, #${inputNode?.id || ''}, v: ${value}) => ${s}`
  log('input', msg)
}

export {log, log_input}