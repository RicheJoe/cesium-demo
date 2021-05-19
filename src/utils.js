import * as cesium from 'cesium';
//地图左侧位置标记   鼠标位置所在经纬度
export function leftLocationNum(viewer, clickEvent, el) {
  //拾取笛卡尔坐标
  let ellipsoid = viewer.scene.globe.ellipsoid; //全局椭球体
  let cartesian = viewer.scene.camera.pickEllipsoid(clickEvent.endPosition, ellipsoid); //拾取鼠标在椭圆上的结束点笛卡尔坐标点
  //转化笛卡尔坐标 为经纬度
  if (cartesian) {
    let cartographic = ellipsoid.cartesianToCartographic(cartesian); //笛卡尔坐标转制图坐标
    let coordinate =
      '经度:' +
      cesium.Math.toDegrees(cartographic.longitude).toFixed(2) +
      ',纬度:' +
      cesium.Math.toDegrees(cartographic.latitude).toFixed(2) +
      '相机高度:' +
      window.Math.ceil(viewer.camera.positionCartographic.height);
    el.innerHTML = coordinate;
    el.style.display = 'block';
  } else {
    el.style.display = 'none';
  }
}
//点击获取经纬度坐标
export function leftClick(viewer, clickEvent) {
  let earthPosition = viewer.camera.pickEllipsoid(clickEvent.position, viewer.scene.globe.ellipsoid);
  let cartographic = cesium.Cartographic.fromCartesian(earthPosition, viewer.scene.globe.ellipsoid, new cesium.Cartographic());
  let lng = cesium.Math.toDegrees(cartographic.longitude);
  let lat = cesium.Math.toDegrees(cartographic.latitude);
  return { lng, lat };
}
//根据坐标标点
export function drawPoint(viewer, { lng, lat }) {
  let locationLL = new cesium.Entity({
    position: cesium.Cartesian3.fromDegrees(lng, lat, 10000),
    point: {
      // 点的大小（像素）
      pixelSize: 5,
      // 点位颜色，fromCssColorString 可以直接使用CSS颜色
      position: cesium.Cartesian3.fromDegrees(lng, lat, 10000),
      color: cesium.Color.fromCssColorString('#ee0000'),
      // 边框颜色
      outlineColor: cesium.Color.fromCssColorString('#fff'),
      // 边框宽度(像素)
      outlineWidth: 2,
      // 是否显示
      show: true,
    },
  });
  viewer.entities.add(locationLL);
}
