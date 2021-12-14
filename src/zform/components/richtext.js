import {defZFormFieldCom} from "@/zform/DymFormHooks";

if (!window.customElements.get('z-shadow')) {
  class ZShadow extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: 'open'});
    }
    setContent(css, html) {
      // console.log(css, html)

      this.shadowRoot.innerHTML = `<style>:host {display: block; overflow: hidden;} ${css}</style>${html}`
    }
  }
  window.customElements.define('z-shadow', ZShadow);
}

defZFormFieldCom('CusRichText', {
  create(propConfig) {
    return {
      template: `<div>
      <z-shadow ref="mainRef" :id="id"></z-shadow>
      </div>`,
      mixins: [

      ],
      data() {
        return {
          id: ZY.rid(),
          value: undefined,
          ui: propConfig.ui,
        }
      },
      mounted() {
        this.setValue()
      },
      methods: {
        getShadow() {
          return  document.getElementById(this.id)
          // return _getContext
        },
        setValue() {
          let self = this;
          function getHtml() {
            let html = ''
            let obj = {}
            if (self.ui.widgetConfig.html_content) {
              try {
                obj = ZY.JSON5.parse(self.ui.widgetConfig.html_content)
                html = obj.html
              } catch (e) {
                //
              }
            }
            return html
          }

          function getCss() {
            let css = ''
            if (self.ui.widgetConfig.html_content) {
              try {
                css = self.ui.widgetConfig.css_style
              } catch (e) {
                //
              }
            }
            return css
          }
          console.dir(getCss())
          self.getShadow().setContent(getCss(), getHtml())
        }
      }
    }
  }
})
