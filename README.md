
# SlotLoader

## How it works

```html
<div vue="App">
  <div vue="AppHeader" data-prop="propValue">
    <h1 slot="title">Hello, World !</h1>
  </div>
</div>
```

```javascript
import SlotLoader from 'slot-loader'
import Vue from 'vue'
import components from './components'

const loader = new SlotLoader({
  Vue,
  components
});

loader.render();
```

## With Vuex

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import storeData from './store'

Vue.use(Vuex);

const store = new Vuex.Store(storeData);
const loader = new SlotLoader({
  Vue,
  store,
  components
});

loader.render();
```

## Options

- Vue: Vue = Vue Class
- components: Object = Collection of vue component
- store: Store = Vuex Store instance (optional)
- key: String = Attribute name for component name (optional)


## Components Example

```javascript
import App from './App.vue'
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'

export default {
  App,
  AppHeader,
  AppFooter
}
```

## Props

```html
<div vue="App" data-foo="1" :data-bar="2" :data-baz>
</div>
```

- All `data-*` attributes are passed to component as prop
- Use ':' prefix to parse the value as js
