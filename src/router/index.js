import Vue from 'vue';
import VueRouter from 'vue-router';
import AboutPage from '@/pages/AboutPage';
import HomePage from '@/pages/HomePage';
import BrowsePage from '@/pages/BrowsePage';
import PhotoDetailPage from '@/pages/PhotoDetailPage';
import ShareListPage from '@/pages/ShareListPage';
import ShareListsPage from '@/pages/ShareListsPage';
import store from '@/store';
import { SET_QUERY, SET_SHARE_LIST, SET_IMAGE } from '@/store/mutation-types';


Vue.use(VueRouter);


const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/search',
      name: 'browse-page',
      component: BrowsePage,
      props: route => ({ query: route.query.q }),
    },
    {
      path: '/lists/:id',
      name: 'share-list-page',
      component: ShareListPage,
      props: true,
    },
    {
      path: '/lists',
      name: 'share-list-page',
      component: ShareListsPage,
    },
    {
      path: '/photos/:id',
      name: 'photo-detail-page',
      component: PhotoDetailPage,
      props: true,
    },
    {
      path: '/about',
      name: 'about-page',
      component: AboutPage,
    },
    {
      path: '/',
      name: 'home-page',
      component: HomePage,
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

router.afterEach((to) => {
  if (to && to.query && to.query.q) {
    store.commit(SET_QUERY, to.query);
  }
  store.commit(SET_SHARE_LIST, { shareListImages: [] });
  store.commit(SET_IMAGE, { image: {} });
});

export default router;
