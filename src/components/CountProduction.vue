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

    <!-- PC寬度 -->
    <div
      :style="`height: ${viewHeight}px;position: fixed; overflow: scroll; width: 57%`"
      v-if="viewWidth>=1280"
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

    <!-- 平板寬度 -->
    <div
      :style="`height: ${viewHeight}px;position: fixed; overflow: scroll;width: 95%`"
      v-else-if="viewWidth>=660"
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

    <!-- 手機 -->
    <div
      :style="`height: ${viewHeight}px;position: fixed; overflow: scroll;width: 95%`"
      v-else
    >
      <v-tabs
        v-model="tab"
        center-active
        show-arrows
      >
        <v-tab
          v-for="i in counts"
          :key="i"
        >
          Team {{ i }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="i in counts"
          :key="i"
          style="padding: 10px;"
        >
          <team-mobile
            :num="i"
            :data="allData[i-1]"
            @change="getValue"
            class="hidden-sm-and-up"
          />
        </v-tab-item>
      </v-tabs-items>
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
      tab: 0,
      counts: 1,
      totalPoints: [0],
      sumPoint: 0,
      allData: [[]],
      viewHeight: document.documentElement.clientHeight - 134,
      viewWidth: document.documentElement.clientWidth,
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
        this.viewWidth = document.documentElement.clientWidth
        console.log(this.viewWidth)
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