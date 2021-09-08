<template>
  <div>
    <div class="index-container">
      <div class="container">
        <h2>ミッション一覧</h2>
        <div class="flex">
          <div class="mission-list-container -beige">
            <h3 class="title">挑戦状一覧</h3>
            <div
              v-for="mission in missions"
              :key="mission.id"
              style="margin: 20px"
            >
              <BaseMissionCard :mission="mission" />
            </div>
          </div>
          <div class="mission-list-container -pink">
            <v-btn depressed @click="openModal"> 挑戦状を作成する </v-btn>
            <h3>がんばる挑戦状一覧</h3>
            <div
              v-for="mission in missions"
              :key="mission.id"
              style="margin: 20px"
            >
              <BaseMissionCard :mission="mission" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalCreateMission
      :controlFlag="isOpened"
      title="挑戦状を作成する"
      @click="closeModal"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  useStore,
} from '@nuxtjs/composition-api'
import { CurrentUser, Mission } from '@/types/props-types'
import BaseMissionCard from '@/components/organisms/BaseMissionCard.vue'
import ModalCreateMission from '@/components/organisms/ModalCreateMission.vue'
import { useModal } from '@/compositions/useModal'
import { firestore } from '@/plugins/firebase'
export default defineComponent({
  components: {
    BaseMissionCard,
    ModalCreateMission,
  },
  setup() {
    // compositionAPI
    const store = useStore()
    const currentUser = store.getters.getCurrentUser
    const missions = ref<Mission[]>([])
    let unsubscribe = null as any

    // 投稿一覧データを取得する
    onMounted(() => {
      unsubscribe = firestore
        .collection('missions')
        .orderBy('updated_at', 'desc')
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach(
            (change) => {
              // 変更後のデータが取得できる
              if (change.type === 'added') {
                const missionData = change.doc.data() as Mission
                missions.value = [...missions.value, missionData]
                console.log('    missions.value', missions.value)
              } else if (change.type === 'removed') {
                missions.value = missions.value.filter(
                  (v: Mission) => v.id !== change.doc.data().id
                )
              }
            },
            (error: any) => {
              console.error(error)
            }
          )
        })
    })
    // ページ遷移後にsnapshotでの監視をstopする
    onBeforeUnmount(() => {
      unsubscribe()
    })
    const { isOpened, openModal, closeModal } = useModal()
    return {
      // 全投稿データ
      missions,
      // モーダル開閉
      isOpened,
      openModal,
      closeModal,
    }
  },
})
</script>
