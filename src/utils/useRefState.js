import { useRef, useState } from 'react'

export function useRefState(initialValue) {
  const [_state, _setState] = useState(initialValue)
  const ref = useRef(_state)

  function setState(value) {
    ref.current = value
    _setState(value)
  }

  function getState() {
    return ref.current
  }

  return [getState, setState]
}
