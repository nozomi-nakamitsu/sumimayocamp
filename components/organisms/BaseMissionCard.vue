<template>
  <div class="card-container -blue -mx8">
    <div class="container">
      <div class="card-head">
        <div class="left">
          <div class="image">
            <img class="img" alt="" :src="mission.sendUser.photoURL" />
          </div>
        </div>
        <div class="right">
          <p class="name">
            {{
              mission.sendUser.nickName
                ? mission.sendUser.nickName
                : mission.sendUser.displayName
            }}
            <span class="text">からの挑戦状</span>
          </p>

          <p class="date">
            {{ formatDateToSlashWithTime(mission.updated_at) }}
          </p>
        </div>
      </div>
      <div class="body">
        <p>{{ mission.title }}</p>
      </div>
      <div class="footer -start">
        <div class="card-footer-items">
          <p class="text">Challengers</p>
          <div class="challengers">
            <div
              v-for="(status, index) in mission.status"
              :key="index"
              class="items"
            >
              <div class="image">
                <img :src="status.photoURL" alt="" class="img" />
              </div>
            </div>
          </div>
        </div>
        <div v-if="isSendUser(mission)" class="button -right">
          <BaseSquareMenu
            @delete="DeleteMission(mission.id, mission.files)"
            @update-mission="UpdateMission(mission)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  useRouter,
  useStore,
  ref,
  watch,
} from '@nuxtjs/composition-api'
import _ from 'lodash'
import { FileArray, Mission, MissionStatus } from '@/types/props-types'
import { formatDateToSlashWithTime } from '@/compositions/useFormatData'
import BaseSquareMenu from '@/components/atoms/BaseSquareMenu.vue'
import { firestore } from '@/plugins/firebase.js'
import { isCurrentUser } from '@/compositions/useAuth'

export default defineComponent({
  components: {
    BaseSquareMenu,
  },
  props: {
    propMission: {
      type: Object as PropType<Mission>,
      required: true,
    },
  },
  emits: ['update'],
  setup(props, ctx) {
    // compositionAPI
    const Router = useRouter()
    const store = useStore()
    // ref系
    const currentUser = store.getters.getCurrentUser
    const mission = ref<Mission>(props.propMission)
    watch(
      () => props.propMission,
      () => {
        mission.value = props.propMission
      }
    )
    const DeleteMission = async (id: string, files: FileArray[]) => {
      try {
        // NOTE:ファイルがあれば削除
        if (files.length !== 0) {
          await files.map((file) => {
            const id = file.id
            store.dispatch('deleteFile', {
              id,
            })
          })
        }
        await firestore.collection('missions').doc(id).delete()
      } catch (error) {
        console.error(error)
      }
    }

    const UpdateMission = (data: Mission) => {
      ctx.emit('update', data)
    }
    // ログインユーザーが挑戦しているミッションかを判断する
    const isMyMission = computed(() => (mission: Mission): boolean => {
      if (mission.status.length === 0) {
        return false
      }
      return _.some(mission.status, function (item: MissionStatus) {
        return item.uid === currentUser.uid
      })
    })
    // ミッションのステータスを変更する
    const changeStatus = async (mission: Mission) => {
      const data = mission as Mission
      const target = _.find(data.status, function (o) {
        return o.uid === currentUser.uid
      })
      if (target) {
        target.status = !target.status
        const targetIndex = _.findIndex(
          data.status,
          function (o: MissionStatus) {
            return o.uid === currentUser.uid
          }
        )
        data.status[targetIndex].status = target.status
        try {
          await firestore.collection('missions').doc(mission.id).update(data)
        } catch (error) {
          console.error(error)
        }
      }
    }
    // ログインユーザーが作成したミッションかを判断する
    const isSendUser = computed(
      () =>
        (mission: Mission): boolean =>
          mission.sendUser.uid === currentUser.uid
    )

    return {
      DeleteMission,
      UpdateMission,
      isCurrentUser,
      currentUser,
      mission,
      // フォーマット
      formatDateToSlashWithTime,
      // compositionAPI
      Router,
      // ステータス変更
      isMyMission,
      changeStatus,
      isSendUser,
    }
  },
})
</script>
