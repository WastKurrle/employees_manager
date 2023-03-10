import { createRouter, createWebHistory } from 'vue-router'
import { useAuthenitacedStore } from '@/stores/authenticated'

// Router views
import HomeViewVue from '@/views/HomeView.vue'
import CompaniesView from '@/views/CompaniesView.vue'
import MyAccountView from '@/views/MyAccountView.vue'
import SignUpView from '@/views/SignUpView.vue'
import SignInViewVue from '@/views/SignInView.vue'
import CreateCompanieView from '@/views/CreateCompanieView.vue'
import CompanieDetailView from '@/views/CompanyDetailView.vue'
import ManageEmployeesViewVue from '@/views/ManageEmployeesView.vue'
import CreateEmployeeView from '@/views/CreateEmployeeView.vue'
import UpdateEmployeeView from '@/views/UpdateEmployeeView.vue'
import EmployeeDetailView from '@/views/EmployeeDetailView.vue'
import NotFoundView from '@/views/404View.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeViewVue
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUpView
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignInViewVue
    },
    {
      path: '/companies',
      name: 'companies',
      component: CompaniesView,
      meta: {
        requireLogin: true
      },
    },

    {
      path: '/my-account',
      name: 'my-account',
      component: MyAccountView,
      meta: {
        requireLogin: true
      },
    },

    {
      path: '/company/create',
      name: 'create-companie',
      component: CreateCompanieView,
      meta: {
        requireLogin: true
      },
    },

    {
      path: '/company/:slug',
      name: 'company-detail',
      component: CompanieDetailView,

      meta: {
        requireLogin: true
      }
    },

    {
      path: '/company/:slug/manage-employees',
      name: 'manage-employees',
      component: ManageEmployeesViewVue,

      meta: {
        requireLogin: true
      }
    },

    {
      path: '/employee/create',
      name: 'create-employee',
      component: CreateEmployeeView,

      meta: {
        requireLogin: true
      }
    },

    {
      path: '/employee/:empId',
      name: 'employee-detail',
      component: EmployeeDetailView,

      meta: {
        requireLogin: true
      }
    },

    {
      path: '/employee/:empId/update',
      name: 'update-employee',
      component: UpdateEmployeeView,

      meta: {
        requireLogin: true
      }
    },
    
    {
      path: '/:catchAll(.*)',
      component: NotFoundView
    }
  ]
})


router.beforeEach((to, from, next) => {
  const authenticatedStore = useAuthenitacedStore()

  if (to.matched.some(record => record.meta.requireLogin) && !authenticatedStore.authenticated) {
    next({name: 'sign-in', query: { to: to.path }})
  } else {
    next()
  }
})

export default router
