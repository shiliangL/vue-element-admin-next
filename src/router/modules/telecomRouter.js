/*
 * @Author: shiliangL
 * @Date: 2021-07-29 08:18:38
 * @LastEditTime: 2022-02-16 14:50:09
 * @LastEditors: Do not edit
 * @Description:
 */
/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/menuConfig',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '权限管理',
      icon: 'lock'
      // roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'userConfig',
        component: () => import('@/views/permission/userConfig'),
        name: 'UserConfig',
        meta: {
          title: '用户管理',
          noCache: false
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'menuConfig',
        component: () => import('@/views/permission/menuConfig'),
        name: 'MenuConfig',
        meta: {
          title: '菜单配置',
          noCache: false
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      }
      // {
      //   path: 'roleConfig',
      //   component: () => import('@/views/permission/roleConfig'),
      //   name: 'RoleConfig',
      //   meta: {
      //     title: '角色配置',
      //     noCache: false
      //     // roles: ['admin'] // or you can only set roles in sub nav
      //   }
      // }
    ]
  },
  {
    path: '/basicData',
    component: Layout,
    alwaysShow: true, // will always show the root menu
    redirect: 'noRedirect',
    name: 'BasicData',
    meta: {
      title: '基础数据',
      icon: 'chart'
    },
    children: [
      {
        path: 'dictionaryConfig',
        component: () => import('@/views/basicData/dictionaryConfig'),
        name: 'dictionaryConfig',
        meta: { title: '数据字典配置', noCache: false }
      },
      {
        path: 'solutionCalss',
        component: () => import('@/views/basicData/solutionCalss'),
        name: 'solutionCalss',
        meta: { title: '解决方案分类', noCache: false }
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
        path: 'devicemhfix',
        component: () => import('@/views/internet/devicemhfix'),
        name: 'devicemhfix',
        meta: { title: '设备维修', noCache: false }
      },
      {
        path: 'peoplemh',
        component: () => import('@/views/internet/peoplemh'),
        name: 'Peoplemh',
        meta: { title: '人员管理', noCache: false }
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
        path: 'exhibition',
        name: 'exhibition',
        meta: { title: '展厅管理', noCache: false },
        component: () => import('@/views/nested/menu1/index'),
        children: [
          {
            path: 'galleryApply',
            component: () => import('@/views/innovativeServices/galleryApply'),
            name: 'GalleryApply',
            meta: { title: '展厅预约', noCache: false }
          },
          {
            path: 'partners',
            component: () => import('@/views/ecologicalResources/partners'),
            name: 'Partners',
            meta: { title: '合作伙伴', noCache: false }
          }
        ]
      },
      {
        path: 'laboratory',
        name: 'laboratory',
        meta: { title: '实验室管理', noCache: false },
        component: () => import('@/views/nested/menu1/index'),
        children: [
          {
            path: 'crdcGalleryApply',
            component: () => import('@/views/innovativeServices/crdcGalleryApply'),
            name: 'CrdcGalleryApply',
            meta: { title: '实验室预约', noCache: false }
          },
          {
            path: 'laboratoryBoot',
            component: () => import('@/views/basicData/laboratoryBoot'),
            name: 'laboratoryBoot',
            meta: { title: '实验室仪器管理', noCache: false }
          }
        ]
      },
      {
        path: 'trainingServices',
        component: () => import('@/views/innovativeServices/trainingServices'),
        name: 'TrainingServices',
        meta: { title: '培训赋能', noCache: false }
      },
      {
        path: 'productServices',
        component: () => import('@/views/innovativeServices/productServices'),
        name: 'ProductServices',
        meta: { title: '项目支撑', noCache: false }
      },

      {
        path: 'professionalWall',
        component: () => import('@/views/innovativeServices/professionalWall'),
        name: 'professionalWall',
        meta: { title: '专家墙管理', noCache: false }
      },
      {
        path: 'authorizationWall',
        component: () => import('@/views/innovativeServices/authorizationWall'),
        name: 'authorizationWall',
        meta: { title: '授权墙管理', noCache: false }
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
