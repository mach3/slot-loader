
class SlotLoader {

  constructor (props) {
    this.props = {
      Vue: null,
      components: null,
      store: null,
      key: 'vue'
    };
    if (props) {
      this.use(props);
    }
  }

  use (props) {
    Object.assign(this.props, props);

    return this;
  }

  render (element) {
    element = element || document;

    const self = this;
    const key = this.props.key;
    const components = this.props.components;
    const Vue = this.props.Vue;
    const store = this.props.store;
    const nested = Array.from(element.querySelectorAll(`[${key}] [${key}]`));

    Array.from(element.querySelectorAll(`[${key}]`))
    .map((el) => {
      if (nested.indexOf(el) >= 0) return;

      const name = el.getAttribute(key);
      const props = this.getProps(el);
      const slot = el.innerHTML;

      if (name in components) {
        new Vue({
          el,
          store,
          components,
          template: `<${name} ${props}>${slot}</${name}>`,
          mounted () {
            self.render(this.$el);
          }
        });
      }
    });

    return this;
  }

  getProps (el) {
    const pattern = /^(:)?data-(.+?)$/;
    return Array.from(el.attributes)
    .filter(item => pattern.test(item.name))
    .map((item, i) => {
      let m = item.name.match(pattern);
      let name = m[1] ? m[1] + m[2] : m[2];
      let value = (m[1] && item.value === '') ? true : item.value;
      return `${name}="${value}"`;
    })
    .join(' ');
  }

};

export default SlotLoader
