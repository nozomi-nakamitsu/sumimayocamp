<template>
  <v-card class="mx-auto" color="#26c6da" dark max-width="400">
    <v-card-title>
      <span class="text-h6 font-weight-light"> タイトル: {{ post.title }}</span>
    </v-card-title>
    <v-card-text class="text-h5 font-weight-bold">
      内容: {{ post.content }}
    </v-card-text>
    <v-card-text class="text-h5 font-weight-bold">
      url: {{ post.url }}
    </v-card-text>
    <v-card-text class="text-h5 font-weight-bold">
      movieurl: {{ post.movieurl }}
    </v-card-text>
    <v-card-text class="text-h5 font-weight-bold">
      id: {{ post.id }}
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            alt=""
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Evan You</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-title>編集</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-title>削除</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-title>詳細</v-list-item-title>
        </v-list-item-content>

      </v-list-item>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { Post } from '../../types/props-types'
export default defineComponent({
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
  },

  setup() {
    return {}
  },
})
</script>
