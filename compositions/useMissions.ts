import { ref, useStore, watch } from '@nuxtjs/composition-api'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import {
  FileArray,
  MissionPost,
  Mission,
  MissionStatus,
} from '@/types/props-types'
import { firestore } from '@/plugins/firebase.js'

export const useMissions = (props: any) => {
  const store = useStore()
  const isLoading = ref<boolean>(false)
  const currentUser = store.getters.getCurrentUser
  const missionForm = ref<MissionPost>({
    id: '',
    title: '',
    content: '',
    created_at: new Date(),
    updated_at: new Date(),
    sendUser: { ...currentUser },
    receiveUser: [],
    files: [],
    status: [],
  })

  const files = ref<FileArray[]>(missionForm.value.files)
  watch(
    () => missionForm.value.files,
    () => {
      files.value = [...missionForm.value.files]
    }
  )

  watch(
    () => props.defaultData,
    () => {
      if (!props.defaultData) {
        missionForm.value = {
          id: '',
          title: '',
          content: '',
          created_at: new Date(),
          updated_at: new Date(),
          sendUser: { ...currentUser },
          receiveUser: [],
          files: [],
          status: [],
        }
        return
      }
      missionForm.value = { ...props.defaultData }
    }
  )
  const fileChanged = async (file: any) => {
    isLoading.value = true
    const id = uuidv4()
    try {
      const url = await store.dispatch('uploadFile', {
        file,
        id,
      })
      const reg = new RegExp('\\([.\\d]+?\\)', 'g')
      missionForm.value.content = file.content.replace(reg, `(${url}})`)
      document
        .querySelector('.auto-textarea-input')
        ?.classList.remove('-hidden')
      document.querySelector('.v-note-show')?.classList.remove('-hidden')
      files.value = [...files.value, { id, url }]
    } catch (error) {
      console.error('file upload', error)
    } finally {
      isLoading.value = false
    }
  }
  /**
   * 投稿してないファイルがあればstorageから削除
   */
  const deleteUnNecessaryFiles = () => {
    files.value.map((file) => {
      const id = file.id
      return store.dispatch('deleteFile', {
        id,
      })
    })
  }

  // ログインユーザーを挑戦者として未処理のステータスで登録する
  const joinMissionAsProgress = async (mission: Mission) => {
    const data = { ...mission }

    data.status = _.filter(data.status, function (status: MissionStatus) {
      return status.uid !== currentUser.uid
    })

    data.status = [
      ...data.status,
      {
        uid: currentUser.uid,
        nickName: currentUser.nickName,
        photoURL: currentUser.photoURL,
        status: false,
      },
    ]
    try {
      await firestore.collection('missions').doc(mission.id).update(data)
    } catch (error) {
      console.error(error)
    }
  }
  // ログインユーザーを挑戦者として完了ののステータスで登録する
  const joinMissionAsDone = async (mission: Mission) => {
    const data = { ...mission }

    data.status = _.filter(data.status, function (status: MissionStatus) {
      return status.uid !== currentUser.uid
    })
    data.status = [
      ...data.status,
      {
        uid: currentUser.uid,
        nickName: currentUser.nickName,
        photoURL: currentUser.photoURL,
        status: true,
      },
    ]

    try {
      await firestore.collection('missions').doc(mission.id).update(data)
    } catch (error) {
      console.error(error)
    }
  }
  // ログインユーザーを挑戦者として登録を解除する
  const leaveMission = async (mission: Mission) => {
    const data = { ...mission }
    data.status = _.filter(data.status, function (status) {
      return status.uid !== currentUser.uid
    })

    try {
      await firestore.collection('missions').doc(mission.id).update(data)
    } catch (error) {
      console.error(error)
    }
  }

  // 順番を入れ替えた時に発火する
  const changePosition = (index: number, missions: Mission[]) => {
    const deleteList = missions.splice(index, 1)
    missions.splice(index, 0, deleteList[0])
    missions.map(async (list, index) => {
      try {
        await firestore
          .collection('missions')
          .doc(list.id)
          .collection('positions')
          .doc(currentUser.uid)
          .set({ position: index + 1 })
      } catch (error) {
        console.error(error)
      }
    })
  }
  // 表示配列をユーザーごとのposition順にソートする
  const sortMissions = (missions: Mission[]) => {
    missions.sort(sortFunc)
    return missions.sort(sortFunc)
  }
  const sortFunc = (missionA: Mission, missionB: Mission) => {
    if (missionA.position == null && missionB.position == null) return 0
    if (missionA.position == null) return 1
    if (missionB.position == null) return -1
    if (missionA.position < missionB.position) {
      return -1
    }
    if (missionA.position > missionB.position) {
      return 1
    }
    return 0
  }

  return {
    isLoading,
    fileChanged,
    files,
    missionForm,
    currentUser,
    deleteUnNecessaryFiles,
    joinMissionAsProgress,
    joinMissionAsDone,
    leaveMission,
    changePosition,
    sortMissions,
  }
}
