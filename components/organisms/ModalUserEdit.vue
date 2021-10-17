<template>
  <BaseModal :control-flag="controlFlag" :title="title" @click="$emit('click')">
    <div class="form-container -modal">
      <!-- TODO: style実装時にフォームのコンポーネントに分ける -->
      <ValidationObserver ref="obs" v-slot="{ handleSubmit, invalid }">
        <form class="form-area" @submit.prevent="handleSubmit(submit)">
          <ValidationInput
            label="ニックネーム"
            input-name="nickName"
            rules="required"
            class="nameinput"
            :set-value="form.nickName"
            @input="change($event, 'nickName')"
          ></ValidationInput>
          <div class="submit">
            <button class="common-button -cancel" @click="cancel">
              Cancel
            </button>
            <input
              type="submit"
              class="common-button -modal -ml40"
              title="変更する"
              :disabled="invalid"
              :class="invalid"
              value="Submit!"
            />
          </div>
        </form>
      </ValidationObserver>
    </div>
  </BaseModal>
</template>

<script lang="ts">
import { defineComponent, useStore, ref } from '@nuxtjs/composition-api'
import ValidationInput from '../molecules/form/ValidationInput.vue'

import BaseModal from '@/components/atoms/BaseModal.vue'
export default defineComponent({
  components: {
    BaseModal,

    ValidationInput,
  },
  props: {
    controlFlag: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  emits: ['click'],

  setup(_, ctx) {
    // vuex
    const store = useStore()
    // ref系
    const currentUser = store.getters.getCurrentUser
    const form = ref({
      token: currentUser.token,
      uid: currentUser.uid,
      photoURL: currentUser.photoURL,
      displayName: currentUser.displayName,
      nickName: currentUser.nickName,
    })
    const submit = async () => {
      form.value.token = currentUser.token
      form.value.uid = currentUser.uid
      form.value.photoURL = currentUser.photoURL
      form.value.displayName = currentUser.displayName
      try {
        await store.dispatch('editNickName', form.value)
        ctx.emit('click')
      } catch (error) {
        store.dispatch('onRejectted', error)
      }
    }

    // NOTE: 入力した値を親コンポーネントに渡す
    const change = (event: InputEvent) => {
      form.value.nickName = event
    }
    const cancel = () => {
      form.value.nickName = currentUser.nickName
      ctx.emit('click')
    }
    return {
      submit,
      store,
      form,
      currentUser,
      change,
      cancel,
    }
  },
})
</script>
