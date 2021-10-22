export default {
    data() {
        return {
            expandedKeys: [],
        }
    },
    mounted() {
        let permissionsList = JSON.parse(sessionStorage.getItem('permissionsList'))
            // console.log('--permissionsList', permissionsList)
        this.setName(permissionsList)
    },
    methods: {
        setName(datas) {
            // console.log(datas)
            for (var i in datas) {
                let url = location.pathname
                if (datas[i].url == url) {
                    this.expandedKeys = datas[i].childrenList
                    console.log('---expandedKeys---', this.expandedKeys)
                }
                if (datas[i].childrenList) {
                    this.setName(datas[i].childrenList)
                }
            }
        },
    },
}