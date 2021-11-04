import router from './router'
import store from '@/store'
router.beforeEach(async(to, from, next) => {
    // let token = store.getters.token
    console.log('href', window.location.href, to)
    next()
})

router.afterEach(async(to, from, next) => {
    // finish progress bar
    // document.title = store.getters.settingInfo.showName || store.getters.settingInfo.name
})