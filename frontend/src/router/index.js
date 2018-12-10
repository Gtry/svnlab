import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/

export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '',
    component: () => import('@/views/login/index'),
    name: 'login',
    hidden: true
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/permissionCheck',
    component: Layout,
    redirect: '/permissionCheck',
    name: 'permissionCheck',
    meta: { title: 'permissionCheck', icon: 'tree' },
    children: [
      {
        path: 'user',
        component: () => import('@/views/permissionCheck/userPermission'),
        name: 'userPermission',
        meta: { title: 'userPermission', icon: 'people', noCache: true }
      },
      {
        path: 'module',
        component: () => import('@/views/permissionCheck/modulePermission'),
        name: 'ModulePermission',
        meta: { title: 'ModulePermission', icon: 'peoples', noCache: true }
      }
      /*,
      {
        path: '/all',
        component: () => import('@/views/permissionCheck/allPermission'),
        name: 'allPermission',
        meta: { title: '所有权限', icon: 'fa fa-folder-open-o', noCache: true }
      }
      */
    ]
  },
  {
    path: '/permissionApply',
    component: Layout,
    redirect: '/permissionApply',
    children: [
      {
        path: '',
        component: () => import('@/views/permissionApply'),
        name: 'permissionApply',
        meta: { title: 'permissionApply', icon: 'link', noCache: true }
      }
    ]
  },
  {
    path: '/svnShows',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '',
        component: () => import('@/views/svnShows'),
        name: 'svnShows',
        meta: { title: 'svnShows', icon: 'list', noCache: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'userInfo',
        component: () => import('@/views/userInfo'),
        name: 'userInfo',
        meta: { title: 'userInfo', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/about',
    component: Layout,
    redirect: '/about',
    name: 'about',
    meta: { title: 'about', icon: 'guide' },
    children: [
      {
        path: 'systemExplain',
        component: () => import('@/views/about/systemExplain'),
        name: 'systemExplain',
        meta: { title: 'systemExplain', icon: 'message', noCache: true }
      },
      {
        path: 'revisionExplain',
        component: () => import('@/views/about/revisionExplain'),
        name: 'revisionExplain',
        meta: { title: 'revisionExplain', icon: 'message', noCache: true }
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/errorPage/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/errorPage/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  }
  /**
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://www.dahuatech.com/',
        meta: { title: 'permissionApply', icon: 'link' }
      }
    ]
  },
  */
]

export const asyncRouterMap = []

/**
 * export const reporterRouterMap = []
 * export const developerRouterMap = []
 * export const masterRouterMap = []
 */

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export default router
