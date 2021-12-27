/*
 * @Author: shiliangL
 * @Date: 2021-07-02 20:59:08
 * @LastEditTime: 2021-07-24 22:42:53
 * @LastEditors: Do not edit
 * @Description:
 */
import Vue from 'vue'
import { Dialog } from 'element-ui'
import merge from 'element-ui/src/utils/merge'

const ModalConstructor = Vue.extend(Dialog)

// 配置常用默认设置
const defaults = {
  // appendToBody: true,
  destroyOnClose: true,
  closeOnClickModal: false,
  closeOnPressEscape: false
}

let instance

const OpenLayer = function({ store, router }) {
  return function({ component, methods, props, componentProps }) {
    if (Vue.prototype.$isServer) return
    const modalOptions = merge({}, defaults, props)
    const dom = document.createElement('div')
    document.body.appendChild(dom)
    instance = new ModalConstructor({
      el: dom,
      store,
      router,
      data() {
        return {
          showModal: true
        }
      },
      components: {
        Dialog: Dialog,
        Plugin: component
      },
      render(createElement) {
        const Plugin = this.showModal ? () => createElement('Plugin', {
          props: {
            ...componentProps
          },
          on: {
            close: (e) => this.close(e),
            ...methods
          }
        }) : null
        return createElement(
          'Dialog', {
            props: {
              visible: this.showModal,
              ...modalOptions
            },
            on: {
              close: () => {
                this.close()
              },
              closed: () => {
                this.closedFn()
              }
            },
            scopedSlots: {
              default: Plugin
            }
          })
      },
      methods: {
        close() {
          this.showModal = false
        },
        closedFn() {
          // console.log('关闭动画结束时的回调')
          setTimeout(() => {
            document.body.removeChild(this.$el)
            this.$destroy()
          }, 400)
        }
      }
    })
    instance.$el.style.padding = '18px'
    return instance
  }
}

export default OpenLayer
