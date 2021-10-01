<template>
  <div class="common-container">
    <div class="title">
      <p class="text">Missions</p>
      <div class="line"></div>
    </div>
    <div class="index-container -mt">
      <div class="container -start -mission">
        <p class="title -ml">Missions Lists</p>
        <button class="common-button -mission" @click="openModal">
          New Missions
        </button>
        <draggable
          :list="missions"
          group="list"
          @change="onChangeMissions($event)"
          @start="dragging = true"
          @end="dragging = false"
          ghost-class="ghost"
          class="draggable"
        >
          <div v-for="mission in missions" :key="mission.id" class="items">
            <BaseMissionCard :prop-mission="mission" @update="updateMission" />
          </div>
        </draggable>
      </div>
      <div class="container -start -mission -ml40">
        <p class="title -ml">Progress</p>
        <draggable
          :list="ProgressMissions"
          group="list"
          @change="onChangeProgressMissions($event)"
          @start="dragging = true"
          @end="dragging = false"
          ghost-class="ghost"
          class="draggable"
        >
          <div
            v-for="mission in ProgressMissions"
            :key="mission.id"
            class="items"
          >
            <BaseMissionCard :prop-mission="mission" @update="updateMission" />
          </div>
        </draggable>
      </div>
      <div class="container -start -mission -ml40">
        <p class="title -ml">DONE</p>
        <draggable
          :list="DoneMissions"
          group="list"
          @change="onChangeDoneMissions($event)"
          @start="dragging = true"
          @end="dragging = false"
          ghost-class="ghost"
          class="draggable"
        >
          <div v-for="mission in DoneMissions" :key="mission.id" class="items">
            <BaseMissionCard :prop-mission="mission" @update="updateMission" />
          </div>
        </draggable>
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

  <!-- <div class="common-container">
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
          <div v-for="mission in ProgressMissions" :key="mission.id" class="items">
            <BaseMissionCard :prop-mission="mission" @update="updateMission" />
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
  </div> -->
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  onBeforeMount,
  useStore,
} from '@nuxtjs/composition-api'
import Draggable from 'vuedraggable'

import _ from 'lodash'
import { Mission, CurrentUser, MissionStatus } from '@/types/props-types'
import BaseMissionCard from '@/components/organisms/BaseMissionCard.vue'
import ModalCreateMission from '@/components/organisms/ModalCreateMission.vue'
import { useModal } from '@/compositions/useModal'
import { useMissions } from '@/compositions/useMissions'

import { firestore } from '@/plugins/firebase'

export default defineComponent({
  components: {
    BaseMissionCard,
    ModalCreateMission,
    Draggable,
  },
  props: {},
  setup(props) {
    const { joinMissionAsProgress, joinMissionAsDone, leaveMission } =
      useMissions(props)
    // compositionAPI
    const store = useStore()
    // ref系
    const missions = ref<Mission[]>([])
    let unsubscribe = null as any
    const allUsers = ref<CurrentUser[]>([])
    const currentUser = store.getters.getCurrentUser
    // ログインユーザーが挑戦しているミッションかを判断する
    const ProgressMissions = ref<Mission[]>([])
    const DoneMissions = ref<Mission[]>([])

    // DD
    const onChangeProgressMissions = ({
      added,
      moved,
    }: {
      added: any
      moved: any
    }) => {
      if (added) {
        console.log('add1', added)
        joinMissionAsProgress(added.element)
      }
      if (moved) {
        console.log('moved', moved)
      }
    }
    const onChangeDoneMissions = ({
      added,
      moved,
    }: {
      added: any
      moved: any
    }) => {
      if (added) {
        console.log('add2', added)
        joinMissionAsDone(added.element)
      }
      if (moved) {
        console.log('moved', moved)
      }
    }
    const onChangeMissions = ({ added, moved }: { added: any; moved: any }) => {
      if (added) {
        console.log('add3', added)
        leaveMission(added.element)
      }
      if (moved) {
        console.log('moved', moved)
      }
    }

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
                // missions.value = [...missions.value, missionData]
                addMyMission(missionData)
              } else if (change.type === 'removed') {
                missions.value = missions.value.filter(
                  (v: Mission) => v.id !== change.doc.data().id
                )
                ProgressMissions.value = ProgressMissions.value.filter(
                  (v: Mission) => v.id !== change.doc.data().id
                )
              } else if (change.type === 'modified') {
                const data = [...missions.value]
                const targetIndex = _.findIndex(data, function (o) {
                  return o.id === change.doc.data().id
                })
                data[targetIndex] = change.doc.data() as Mission
                // if (
                //   _.some(ProgressMissions.value, function (mission) {
                //     return mission.id === change.doc.data().id
                //   })
                // ) {
                //   return
                // }
                // missions.value = [...data]
                // updateProgressMissions(change.doc.data() as Mission)
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

    const addMyMission = (missionData: Mission) => {
      if (
        _.some(missionData.status, function (item: MissionStatus) {
          return item.uid === currentUser.uid && item.status === false
        })
      ) {
        return (ProgressMissions.value = [
          ...ProgressMissions.value,
          missionData,
        ])
      } else if (
        _.some(missionData.status, function (item: MissionStatus) {
          return item.uid === currentUser.uid && item.status === true
        })
      ) {
        return (DoneMissions.value = [...DoneMissions.value, missionData])
      } else {
        return (missions.value = [...missions.value, missionData])
      }
    }
    const updateProgressMissions = (changeData: Mission) => {
      ProgressMissions.value = [changeData, ...ProgressMissions.value]
    }
    return {
      // 全投稿データ
      missions,
      ProgressMissions,
      DoneMissions,
      addMyMission,
      updateProgressMissions,
      // モーダル開閉
      isOpened,
      openModal,
      closeModal,
      closeFunc,
      // 挑戦状編集
      defaultData,
      updateMission,
      // DD
      onChangeMissions,
      onChangeProgressMissions,
      onChangeDoneMissions,
    }
  },
})
</script>
