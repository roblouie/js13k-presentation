import { createApp } from 'vue'
import './bulma.css';
import './style.css';
import App from './App.vue'
import router from "./router.ts";
import 'vue-prism-editor/dist/prismeditor.min.css'; // import the styles somewhere
import 'prismjs/components/prism-typescript';

const app = createApp(App)
app.use(router);
app.mount('#app');
