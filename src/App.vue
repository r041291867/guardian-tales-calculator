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
};
</script>
