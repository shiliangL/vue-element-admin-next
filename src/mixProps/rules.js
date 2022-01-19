export default {
  data() {
    return {
      rules: {
        input: [
          {
            required: true,
            message: '请输入',
            trigger: 'change'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入',
            trigger: 'change'
          },
          { min: 1, max: 36, message: '编号长度请在 1 到 36 个字符内' }
        ],
        select: [
          {
            required: true,
            message: '请选择',
            trigger: 'change'
          }
        ],
        validInteger: [{
          required: true, message: '请输入正整数', trigger: 'change', validator: (rule, value, callback) => {
            if (!/^[0-9]+$/.test(value)) {
              return callback(new Error('请输入正整数'))
            }
            callback()
          }
        }],
        // 非零校验
        validNonZero: (rule, value, callback) => {
          if (!value) {
            return callback(new Error('请输入'))
          }
          if (value <= '0') {
            return callback(new Error('请输入大于零的数值'))
          }
          callback()
        },
        // 可以为空但不能为负数的校验
        validNonNegative: (rule, value, callback) => {
          if (value === null) {
            callback()
          }
          if (value < '0') {
            return callback(new Error('数值不能为负数'))
          }
          callback()
        },
        // 只能输入中文
        validChinese: (rule, value, callback) => {
          // if (value === null) {
          //   return callback(new Error('内容不能为空'))
          // }

          const reg = /^[\u2E80-\u9FFF]+$/// Unicode编码中的汉字范围
          if (value && value.length > 0) {
            if (!reg.test(value)) {
              callback([new Error('只能输入汉字')])
            } else {
              callback()
            }
          } else if (value.length === 0) {
            callback()
          } else {
            callback(new Error('输入不合法'))
          }
        },

        validNumberR2: (rule, value, callback) => {
          if (!value) {
            return callback(new Error('请输入'))
          }
          var reg = /^([0-9][\d]{0,5})(\.[\d]{1,2})?$/
          if (!reg.test(value)) {
            return callback(new Error('请输入有效数字'))
          }
          callback()
        },
        validPhone: (rule, value, callback) => {
          if (!value) {
            return callback(new Error('请输入'))
          }
          var reg = /^[1][34578][0-9]{9}$/
          if (!reg.test(value)) {
            return callback(new Error('请输入正确的手机号'))
          }
          callback()
        },
        // 座机
        validTelphone: (rule, value, callback) => {
          if (!value) {
            callback()
          }
          var reg = /0\d{2,3}-\d{7,8}/
          if (!reg.test(value)) {
            return callback(new Error('请输入正确的座机'))
          }
          callback()
        },
        validNumberR8: (rule, value, callback) => {
          if (!value && value !== 0) {
            return callback(new Error('请输入'))
          }
          var reg = /^([0-9][\d]{0,8})(\.[\d]{1,2})?$/
          if (!reg.test(value)) {
            return callback(new Error('请输入有效数字'))
          }
          callback()
        },
        checkPhone: (rule, value, callback) => {
          const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
          if (!this.$empty(value) && !reg.test(value)) {
            return callback(new Error('手机号码格式不正确'))
          }
          callback()
        },
        checkFax: (rule, value, callback) => {
          const reg = /^(0?\d{2,3}\-)?[1-9]\d{6,7}(\-\d{1,4})?$/
          if (!this.$empty(value) && !reg.test(value)) {
            return callback(new Error('传真号码格式不正确'))
          }
          callback()
        },
        checkTel: (rule, value, callback) => {
          const reg = /0\d{2}[- ]?\d{8}|0\d{3}[- ]?\d{7}$/
          if (!this.$empty(value) && !reg.test(value)) {
            return callback(new Error('电话号码格式不正确'))
          }
          callback()
        },
        checkEmail: (rule, value, callback) => {
          const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
          if (!this.$empty(value) && !reg.test(value)) {
            return callback(new Error('邮箱格式不正确'))
          }
          callback()
        },
        checkSearchBox: (rule, value, callback) => {
          if (this.$empty(value)) {
            return callback(new Error('请选择'))
          }
          callback()
        },
        /**
         * @param  {[type]}   rule     [description]
         * @param  {[type]}   value    [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        validNumber: (rule, value, callback) => {
          if (!value) {
            return callback(new Error('请输入有效数字'))
          }
          var reg = /^([0-9][\d]{0,5})(\.[\d]{1,2})?$/
          if (!reg.test(value)) {
            return callback(new Error('请输入有效数字'))
          }
          callback()
        },
        /**
         * @param  {[type]}   rule     [description]
         * @param  {[type]}   value    [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        validIsChinese: (rule, value, callback) => {
          const reg = /[\u4e00-\u9fa5]/
          if (!this.$empty(value) && !reg.test(value)) {
            return callback(new Error('格式不正确'))
          }
          callback()
        },
        /**
         * 验证营业执照格式(统一代码由十八位的阿拉伯数字或大写英文字母（不使用I、O、Z、S、V）组成)
         * @param  {[type]}   rule     [description]
         * @param  {[type]}   value    [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        validLicense: (rule, value, callback) => {
          const reg = /^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$/
          if (!this.$empty(value) && !reg.test(value)) {
            return callback(new Error('格式不正确'))
          }
          callback()
        },
        /**
         * 验证是否为有效数字(非空)
         * @param  {[type]}   rule     [description]
         * @param  {[type]}   value    [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        validRequiredNumber: (rule, value, callback) => {
          if (!value) {
            return callback(new Error('请输入'))
          }
          var reg = /^([0-9][\d]{0,5})(\.[\d]{1,2})?$/
          if (!reg.test(value)) {
            return callback(new Error('请输入有效数字'))
          }
          callback()
        },
        /**
         * 验证是否为正整数(包括零)
         * @param  {[type]}   rule     [description]
         * @param  {[type]}   value    [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        validPositiveInteger: (rule, value, callback) => {
          if (value === null) {
            callback()
          }
          if (!/^[0-9]+$/.test(value)) {
            return callback(new Error('请输入正整数'))
          }
          callback()
        }

      }
    }
  }
}
