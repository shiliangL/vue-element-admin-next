/*
 * @Author: shiliangL
 * @Date: 2021-07-29 08:18:38
 * @LastEditTime: 2021-12-27 16:26:10
 * @LastEditors: Do not edit
 * @Description:
 */
/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '权限管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: '菜单配置',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: '用户管理',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  {
    path: '/internet',
    component: Layout,
    alwaysShow: true, // will always show the root menu
    redirect: 'noRedirect',
    name: 'Internet',
    meta: {
      title: '智慧运营',
      icon: 'chart'
    },
    children: [
      {
        path: 'devicemh',
        component: () => import('@/views/internet/devicemh'),
        name: 'evicemh',
        meta: { title: '设备管理', noCache: false }
      },
      {
        path: 'unionmh',
        component: () => import('@/views/internet/unionmh'),
        name: 'Unionmh',
        meta: { title: '物联管理', noCache: false }
      },
      {
        path: 'safetymh',
        component: () => import('@/views/internet/safetymh'),
        name: 'Safetymh',
        meta: { title: '安全管理', noCache: false }
      },
      {
        path: 'peoplemh',
        component: () => import('@/views/internet/peoplemh'),
        name: 'Peoplemh',
        meta: { title: '人员管理', noCache: false }
      }
    ]
  },
  {
    path: '/innovativeServices',
    component: Layout,
    alwaysShow: true, // will always show the root menu
    redirect: 'noRedirect',
    name: 'InnovativeServices',
    meta: {
      title: '双创服务',
      icon: 'chart'
    },
    children: [
      {
        path: 'productServices',
        component: () => import('@/views/innovativeServices/productServices'),
        name: 'ProductServices',
        meta: { title: '产业服务', noCache: false }
      },
      {
        path: 'trainingServices',
        component: () => import('@/views/innovativeServices/trainingServices'),
        name: 'TrainingServices',
        meta: { title: '培训赋能', noCache: false }
      },
      {
        path: 'supportServices',
        component: () => import('@/views/innovativeServices/supportServices'),
        name: 'SupportServices',
        meta: { title: '赋能支撑', noCache: false }
      }
    ]
  },
  {
    path: '/ecologicalResources',
    component: Layout,
    alwaysShow: true, // will always show the root menu
    redirect: 'noRedirect',
    name: 'EcologicalTogether',
    meta: {
      title: '生态汇聚',
      icon: 'chart'
    },
    children: [
      {
        path: 'partners',
        component: () => import('@/views/ecologicalResources/partners'),
        name: 'Partners',
        meta: { title: '合作伙伴', noCache: false }
      },
      {
        path: 'solution',
        component: () => import('@/views/ecologicalResources/solution'),
        name: 'Solution',
        meta: { title: '解决方案', noCache: false }
      }
    ]
  },
  {
    path: '/digitalIndustry',
    component: Layout,
    alwaysShow: true, // will always show the root menu
    redirect: 'noRedirect',
    name: 'DigitalIndustry',
    meta: {
      title: '数字产业',
      icon: 'chart'
    },
    children: [
      {
        path: 'extensionService',
        component: () => import('@/views/digitalIndustry/extensionService'),
        name: 'ExtensionService',
        meta: { title: '5G推广服务', noCache: false }
      }
    ]
  }
]

export default chartsRouter