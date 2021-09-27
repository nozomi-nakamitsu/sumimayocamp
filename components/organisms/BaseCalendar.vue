<template>
  <v-app class="calendar-container">
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small> mdi-chevron-left </v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small> mdi-chevron-right </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
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
              color="grey lighten-4"
              min-width="350px"
              flat
              class="calendar-card"
              v-if="selectedEvent.user"
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
import MarkdownViewCard from '@/components/organisms/MarkdownViewCard.vue'
export default {
  components: {
    MarkdownViewCard,
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
  }),
  mounted() {
    this.$refs.calendar.checkChange()
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
  },
  computed: {
    path: function () {
      return function (postId) {
        return `posts/${postId}`
      }
    },
  },
}
</script>
