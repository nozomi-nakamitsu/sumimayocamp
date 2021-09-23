<template>
  <div class="common-container">
    <div class="title">
      <p class="text">Missions</p>
      <div class="line"></div>
    </div>
    <div class="index-container">
      <div class="container -start">
        <p class="title">Missions Lists</p>
        <div v-for="mission in missions" :key="mission.id" class="items">
          <BaseMissionCard :prop-mission="mission" @update="updateMission" />
        </div>
      </div>
      <div class="container -start">
        <div class="wrapper">
          <p class="title">New Missions</p>
          <div>
            <button class="common-button -mission" @click="openModal">
              New Missions
            </button>
          </div>
          <p class="title">My Missions</p>
          <div>
            <div v-for="mission in missions" :key="mission.id">
              <BaseMissionCard
                :prop-mission="mission"
                @update="updateMission"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalCreateMission
      :control-flag="isOpened"
      title="挑戦状を作成しよう!"
      :default-data="defaultData"
      :types="defaultData !== null ? 'edit' : 'new'"
      @click="closeFunc"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  onBeforeMount,
} from '@nuxtjs/composition-api'
import _ from 'lodash'
import { Mission, CurrentUser } from '@/types/props-types'
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
    const missions = ref<Mission[]>([])
    let unsubscribe = null as any
    const allUsers = ref<CurrentUser[]>([])
    // ユーザー一覧データを取得する
    onBeforeMount(() => {
      firestore
        .collection('users')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            allUsers.value = [...allUsers.value, doc.data()] as CurrentUser[]
          })
        })
    })
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
                const targetUser = _.find(
                  allUsers.value,
                  function (user: CurrentUser) {
                    return user.uid === missionData.sendUser.uid
                  }
                )
                if (targetUser) {
                  missionData.sendUser = { ...targetUser }
                }
                missions.value = [...missions.value, missionData]
              } else if (change.type === 'removed') {
                missions.value = missions.value.filter(
                  (v: Mission) => v.id !== change.doc.data().id
                )
              } else if (change.type === 'modified') {
                const data = [...missions.value]
                const targetIndex = _.findIndex(data, function (o) {
                  return o.id === change.doc.data().id
                })
                data[targetIndex] = change.doc.data() as Mission

                missions.value = [...data]
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

    const defaultData = ref<Mission | null>(null)
    const updateMission = (data: Mission) => {
      openModal()
      defaultData.value = data
    }
    const closeFunc = () => {
      closeModal()
      defaultData.value = null
    }
    const { isOpened, openModal, closeModal } = useModal()

    return {
      // 全投稿データ
      missions,
      // モーダル開閉
      isOpened,
      openModal,
      closeModal,
      closeFunc,
      // 挑戦状編集
      defaultData,
      updateMission,
    }
  },
})
</script>
