import { webGLSupportsExtension } from '../helpers/featureDetection'

export const isSupported = () => {
  let supported = true
  const requiredFeatures = [
    'ANGLE_instanced_arrays',
    'OES_texture_float',
    'OES_texture_float_linear',
    'OES_texture_half_float',
    'OES_texture_half_float_linear'
  ]

  while (supported && requiredFeatures.length > 0) {
    supported = webGLSupportsExtension(requiredFeatures.shift())
  }

  return supported
}
