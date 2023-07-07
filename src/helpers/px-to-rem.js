/**
 * daedaluswallet.io uses `html { font-size: 62.5% }`
 * which means the base font-size = 10px
 */
const defaultPxToRemOptions = {
    rootFontSize: 10,
    separator: ' '
}

export function pxToRem(
  maybeOptions,
  ...px
) {
    const opts =
      typeof maybeOptions === 'object' ? maybeOptions : defaultPxToRemOptions

    const rootFontSize = opts.rootFontSize ?? defaultPxToRemOptions.rootFontSize
    const separator = opts.separator ?? defaultPxToRemOptions.separator

    if (typeof maybeOptions === 'number') {
        px.unshift(maybeOptions)
    }

    return px.map((val) => `${val / rootFontSize}rem`).join(separator)
}
