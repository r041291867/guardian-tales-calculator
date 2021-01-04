<template>
  <v-card
    elevation="1"
  >
    <v-card-title>
      Team {{ num }}
      <v-spacer></v-spacer>
      <span class="text-subtitle-1">
        每小時生產
        <strong style="color: red;">{{ totalPoints }}</strong>
      </span>
    </v-card-title>

    <div
      v-for="(char, char_index) in datas"
      :key="`key-${char_index}`"
    >
      <v-divider></v-divider>
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
            v-for="(key, index) in Object.keys(char)"
            :key="key+index"
            class="content"
            style="text-align: center;"
          >
            <div
              v-if="index == 0"
            >
              <!-- <span>
                {{ char[key] }}
              </span> -->
              <input
                v-model="char[key]"
                style="text-align: center; width: 60%;"
                type="text"
              >
            </div>
            <div v-else-if="index == 1">
              <v-btn-toggle
                v-model="char[key]"
                tile
                color="primary"
                group
                dense
              >
                <v-btn
                  small
                  :value="2"
                >
                  2星
                </v-btn>
                <v-btn
                  small
                  :value="3"
                >
                  3星
                </v-btn>
              </v-btn-toggle>
            </div>
            <div v-else-if="index == 4">
              <v-btn-toggle
                v-model="char[key]"
                tile
                color="primary"
                group
                dense
              >
                <v-btn
                  small
                  :value="0"
                >
                  無
                </v-btn>
                <v-btn
                  small
                  :value="1"
                >
                  有
                </v-btn>
              </v-btn-toggle>
            </div>
            <div v-else>
              <v-btn
                icon
                small
                @click="minus(char_index, key)"
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>

              {{ char[key] }}

              <v-btn
                icon
                small
                @click="add(char_index, key)"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
          </div>
          <div
            class="content"
            style="text-align: center;"
          >
            <strong>
              {{ countPoints(char) }}
            </strong>
          </div>
        </v-col>
      </v-row>
    </div>

  </v-card>
</template>

<style>
  .content {
    height: 40px;
    line-height: 40px;
    padding: 5px;
  }
</style>

<script>
  export default {
    data: () => ({
      cols: [
        '', '原生星數', '目前星數', '突破數', '是否有專武', '專武突破數', '生產點數'
      ],
      datas: [],
    }),

    props: {
      num: {
        type: [Number, String],
        default: 1,
      },
      data: {
        type: Array,
        default: () => [],
      }
    },

    computed: {
      totalPoints() {
        let total = 0
        for (let d of this.datas) {
          total += this.countPoints(d)
        }
        this.$emit('change', total, this.num, this.datas)
        return total
      },
    },

    methods: {
      add(char, key) {
        if (this.datas[char][key] < 5) this.datas[char][key]++
      },
      minus(char, key) {
        if (this.datas[char][key] > 0) this.datas[char][key]--
      },
      countPoints({rarity, grade, limit_break, special_weapon, weapon_limit_break}) {
        // IF(B4=2, 30+ (B5-B4)*3 + B6*6 + 30*B7 + B8*6 , 300+(B5-B4)*60+B6*60+B7*300+B8*60)
        if (rarity === 2) {
          return 150 + (grade - rarity)*21 + limit_break*30 + special_weapon*150 + weapon_limit_break*30
        }
        else if (rarity === 3) {
          return 300 + (grade - rarity)*60 + limit_break*60 + special_weapon*300 + weapon_limit_break*60
        }
      },
    },

    mounted() {
      if (this.data.length > 0) {
        this.data.forEach(char => {
          this.datas.push({
            title: char.title,
            rarity: char.rarity,
            grade: char.grade,
            limit_break: char.limit_break,
            special_weapon: char.special_weapon,
            weapon_limit_break: char.weapon_limit_break,
          })
        })
      }
      else {
        for (let i=0;i<4;i++) {
          this.datas.push({
            title: '角色' + (i+1),
            rarity: 3,
            grade: 5,
            limit_break: 0,
            special_weapon: 0,
            weapon_limit_break: 0,
          })
        }
      }
    }
  }
</script>