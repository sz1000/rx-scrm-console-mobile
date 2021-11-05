import router from './router'
import store from '@/store'
import { phoneModel, isWeChat } from '@/utils/function.js'
router.beforeEach(async(to, from, next) => {
    // let token = store.getters.token
    console.log('href', window.location.href, to)
    console.log('is wx', isWeChat())
    console.log('is sys', phoneModel())
    if (window.entryUrl === undefined) {
        window.entryUrl = location.href.split('#')[0]
    }
    next()
})

router.afterEach(async(to, from, next) => {
    // finish progress bar
    let url
    if (phoneModel() === 'ios') {
        url = window.entryUrl
    } else {
        url = window.location.href
    }
    console.log(url, "-----url")
        // document.title = store.getters.settingInfo.showName || store.getters.settingInfo.name
})