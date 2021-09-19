<template>
  <v-calendar :attributes="attributes" />
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  useRouter,
  useStore,
} from '@nuxtjs/composition-api'
import { Picker } from 'emoji-mart-vue'
import Emojifrom from '../molecules/EmojiItems.vue'
import { Post } from '@/types/props-types'
// import { formatDateToSlashWithTime } from '@/compositions/useFormatData'
// import { useEmoji } from '@/compositions/useEmoji'
// import { usePost } from '~/compositions/usePost'
// import { isCurrentUser } from '@/compositions/useAuth'

export default defineComponent({
  // props: {
  //   post: {
  //     type: Object as PropType<Post>,
  //     required: true,
  //   },
  // },

  setup(props) {
    // compositionAPI
    const Router = useRouter()
    const store = useStore()
    // ref系
    const currentUser = store.getters.getCurrentUser
    const todos = [
      {
        description: 'Take Noah to basketball practice.',
        isComplete: false,
        dates: { weekdays: 6 }, // Every Friday
        color: 'red',
      },
    ]
    const attributes = computed(() => {
      return [
        // Attributes for todos
        ...todos.map((todo) => ({
          dates: todo.dates,
          dot: {
            color: todo.color,
            class: todo.isComplete ? 'opacity-75' : '',
          },
          popover: {
            label: todo.description,
          },
          customData: todo,
        })),
      ]
    })

    return {
      todos,
      attributes,
    }
  },
})
</script>
