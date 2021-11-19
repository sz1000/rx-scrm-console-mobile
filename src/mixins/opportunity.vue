<script>
import { mapState } from 'vuex'
import { OpportunitiesList, OpportunitiesStageList } from '../config/api'

export default {
    data() {
        return {
            opportunitiesListData: [],
        }
    },
    computed: {
        ...mapState(["corpId"])
    },
    methods: {
        async opportunitiesList() {
            let {code, data, msg} = await OpportunitiesList(this.customerNo)

            if (code === 'success') {
                this.opportunitiesListData = data
            } else {
                this.$toast(msg)
            }
        },
        async opportunitiesStageList(callBack, isEnd) {
            let params = {
                corpId: this.corpId,
                isEnd,
            }

            let { code, data } = await OpportunitiesStageList(params)

            if (code == 'success') {
                callBack(data)
            }
        },
    }
}
</script>