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
            :data="allData[i-1]"
            @change="getValue"
          />
        </div>
      </div>
    </v-col>
    <v-col style="background-color: #333;" cols="5">
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
      allData: [[]],
      cal_data: {},
    }),

    methods: {
      add() {
        this.counts++
        this.totalPoints.push(0)
        this.allData.push([])
      },
      minus() {
        if (this.counts > 1) {
          this.counts--
          this.totalPoints.pop()
          this.allData.pop()
        }
      },
      getValue(total, num, datas) {
        this.totalPoints[num-1] = total
        this.allData[num-1] = datas
        this.sumPoint = this.sum()
        localStorage.setItem('data', JSON.stringify(this.allData))
        localStorage.setItem('total', JSON.stringify(this.totalPoints))
      },
      saveData(current_level, current_point, target_level) {
        const save = {
          current_level,
          current_point,
          target_level,
        }
        localStorage.setItem('cal', JSON.stringify(save))
      },
      sum() {
        let sum = 0
        this.totalPoints.forEach(val => {
          sum += val
        })
        return sum
      },
    },

    mounted() {
      let cache = localStorage.getItem('data')
      let points = localStorage.getItem('total')
      if (cache) {
        this.allData = JSON.parse(cache)
        this.counts = this.allData.length
      }
      if (points) {
        this.totalPoints = JSON.parse(points)
      }

      let calculate = localStorage.getItem('cal')
      if (calculate) {
        this.cal_data = JSON.parse(calculate)
      }
    }
  }
</script>