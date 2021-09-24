<template>
  <div class="card-container -blue">
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
      <div class="footer">
        <div class="emoji">
          <v-btn
            v-if="!isMyMission(mission)"
            elevation="2"
            @click="joinMission(mission)"
            >私がやる！</v-btn
          >
          <v-btn v-if="isMyMission(mission)" elevation="2" disabled
            >挑戦中！！</v-btn
          >

          <v-chip
            v-if="isMyMission(mission)"
            class="ma-2 common-chip"
            :class="missionLabelColor(mission, currentUser.uid)"
            @click="changeStatus(mission)"
            >{{ missionLabelText(mission, currentUser.uid) }}</v-chip
          >
          <div v-for="(status, index) in mission.status" :key="index">
            <v-chip
              class="ma-2 common-chip"
              :class="missionLabelColor(mission, status.uid)"
              >{{ status.nickName }}</v-chip
            >
            <!-- <v-list-item-title
              style="cursor: pointer"
              @click="DeleteMission(mission.id, mission.files)"
              >削除</v-list-item-title
            > -->
          </div>
        </div>
        <div v-if="isSendUser(mission)" class="button">
          <BaseSquareButton />
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="card-container">
    <v-card class="mx-auto" width="500">
      <div style="display: flex">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            alt=""
            :src="mission.sendUser.photoURL"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            >{{
              mission.sendUser.nickName
                ? mission.sendUser.nickName
                : mission.sendUser.displayName
            }}からの挑戦状</v-list-item-title
          >
        </v-list-item-content>
      </div>

      <v-card-title>
        <span class="text-h6 font-weight-light">
          タイトル: {{ mission.title }}</span
        >
      </v-card-title>
      <v-card-text class="text-h5 font-weight-bold">
        {{ mission.content }}
      </v-card-text>
      <v-card-text class="text-h5 font-weight-bold">
        <v-btn
          v-if="!isMyMission(mission)"
          elevation="2"
          @click="joinMission(mission)"
          >私がやる！</v-btn
        >
        <v-btn v-if="isMyMission(mission)" elevation="2" disabled
          >挑戦中！！</v-btn
        >

        <v-chip
          v-if="isMyMission(mission)"
          class="ma-2 common-chip"
          :class="missionLabelColor(mission, currentUser.uid)"
          @click="changeStatus(mission)"
          >{{ missionLabelText(mission, currentUser.uid) }}</v-chip
        >
      </v-card-text>
      <v-card-text class="text-h5 font-weight-bold" style="display: flex">
        <div v-for="(status, index) in mission.status" :key="index">
          <v-chip
            class="ma-2 common-chip"
            :class="missionLabelColor(mission, status.uid)"
            >{{ status.nickName }}</v-chip
          >
        </div>
      </v-card-text>
      <v-card-text class="text-h5 font-weight-bold">
        {{ formatDateToSlashWithTime(mission.updated_at) }}
      </v-card-text>
      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-content
            v-if="isCurrentUser(mission.sendUser.uid, currentUser)"
          >
            <v-list-item-title
              style="cursor: pointer"
              @click="UpdateMission(mission)"
              >編集</v-list-item-title
            >
          </v-list-item-content>
          <v-list-item-content
            v-if="isCurrentUser(mission.sendUser.uid, currentUser)"
          >
            <v-list-item-title
              style="cursor: pointer"
              @click="DeleteMission(mission.id, mission.files)"
              >削除</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </div> -->
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
import BaseSquareButton from '@/components/atoms/BaseSquareButton.vue'
import { firestore } from '@/plugins/firebase.js'
import { isCurrentUser } from '@/compositions/useAuth'

export default defineComponent({
  components: {
    BaseSquareButton,
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
    // ログインユーザーを挑戦者として登録する
    const joinMission = async (mission: Mission) => {
      const data = { ...mission }
      data.status = [
        ...data.status,
        {
          uid: currentUser.uid,
          nickName: currentUser.nickName,
          status: false,
        },
      ]
      try {
        await firestore.collection('missions').doc(mission.id).update(data)
      } catch (error) {
        console.error(error)
      }
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
    // 挑戦しているユーザーごとのミッションのステータスに応じてラベルの色を変更する
    const missionLabelColor = computed(
      () =>
        (mission: Mission, uid: string): string => {
          const target = _.find(mission.status, function (item: MissionStatus) {
            return item.uid === uid
          }) as MissionStatus
          return target.status ? '-blue' : '-white'
        }
    )
    // 挑戦しているユーザーごとのミッションのステータスに応じてラベルの文字を変更する
    const missionLabelText = computed(
      () =>
        (mission: Mission, uid: string): string => {
          const target = _.find(mission.status, function (item: MissionStatus) {
            return item.uid === uid
          }) as MissionStatus
          return target.status ? 'すみマヨ' : 'まだマヨ'
        }
    )
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
      joinMission,
      isMyMission,
      missionLabelColor,
      changeStatus,
      missionLabelText,
      isSendUser,
    }
  },
})
</script>
