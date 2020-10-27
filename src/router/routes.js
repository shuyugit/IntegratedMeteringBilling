import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: _import('system/index')
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      },
      //新奥项目页面
      {
        path: 'deviceManagement',
        name: 'deviceManagement',
        meta: {
          title: '主站设备管理',
          auth: true
        },
        component: _import('Metering/fileManagement/MasterStationFile/deviceManagement')
      },
      //采集通道管理
      {
        path: 'AcquisitionChannel',
        name: 'AcquisitionChannel',
        meta: {
          title: '采集通道管理',
          auth: true
        },
        component: _import('Metering/fileManagement/MasterStationFile/AcquisitionChannel')
      },
      {
        path: 'HostGrouping',
        name: 'HostGrouping',
        meta: {
          title: '采集主机分组',
          auth: true
        },
        component: _import('Metering/fileManagement/MasterStationFile/HostGrouping')
      },
      {
        path: 'TimedTasks',
        name: 'TimedTasks',
        meta: {
          title: '定时任务配置',
          auth: true
        },
        component: _import('Metering/fileManagement/MasterStationFile/TimedTasks')
      },
      //资产统计
      {
        path: 'dataCheck',
        name: 'dataCheck',
        meta: {
          title: '定时任务配置',
          auth: true
        },
        component: _import('Metering/fileManagement/AssetStatistics/dataCheck')
      },
      {
        path: 'EquipmentStatistics',
        name: 'EquipmentStatistics',
        meta: {
          title: '终端设备统计',
          auth: true
        },
        component: _import('Metering/fileManagement/AssetStatistics/EquipmentStatistics')
      },
      {
        path: 'MeterStatistics',
        name: 'MeterStatistics',
        meta: {
          title: '表计设备统计',
          auth: true
        },
        component: _import('Metering/fileManagement/AssetStatistics/MeterStatistics')
      },
      {
        path: 'simCard',
        name: 'simCard',
        meta: {
          title: 'Sim卡档案统计',
          auth: true
        },
        component: _import('Metering/fileManagement/AssetStatistics/simCard')
      },
      {
        path: 'SystemSize',
        name: 'SystemSize',
        meta: {
          title: '系统规模查询',
          auth: true
        },
        component: _import('Metering/fileManagement/AssetStatistics/SystemSize')
      },
      //电网档案
      {
        path: 'FileRationalityCheck',
        name: 'FileRationalityCheck',
        meta: {
          title: '档案合理性检查',
          auth: true
        },
        component: _import('Metering/fileManagement/electricArchives/FileRationalityCheck')
      },
      {
        path: 'electricFileManagement',
        name: 'electricFileManagement',
        meta: {
          title: '电网档案管理',
          auth: true
        },
        component: _import('Metering/fileManagement/electricArchives/electricFileManagement')
      },
      {
        path: 'modelManagement',
        name: 'modelManagement',
        meta: {
          title: '汇总模型管理',
          auth: true
        },
        component: _import('Metering/fileManagement/electricArchives/modelManagement')
      },
      {
        path: 'LineLossModel',
        name: 'LineLossModel',
        meta: {
          title: '线损模型管理',
          auth: true
        },
        component: _import('Metering/fileManagement/electricArchives/LineLossModel')
      },
      {
        path: 'sectorManagement',
        name: 'sectorManagement',
        meta: {
          title: '抄表区段管理',
          auth: true
        },
        component: _import('Metering/fileManagement/electricArchives/sectorManagement')
      },

    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
