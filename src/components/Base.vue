<template>
  <v-row justify="center">
    <v-col
      class="grey lighten-4"
      md="12"
      lg="7"
    >
      <count-production
        @change="getSum"
      />
    </v-col>
    <v-col
      style="background-color: #333;"
      md="12"
      lg="5"
      class="hidden-md-and-down"
    >
      <div style="padding: 10px; position: fixed; width: 40%;">
        <count-lv
          :total="sumPoint"
          :level="cal_data.current_level"
          :points="cal_data.current_point"
          :target="cal_data.target_level"
          @change="saveData"
        />
      </div>
    </v-col>

    <v-bottom-sheet
      v-model="$store.state.drawer"
    >
      <count-lv
        :total="sumPoint"
        :level="cal_data.current_level"
        :points="cal_data.current_point"
        :target="cal_data.target_level"
        @change="saveData"
      />
    </v-bottom-sheet>
  </v-row>
</template>

<script>
  export default {
    components: {
      CountProduction: () => import('./CountProduction'),
      CountLv: () => import('./CountLv')
    },

    data: () => ({
      sumPoint: 0,
      cal_data: {},
      absolute: true,
      overlay: false,
      sheet: false,
    }),

    methods: {
      getSum(sum) {
        this.sumPoint = sum
      },
      saveData(current_level, current_point, target_level) {
        const save = {
          current_level,
          current_point,
          target_level,
        }
        localStorage.setItem('cal', JSON.stringify(save))
      },
    },

    mounted() {
      let calculate = localStorage.getItem('cal')
      if (calculate) {
        this.cal_data = JSON.parse(calculate)
      }
    }
  }
</script>