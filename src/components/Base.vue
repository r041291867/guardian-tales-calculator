<template>
  <v-row justify="center">
    <v-col class="grey lighten-4" cols="7">
      <div style="padding: 10px;">
        <v-row>
          <v-spacer />

          <span class="pa-1">
            總產量
            <strong class="pa-1">
              {{ sumPoint }}
            </strong>
            /小時
          </span>

          <v-spacer />

          <span class="pa-1">
            當前隊伍數量：{{ counts }}
          </span>

          <v-btn
            color="error"
            icon
            @click="minus"
          >
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <v-btn
            color="primary"
            icon
            @click="add"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-row>

        <div
          v-for="i in counts"
          :key="i"
          style="padding: 10px;"
        >
          <team-base
            :num="i"
            @change="getValue"
          />
        </div>
      </div>
    </v-col>
    <v-col style="background-color: #333;" cols="5">
      <div style="padding: 10px; position: fixed; width: 40%;">
        <count-lv
          :total="sumPoint"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    components: {
      TeamBase: () => import('./TeamBase'),
      CountLv: () => import('./CountLv')
    },

    data: () => ({
      counts: 1,
      totalPoints: [0],
      sumPoint: 0,
    }),

    methods: {
      add() {
        this.counts++
        this.totalPoints.push(0)
      },
      minus() {
        if (this.counts > 1) {
          this.counts--
          this.totalPoints.pop()
        }
      },
      getValue(total, num) {
        this.totalPoints[num-1] = total
        // console.log(this.totalPoints)
        this.sumPoint = this.sum()
      },
      sum() {
        let sum = 0
        this.totalPoints.forEach(val => {
          sum += val
        })
        return sum
      },
    },
  }
</script>