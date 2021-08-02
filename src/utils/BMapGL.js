/*
 * @Author: shiliangL
 * @Date: 2021-08-02 09:48:05
 * @LastEditTime: 2021-08-02 10:12:27
 * @LastEditors: Do not edit
 * @Description:
 */
import { darkStyle } from '@/utils/mapStyle'

export function initBMapGLMap(params = {}) {
  const options = Object.assign({
    container: 'containerId',
    tilt: 60,
    heading: 0
  }, params)
  const map = new BMapGL.Map(options.container, {
    restrictCenter: false,
    style: { styleJson: options.mapStyle || darkStyle }
  })

  map.enableKeyboard()
  map.enableScrollWheelZoom()
  map.enableInertialDragging()
  map.enableContinuousZoom()

  map.setDisplayOptions(options.displayOptions || {
    indoor: false,
    poi: true,
    skyColors: options.skyColors || [
      'rgba(5, 5, 30, 0.01)',
      'rgba(5, 5, 30, 1.0)'
    ]
  })
  if (options.center && options.zoom) {
    map.centerAndZoom(new BMapGL.Point(options.center[0], options.center[1]), options.zoom)
  }
  map.setTilt(options.tilt)
  map.setHeading(options.heading)
  return map
}

