<template>
  <BaseModal
    :control-flag="controlFlag"
    :title="targetUser ? `${targetUser.nickName}さんの投稿` : null"
    @click="$emit('click')"
  >
    <div class="form-container -modal -scrollx">
      <div v-for="post in propPosts" :key="post.id" class="items">
        <Card :post="post" />
      </div>
      <div v-if="!propPosts.left">投稿してないようです..</div>
    </div>
  </BaseModal>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from '@nuxtjs/composition-api'
import BaseModal from '@/components/atoms/BaseModal.vue'
import { Post, User } from '@/utilities/useConverter'
import Card from '@/components/organisms/PostCard.vue'

export default defineComponent({
  components: {
    BaseModal,
    Card,
  },
  props: {
    controlFlag: {
      type: Boolean,
      required: true,
    },
    posts: {
      type: Array as PropType<Post[]>,
      default: undefined,
    },
    user: {
      type: User,
      default: null,
    },
  },
  emits: ['click', 'created'],

  setup(props) {
    const propPosts = ref<Post[]>([])
    const targetUser = ref<User | null>(null)

    watch(
      () => props.posts,
      () => {
        propPosts.value = [...props.posts]
      }
    )
    watch(
      () => props.user,
      () => {
        targetUser.value = props.user
      }
    )

    return {
      propPosts,
      targetUser,
    }
  },
})
</script>
