<template>
  <div class="common-container -scrollx">
    <div class="title">
      <p class="text">Missions</p>
      <div class="line"></div>
      <p class="comment">
        優しい心を持って触ってください。カードの縦方向の順番がバグることもあるけど、そんな時はイラつかず、リロードだ〜。
      </p>
    </div>
    <div class="index-container -mt">
      <div class="container -start -mission -blue">
        <div class="head">
          <p class="title -ml">Missions Lists</p>
          <button class="common-button -mission" @click="openModal">
            <div>
              <Icon :icon="faPlusCircle" types="button" />
            </div>
            <p claas="text" style="margin-left: 8px">New Missions</p>
          </button>
        </div>

        <draggable
          :list="missions"
          group="list"
          ghost-class="ghost"
          class="draggable"
          :swap-threshold="0.4"
          :animation="200"
          :empty-insert-threshold="30"
          direction="vertical"
          @change="onChangeMissions($event)"
          @start="dragging = true"
          @end="dragging = false"
        >
          <div v-for="mission in missions" :key="mission.id" class="items">
            <BaseMissionCard
              :prop-mission="mission"
              types="Misions"
              @update="updateMission"
            />
          </div>
        </draggable>
      </div>
      <div class="container -start -mission -ml40 -red">
        <p class="title -ml">Progress</p>
        <draggable
          :list="ProgressMissions"
          group="list"
          ghost-class="ghost"
          class="draggable"
          :swap-threshold="0.4"
          :animation="200"
          :empty-insert-threshold="30"
          direction="vertical"
          @change="onChangeProgressMissions($event)"
          @start="dragging = true"
          @end="dragging = false"
        >
          <div
            v-for="mission in ProgressMissions"
            :key="mission.id"
            class="items"
          >
            <BaseMissionCard
              :prop-mission="mission"
              types="ProgressMissions"
              @update="updateMission"
            />
          </div>
        </draggable>
      </div>
      <div class="container -start -mission -ml40 -green">
        <p class="title -ml">Completed</p>
        <draggable
          :list="DoneMissions"
          group="list"
          ghost-class="ghost"
          class="draggable"
          :swap-threshold="0.4"
          :animation="200"
          :empty-insert-threshold="30"
          direction="vertical"
          @change="onChangeDoneMissions($event)"
          @start="dragging = true"
          @end="dragging = false"
        >
          <div v-for="mission in DoneMissions" :key="mission.id" class="items">
            <BaseMissionCard
              :prop-mission="mission"
              types="DoneMissions"
              @update="updateMission"
            />
          </div>
        </draggable>
      </div>
    </div>
    <ModalCreateMission
      :control-flag="isOpened"
      title="挑戦状を作成しよう!"
      :default-data="defaultData"
      :types="defaultData.title === '' ? 'new' : 'edit'"
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
  useStore,
} from '@nuxtjs/composition-api'
import Draggable from 'vuedraggable'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import {
  Mission,
  CurrentUser,
  MissionStatus,
  MissionForm,
} from '@/types/props-types'
import BaseMissionCard from '@/components/organisms/BaseMissionCard.vue'
import ModalCreateMission from '@/components/organisms/ModalCreateMission.vue'
import { useModal } from '@/compositions/useModal'
import { useMissions } from '@/compositions/useMissions'
import { MissionRef } from '@/utilities/useFirestore'
import Icon from '@/components/molecules/Icon.vue'
import { firestore } from '@/plugins/firebase'

export default defineComponent({
  components: {
    BaseMissionCard,
    ModalCreateMission,
    Draggable,
    Icon,
  },
  props: {},
  setup(props) {
    const {
      joinMissionAsProgress,
      joinMissionAsDone,
      leaveMission,
      changePosition,
      sortMissions,
    } = useMissions(props)
    // compositionAPI
    const store = useStore()
    // ref系
    const missions = ref<Mission[]>([])
    let unsubscribe = null as any
    const allUsers = ref<CurrentUser[]>([])
    const currentUser = store.getters['auth/getCurrentUser']
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
        joinMissionAsProgress(added.element)
        changePosition(added.newIndex, ProgressMissions.value)
      }
      if (moved) {
        changePosition(moved.newIndex, ProgressMissions.value)
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
        joinMissionAsDone(added.element)
        changePosition(added.newIndex, DoneMissions.value)
      }
      if (moved) {
        changePosition(moved.newIndex, DoneMissions.value)
      }
    }
    const onChangeMissions = ({ added, moved }: { added: any; moved: any }) => {
      if (added) {
        leaveMission(added.element)
        changePosition(added.newIndex, missions.value)
      }
      if (moved) {
        changePosition(moved.newIndex, missions.value)
      }
    }

    // ユーザー一覧データを取得する
    onBeforeMount(() => {
      firestore
        .collection('users')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
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
            async (change) => {
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
                await firestore
                  .collection('missions')
                  .doc(missionData.id)
                  .collection('positions')
                  .doc(currentUser.uid)
                  .get()
                  .then((doc) => {
                    // success
                    if (doc) {
                      missionData.position = doc.data()?.position
                    } else {
                      missionData.position = null
                    }
                  })
                addMyMission(missionData)
              } else if (change.type === 'removed') {
                missions.value = missions.value.filter(
                  (v: Mission) => v.id !== change.doc.data().id
                )
                ProgressMissions.value = ProgressMissions.value.filter(
                  (v: Mission) => v.id !== change.doc.data().id
                )
              } else if (change.type === 'modified') {
                updateProgressMissions(change.doc.data() as Mission)
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

    const defaultData = ref<MissionForm>({
      id: '',
      title: '',
      content: '',
      created_at: new Date(),
      updated_at: new Date(),
      sendUser: { ...currentUser },
      receiveUser: [],
      files: [],
      status: [],
      position: null,
    })
    const updateMission = (data: Mission) => {
      openModal()
      defaultData.value = data
    }
    const closeFunc = () => {
      closeModal()
      defaultData.value = {
        id: '',
        title: '',
        content: '',
        created_at: new Date(),
        updated_at: new Date(),
        sendUser: { ...currentUser },
        receiveUser: [],
        files: [],
        status: [],
        position: null,
      }
    }
    const { isOpened, openModal, closeModal } = useModal()

    const addMyMission = (missionData: Mission) => {
      if (missionData.position === undefined) {
        missionData.position = null
      }
      if (
        _.some(missionData.status, function (item: MissionStatus) {
          return item.uid === currentUser.uid && item.status === false
        })
      ) {
        _.some(missionData.status, function (item: MissionStatus) {
          return item.uid === currentUser.uid && item.status === false
        })
        ProgressMissions.value = [...ProgressMissions.value, missionData]
        ProgressMissions.value = sortMissions(ProgressMissions.value)
      } else if (
        _.some(missionData.status, function (item: MissionStatus) {
          return item.uid === currentUser.uid && item.status === true
        })
      ) {
        DoneMissions.value = [...DoneMissions.value, missionData]
        DoneMissions.value = sortMissions(DoneMissions.value)
      } else {
        missions.value = [...missions.value, missionData]
        missions.value = sortMissions(missions.value)
      }
    }
    // ページ遷移後にDDでのポジション変更にあわせ配列操作する
    // positon順に並べ替えています。
    const updateProgressMissions = async (changeData: Mission) => {
      const data = { ...changeData }
      await firestore
        .collection('missions')
        .doc(data.id)
        .collection('positions')
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          // success
          if (doc) {
            data.position = doc.data()?.position
          } else {
            data.position = null
          }
        })
      if (
        _.some(ProgressMissions.value, function (mission: Mission) {
          return mission.id === data.id
        })
      ) {
        await getNewData(ProgressMissions.value, 'ProgressMissions')
      }
      if (
        _.some(DoneMissions.value, function (mission: Mission) {
          return mission.id === data.id
        })
      ) {
        await getNewData(DoneMissions.value, 'DoneMissions')
      }
      if (
        _.some(missions.value, function (mission: Mission) {
          return mission.id === data.id
        })
      ) {
        await getNewData(missions.value, 'mission')
      }
    }

    // NOTE:ポジションのみが変更された時(縦方向のみの移動時)に全てのデータのポジションをサーバーのデータを取得して更新している
    const getNewData = async (arg: Mission[], key: string) => {
      await MissionRef()
        .get()
        .then((snapshots) => {
          snapshots.docChanges().forEach((snapshot) => {
            let newArray = [] as Mission[]
            const target = arg.map((mission) => {
              if (mission.id === snapshot.doc.data().id) {
                firestore
                  .collection('missions')
                  .doc(mission.id)
                  .collection('positions')
                  .doc(currentUser.uid)
                  .get()
                  .then((doc) => {
                    if (doc) {
                      mission.position = doc.data()?.position
                    } else {
                      mission.position = null
                    }
                    return mission
                  })
              }
              return mission
            })
            newArray = [...newArray, ...target]
            if (key === 'mission') {
              missions.value = newArray
            }
            if (key === 'DoneMissions') {
              DoneMissions.value = newArray
            }
            if (key === 'ProgressMissions') {
              ProgressMissions.value = newArray
            }
          })
        })
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
      // アイコン
      faPlusCircle,
    }
  },
})
</script>
