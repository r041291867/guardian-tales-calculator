<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        守望傳說計算機
      </div>

      <v-spacer></v-spacer>

      <v-btn
        icon
        class="hidden-lg-and-up"
        @click="$store.commit('toggleDrawer')"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <guardian-base style="height: 100%;"/>
    </v-main>
  </v-app>
</template>

<script>
import GuardianBase from './components/Base';

export default {
  name: 'App',

  components: {
    GuardianBase,
  },

  data: () => ({
    //
  }),

  computed: {
    drawer: {
      get () {
        return this.$store.state.drawer
      },
      set () {
        this.$store.commit('toggleDrawer')
      },
    },
  }
};
</script>
