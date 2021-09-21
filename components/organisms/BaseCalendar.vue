<template>
  <v-calendar :attributes="attributes" />
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  useRouter,
  useStore,
  ref,
  watch,
} from '@nuxtjs/composition-api'
import { Post, CalendarData } from '@/types/props-types'

export default defineComponent({
  props: {
    posts: {
      type: Array as () => Array<Post>,
      required: true,
    },
  },

  setup(props) {
    // compositionAPI
    const store = useStore()
    // ref系
    const currentUser = store.getters.getCurrentUser
    const calenderDatas = ref<CalendarData[]>([])
    watch(
      () => props.posts,
      () => {
        const target = props.posts.map((post: Post) => {
          return {
            post: post,
            color: 'red',
            user: post.user,
          }
        })
        calenderDatas.value = [...target]
      }
    )

    const attributes = computed(() => {
      return [
        // Attributes for calenderDatas
        ...calenderDatas.value.map((calenderData) => ({
          dates: calenderData.post.updated_at.toDate(),
          dot: {
            color: calenderData.color,
          },
          popover: {
            label: calenderData.post.title,
            visibility: 'click',
          },
          customData: calenderData,
        })),
      ]
    })

    return {
      calenderDatas,
      attributes,
    }
  },
})
</script>
