<template>
  <div>
    <p style="font-size: 1.2rem">挑戦状から選択</p>
    <v-container fluid>
      <v-row align="center">
        <v-col style="padding: 8px 0">
          <v-select
            v-model="selectedMissions"
            item-text="title"
            :items="missions"
            return-object
            attach
            chips
            label="挑戦状から選択"
            multiple
            solo
            @blur="onSelected()"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  onBeforeUnmount,
} from '@nuxtjs/composition-api'
import { firestore } from '@/plugins/firebase'
import { Mission } from '@/types/props-types'

// バリデーション周り

export default defineComponent({
  emits: ['on-selected'],
  setup(_, ctx) {
    const selectedMissions = ref<Mission[]>([])
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
              } else if (change.type === 'removed') {
                missions.value = missions.value.filter(
                  (v: Mission) => v.id !== change.doc.data().id
                )
              } else if (change.type === 'modified') {
                const removeBeforeData = missions.value.filter(
                  (v: Mission) => v.id !== change.doc.data().id
                )
                const missionData = change.doc.data() as Mission
                missions.value = [missionData, ...removeBeforeData]
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
    const onSelected = () => {
      ctx.emit('on-selected', selectedMissions.value)
    }
    return {
      selectedMissions,
      missions,
      onSelected,
    }
  },
})
</script>
