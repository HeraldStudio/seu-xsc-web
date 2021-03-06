import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '../views/Welcome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome
  },
  {
    path: '/home',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/student-basic-info',
    name: 'student-basic-info',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/StudentBasicInfo.vue')
  },
  {
    path: '/student-curriculum',
    name: 'student-curriculum',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/StudentCurriculum.vue')
  },
  {
    path: '/student-grade',
    name: 'student-grade',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/StudentGrade.vue')
  },
  {
    path:'/vacation-list',
    name:'vacation-list',
    component: () => import(/* webpackChunkName*/'../views/VacationList.vue')
  },
  {
    path: '/holiday-trip-register',
    name: 'holiday-trip-register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/HolidayTripRegister.vue'),
  },
  {
    path: '/locate-student',
    name: 'locate-student',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LocateStudent.vue')
  },
  {
    path:'/leave-approval',
    name:'leave-approval',
    component: () => import(/* webpackChunkName: "about"*/'../views/LeaveApproval.vue')
  },
  {
    path: '/leave-register',
    name: 'leave-register',
    component: () => import(/* webpackChunkName: "about"*/'../views/LeaveRegister.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
