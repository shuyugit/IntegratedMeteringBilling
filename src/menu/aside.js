// 菜单 侧边栏
export default [
  {
    title: '档案管理',
    icon: 'envelope-o',
    children: [
      {
        title: '电网档案',
        icon: '',
        children: [
          { path: '/electricFileManagement', icon: '', title: '电网档案管理' },
        ]
      },
      {
        title: '主站档案',
        icon: '',
        children: [
          { path: '/deviceManagement', icon: '', title: '主站设备管理' },
          { path: '/AcquisitionChannel', icon: '', title: '采集通道管理', },
          { path: '/HostGrouping', icon: '', title: '采集主机分组' },
          { path: '/TimedTasks', icon: '', title: '定时任务配置' },
        ]
      },
    ]
  },
  {
    title: '运行管理',
    icon: 'envelope-o',
    children: []
  }

]
