export function addEventListener(target, type, listener) {

    function _listener(event) {
        const shouldContinue = listener(event)
        if (!shouldContinue) {
            target.removeEventListener(type, _listener)
        }
    }

    target.addEventListener(type, _listener)
}