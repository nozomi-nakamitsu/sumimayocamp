<template>
  <v-app class="calendar-container">
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64" class="calendar-top">
          <v-toolbar flat class="toolbar">
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small> mdi-chevron-left </v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small> mdi-chevron-right </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>

            <BaseUserSelectBox @on-selected="onSelected" @on-reset="onReset" />
          </v-toolbar>
        </v-sheet>
        <v-sheet height="500">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="#E3E3FF"
            :events="events"
            :event-color="getEventColor"
            type="month"
            @click:event="showEvent"
            @click:more="clickMore"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <div>
              <div class="header"></div>
            </div>
            <v-card
              v-if="selectedEvent.user"
              color="grey lighten-4"
              min-width="350px"
              flat
              class="calendar-card"
            >
              <div :color="selectedEvent.color" class="toolbar">
                <div v-if="selectedEvent.user" class="image">
                  <img :src="selectedEvent.user.photoURL" alt="" class="img" />
                </div>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              </div>

              <NuxtLink :to="path(selectedEvent.id)">
                <MarkdownViewCard :content="selectedEvent.content" />
              </NuxtLink>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
import dayjs from 'dayjs'
import _ from 'lodash'
import MarkdownViewCard from '@/components/organisms/MarkdownViewCard.vue'
import BaseUserSelectBox from '@/components/molecules/BaseUserSelectBox.vue'

export default {
  components: {
    MarkdownViewCard,
    BaseUserSelectBox,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
    currentUser: {
      type: Object | undefined,
      required: true,
    },
  },
  data: () => ({
    focus: '',
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: [
      'blue',
      'indigo',
      'deep-purple',
      'cyan',
      'green',
      'orange',
      'grey darken-1',
    ],
    moreEvents: [],
    moreClick: false,
  }),
  computed: {
    path () {
      return function (postId) {
        return `posts/${postId}`
      }
    },
  },
  watch: {
    posts(newPosts) {
      this.posts = newPosts
      this.events = this.posts.map((post) => ({
        ...post,
        name: post.title,
        start: post.updated_at.toDate().getTime(),
        color: post.user_id === this.currentUser.uid ? '#ff9a8f' : '#99d3ff',
        timed: false,
      }))
    },
  },
  mounted() {
    this.$refs.calendar.checkChange()
  },
  methods: {
    viewDay({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = ''
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        )
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    onSelected(uid) {
      const targetPosts = this.posts.filter((post) => post.user_id === uid)
      this.events = targetPosts.map((post) => ({
        ...post,
        name: post.title,
        start: post.updated_at.toDate().getTime(),
        color: post.user_id === this.currentUser.uid ? '#ff9a8f' : '#99d3ff',
        timed: false,
      }))
    },
    onReset() {
      this.events = this.posts.map((post) => ({
        ...post,
        name: post.title,
        start: post.updated_at.toDate().getTime(),
        color: post.user_id === this.currentUser.uid ? '#ff9a8f' : '#99d3ff',
        timed: false,
      }))
    },
    clickMore(event) {
      this.moreClick = true
      this.moreEvents = this.events.filter((v) => {
        const date = v.updated_at.toDate()
        const formatDate = dayjs(date).format('YYYY-MM-DD')
        return formatDate === event.date
      })

      this.moreEvents = _.sortBy(this.moreEvents, 'updated_at')

      this.moreEvents = _.tail(this.moreEvents)

    },
  },
}
</script>
