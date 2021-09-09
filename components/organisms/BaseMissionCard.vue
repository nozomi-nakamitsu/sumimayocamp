<template>
  <div class="card-container">
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
      <!-- <v-card-text class="text-h5 font-weight-bold">
        {{ mission.content }}
      </v-card-text> -->
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
              @click="DeleteMission(mission.id)"
              >削除</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  useRouter,
  useStore,
} from '@nuxtjs/composition-api'
import { Mission } from '@/types/props-types'
import { formatDateToSlashWithTime } from '@/compositions/useFormatData'

import { firestore } from '@/plugins/firebase.js'
import { isCurrentUser } from '@/compositions/useAuth'

export default defineComponent({
  components: {},
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
    const mission = computed(() => props.propMission)

    const DeleteMission = async (id: string) => {
      try {
        await firestore.collection('missions').doc(id).delete()
      } catch (error) {
        console.error(error)
      }
    }
    const UpdateMission = async (data: Mission) => {
      ctx.emit('update', data)
    }
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
    }
  },
})
</script>
