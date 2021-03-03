require('./bootstrap');

window.Vue = require('vue').default;

//vue-router
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//routes
import { routes } from './routes';

//app(master page)
import App from './App.vue';

//fontawesome
import '@fortawesome/fontawesome-free/js/all.js';

//vform
import Vue from 'vue'
import { Form, HasError, AlertError } from 'vform'
window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

/*iziToast*/
import iziToast  from 'izitoast';
window.iziToast = iziToast;
// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))


const router = new VueRouter({
    mode: 'history',
    routes: routes
});

const app = new Vue({
    el: '#app',
    router: router,
    render: h => h(App),

});
