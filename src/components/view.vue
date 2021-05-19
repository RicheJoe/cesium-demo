<template>
  <div class="main">
    <div id="cesiumContainer"></div>
    <span id="mes"></span>
  </div>
</template>

<script>
import { Ion, Viewer, CesiumTerrainProvider, IonResource, IonImageryProvider, Cartesian3, ScreenSpaceEventHandler, ScreenSpaceEventType } from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import { leftClick, drawPoint, leftLocationNum } from '../utils';
export default {
  mounted() {
    window.CESIUM_BASE_URL = '/';
    Ion.defaultAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjYzVjMmE0My1lOWI5LTQ0YTItOGI4ZC1iYWQ5MDU3Njk5NjgiLCJpZCI6NTYzMzIsImlhdCI6MTYyMTQwNjA4M30.y8vX5RIOzjySq7Nq0wNMrF5zSvtYUlcnaqza5XRRKRc';
    //新建带地形的球体
    let viewer = new Viewer('cesiumContainer', {
      terrainProvider: new CesiumTerrainProvider({
        url: IonResource.fromAssetId(1),
      }),
      //默认都是true
      homeButton: false,
      fullscreenButton: false,
      //   infoBox: false,
      //   baseLayerPicker: false,
      //   geocoder: false,   //搜索跳转
      // navigationHelpButton: false,  //帮助 ？
      timeline: false,
      animation: true,
    });
    //地图文字标记    2无标记 3文字标记 4 道路标记
    let layer = viewer.imageryLayers.addImageryProvider(new IonImageryProvider({ assetId: 3 }));
    layer;
    //3D 建筑标记  太卡
    // let tileset = viewer.scene.primitives.add(
    //   new Cesium3DTileset({
    //     url: IonResource.fromAssetId(96188),
    //   })
    // );
    // viewer.zoomTo(tileset);
    //设置太阳效果.背面为黑
    viewer.scene.globe.enableLighting = true;
    viewer.scene.skyBox.show = true; //背景  星空
    viewer.scene.debugShowFramesPerSecond = true; //fps

    //新增点标记  北京
    //116.397128, 39.916527 北京经纬
    // let locationBeiJing = new Entity({
    //   // fromDegrees（经度，纬度，高度，椭球，结果）从以度为单位的经度和纬度值返回Cartesian3位置
    //   position: Cartesian3.fromDegrees(116.397128, 39.916527, 10000),
    //   point: {
    //     // 点的大小（像素）
    //     pixelSize: 5,
    //     // 点位颜色，fromCssColorString 可以直接使用CSS颜色
    //     color: Color.fromCssColorString('#ee0000'),
    //     // 边框颜色
    //     outlineColor: Color.fromCssColorString('#fff'),
    //     // 边框宽度(像素)
    //     outlineWidth: 2,
    //     // 是否显示
    //     show: true,
    //   },
    // });
    // viewer.entities.add(locationBeiJing);
    //点标记结束
    drawPoint(viewer, { lng: 116.397128, lat: 39.916527 });

    //定位到北京
    // viewer.flyTo(locationBeiJing, {
    //   offset: {
    //     heading: Math.toRadians(0.0),
    //     pitch: Math.toRadians(-90),
    //     range: 10000,
    //   },
    // });
    viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(116.397128, 39.916527, 10000000),
    });

    //====================================点击事件===============
    //1、左键单击事件
    //鼠标事件
    let handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
    // handler.setInputAction((e) => {
    //   console.log('左键单击事件：', e);
    // }, ScreenSpaceEventType.LEFT_CLICK);
    handler.setInputAction((movement) => {
      let mesDom = document.getElementById('mes');
      leftLocationNum(viewer, movement, mesDom);
    }, ScreenSpaceEventType.MOUSE_MOVE); //监听的是鼠标移动事件

    handler.setInputAction((dbClick) => {
      let point = leftClick(viewer, dbClick);
      drawPoint(viewer, point);
      viewer.camera.flyTo({
        destination: Cartesian3.fromDegrees(point.lng, point.lat, 100000),
      });
    }, ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  },
};
</script>

<style lang="scss" scoped>
.main,
#cesiumContainer {
  height: 100%;
}

#mes {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2;
  color: white;
}
/* 去版权信息 */
:deep(.cesium-viewer-bottom) {
  display: none;
}
</style>
