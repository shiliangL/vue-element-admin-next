/*
 * @Author: shiliangL
 * @Date: 2021-09-02 08:51:45
 * @LastEditTime: 2021-09-02 09:11:16
 * @LastEditors: Do not edit
 * @Description:
 */
import Layout from '@/layoutv'

const datavRouter = {
  path: '/datav',
  redirect: 'upSpeed',
  name: 'datav',
  component: Layout,
  meta: {
    title: 'datav',
    icon: 'chart'
  },
  children: [
    {
      path: 'upSpeed',
      component: () => import('@/viewsDatav/upSpeed/index'),
      name: 'upSpeed',
      meta: { title: 'upSpeed', noCache: true }
    }
  ]
}

export default datavRouter
