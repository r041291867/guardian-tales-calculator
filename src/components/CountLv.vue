<template>
  <v-card
    elevation="1"
  >
    <v-card-title>
      Total
    </v-card-title>

    <v-divider></v-divider>

    <div>
      <v-row>
        <v-col>
          <!-- 左邊標題 -->
          <div
            v-for="col in cols"
            :key="col"
            class="content"
            style="text-align: right;"
          >
            {{ col }}
          </div>
        </v-col>
        <v-col>
          <div
            class="content"
            style="text-align: center;"
          >
            <input
              v-model="current_level"
              style="text-align: center;"
              type="number"
            />
          </div>
          <div
            class="content"
            style="text-align: center;"
          >
            <input
              v-model="current_point"
              style="text-align: center;"
              type="number"
            />
          </div>
          <div
            class="content"
            style="text-align: center;"
          >
            <input
              v-model="target_level"
              style="text-align: center;"
              type="number"
            />
          </div>
          <div
            class="content"
            style="text-align: center;"
          >
            {{ target_point }}
          </div>
          <div
            class="content"
            style="text-align: center;"
          >
            {{ current_time | dateFormat }}
          </div>
          <div
            class="content"
            style="text-align: center;"
          >
            {{ achieve_time | dateFormat }}
          </div>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      cols: [
        '目前守護者等級', '目前守護者點數', '目標守護者等級', '需求守護者點數', '目前時間', '達成時間'
      ],
      current_level: 0,
      current_point: 0,
      target_level: 0,
      current_time: new Date(),
      timer: 0,
    }),

    props: {
      total: {
        type: Number,
        default: 0,
      },
      level: {
        type: [Number,String],
        default: 0,
      },
      points: {
        type: [Number,String],
        default: 0,
      },
      target: {
        type: [Number,String],
        default: 0,
      },
    },

    computed: {
      target_point() {
        this.$emit('change', this.current_level, this.current_point, this.target_level)
        return this.totalExp(this.target_level) - this.totalExp(this.current_level) - this.current_point
      },
      achieve_time() {
        const now = this.current_time.getTime()
        // 每小時生產量轉換為每秒生產量
        const perSec = this.total/3600
        // 計算總共需花多少秒
        const totalMiliSec = (this.target_point/perSec) * 1000

        return now + totalMiliSec
      }
    },

    filters: {
      dateFormat(date) {
        let d = new Date(date)
        const strDate = function(value){
          return value<10 ? '0'+value : value;
        };
        const year = d.getFullYear()
        const month = strDate(d.getMonth() + 1)
        const day = strDate(d.getDate())
        const hour = strDate(d.getHours())
        const minutes = strDate(d.getMinutes())
        const second = strDate(d.getSeconds())
        return `${year}-${month}-${day} ${hour}:${minutes}:${second}`
      }
    },

    methods: {
      countExp(level) {
        let base = 700, growth = 175
        if (level <= 100) {
          return base * level
        }
        else {
          // 無條件進位
          let m = Math.ceil((level - 100)/25)
          let sum = (num) => {
            return (1+num)*num/2
          }
          return base * level + m * growth * (level - (100+(m-1)*25)) + 25 * sum(m-1) * growth
        }
      },
      totalExp(level) {
        let total = 0
        for (let i=0; i<level; i++) {
          total += this.countExp(i)
        }
        return total
      }
    },

    mounted() {
      this.current_level = this.level
      this.current_point = this.points
      this.target_level = this.target

      this.timer = setInterval(() => {
        this.current_time = new Date(); // 修改数据date
      }, 1000)
    },

    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      }
    },
  }
</script>