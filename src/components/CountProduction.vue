<template>
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
      :style="`height: ${viewHeight}px;position: fixed; overflow: scroll; width: 57%`"
      class="hidden-md-and-down"
    >
      <div
        v-for="i in counts"
        :key="i"
        style="padding: 10px;"
      >
        <team
          :num="i"
          :data="allData[i-1]"
          @change="getValue"
        />
      </div>
    </div>


    <div
      :style="`height: ${viewHeight}px;position: fixed; overflow: scroll;width: 95%`"
      class="hidden-lg-and-up"
    >
      <div
        v-for="i in counts"
        :key="i"
        style="padding: 10px;"
      >
        <team
          :num="i"
          :data="allData[i-1]"
          @change="getValue"
          class="hidden-sm-and-down"
        />

        <team-mobile
          :num="i"
          :data="allData[i-1]"
          @change="getValue"
          class="hidden-md-and-up"
        />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
      Team: () => import('./Team'),
      TeamMobile: () => import('./TeamMobile'),
    },

    data: () => ({
      counts: 1,
      totalPoints: [0],
      sumPoint: 0,
      allData: [[]],
      viewHeight: document.documentElement.clientHeight - 134,
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
        this.$emit('change', this.sumPoint)
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
      window.addEventListener('resize', ()=> {
        this.viewHeight = document.documentElement.clientHeight - 134
      })
      let cache = localStorage.getItem('data')
      let points = localStorage.getItem('total')
      if (cache) {
        this.allData = JSON.parse(cache)
        this.counts = this.allData.length
      }
      if (points) {
        this.totalPoints = JSON.parse(points)
      }
    }
  }
</script>