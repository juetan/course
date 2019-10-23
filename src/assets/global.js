exports.install = function(Vue, options) {

    //规则1：验证手机
    const validatePhone = (rule, value, callback) => {
        var reg = /^1\d{10}$/
        if (value != null && value != "") {
            if (reg.test(value)) {
                callback()
            } else {
                callback(new Error('请输入正确的手机号码'))
            }
        } else {
            callback()
        }
    }

    //规则2：验证邮箱
    const validateEmail = (rule, value, callback) => {
        var reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
        if (value != null && value != "") {
            if (!reg.test(value)) {
                callback(new Error('请输入正确的邮箱'))
            } else {
                callback()
            }
        } else {
            callback(new Error('11111'))
        }
    }

    //规则3：验证网址
    const validateUrl = (rule, value, callback) => {
        var reg = new RegExp("[a-zA-z]+://[^\s]*")
        if (value != null && value != "") {
            if (!reg.test(value)) {
                callback(new Error('请输入正确的网站地址'))
            } else {
                callback()
            }
        } else {
            callback()
        }
    }

    //规则4：验证QQ
    const validateQQ = (rule, value, callback) => {
        var reg = new RegExp("[1-9][0-9]{4,}")
        if (value != null && value != "") {
            if (!reg.test(value)) {
                callback(new Error('请输入正确的QQ号码'))
            } else {
                callback()
            }
        } else {
            callback()
        }
    }

    //规则5：验证日期
    const validateDate = (rule, value, callback) => {
        var reg = new RegExp("([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))")
        if (value != null && value != "") {
            if (!reg.test(value)) {
                callback(new Error('请输入正确的日期'))
            } else {
                callback()
            }
        } else {
            callback()
        }
    }

    //规则6：验证身份证
    const validateIdcard = (rule, value, callback) => {
        var reg = new RegExp("^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$")
        if (value != null && value != "") {
            if (!reg.test(value)) {
                callback(new Error('请输入正确的身份证号码'))
            } else {
                callback()
            }
        } else {
            callback()
        }
    }


    //全局验证规则
    Vue.prototype.rule = function({ required = true, maxLength = null, min = null, max = null, type = null } = {}) {
        let rules = [];
        if (required) {
            rules.push({ required: true, message: '该项为必填项', trigger: 'blur' })
        }
        if (maxLength) {
            rules.push({ min: 1, max: maxLength, message: `最多输入${maxLength}个字符`, trigger: 'blur' })
        }
        if (min && max) {
            rules.push({ min: min, max: max, message: `字符长度在${min}至${max}之间`, trigger: 'blur' })
        }
        if (type) {
            switch (type) {
                case 'email':
                    rules.push({ validator: validateEmail, trigger: 'blur' });
                    break;
                case 'phone':
                    rules.push({ validator: validatePhone, trigger: 'blur' });
                    break;
                case 'url':
                    rules.push({ validator: validateUrl, trigger: 'blur' });
                    break;
                case 'qq':
                    rules.push({ validator: validateQQ, trigger: 'blur' });
                    break;
                case 'date':
                    rules.push({ validator: validateDate, trigger: 'blur' });
                    break;
                case 'idcard':
                    rules.push({ validator: validateIdcard, trigger: 'blur' });
                    break;
                default:
                    rules.push({});
                    break;
            }
        }
        return rules;
    }
}