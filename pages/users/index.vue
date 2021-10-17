<template>
  <div class="common-container">
    <div class="title">
      <p class="text">Members List</p>
      <div class="line"></div>
    </div>
    <div class="member-list-container">
      <div v-for="user in allUsers" :key="user.uid">
        <MemberCard :user="user" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from '@nuxtjs/composition-api'
import MemberCard from '@/components/organisms/MemberCard.vue'
import { UsersRef } from '@/utilities/useFirestore'
import { User } from '@/utilities/useConverter'

export default defineComponent({
  components: {
    MemberCard,
  },
  setup() {
    const allUsers = ref<User[]>([])
    // ユーザー一覧データを取得する
    onBeforeMount(() => {
      UsersRef()
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            allUsers.value = [...allUsers.value, doc.data()]
          })
        })
    })
    return {
      allUsers
    }
  },
})
</script>
