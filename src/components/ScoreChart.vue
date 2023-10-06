<template>
  <div class="flex flex-col items-center justify-center gap-6 pr-2 md:flex-row">
    <div class="score-chart-wrapper flex-1">
      <div
        :style="`height: ${size}px`"
        class="score-chart-svg-wrapper select-none">
        <svg
          :style="gaugeStyle"
          viewBox="0 0 120 120">
          <circle
            class="opacity-40"
            :r="circleRadius"
            cx="60"
            cy="60"
            stroke-width="5" />
          <template
            v-for="(label, indexLabel) in strokeLabels"
            :key="indexLabel">
            <template
              v-for="(stroke, index) in strokes[label]"
              :key="index">
              <circle
                v-if="displayScore !== '?'"
                class="circle-stroke z-10 opacity-20"
                :class="`stroke-${stroke.color}`"
                r="56"
                cx="60"
                cy="60"
                stroke-width="5"
                :style="`transform: scale(${strokeScales[label]}%) rotate(${strokesMath[label][index].rotation}deg);
stroke-dasharray:${strokesMath[label][index].length}, 352`" />
              <circle
                v-if="displayScore !== '?'"
                class="circle-stroke z-10 opacity-70"
                :class="[`stroke-${stroke.color}`, { hidden: stroke.fillWeight === 0 }]"
                r="56"
                cx="60"
                cy="60"
                stroke-width="5"
                :style="`transform: scale(${strokeScales[label]}%) rotate(${strokesMath[label][index].rotation}deg);
stroke-dasharray:${strokesMath[label][index].fillLength}, 352`" />
            </template>
          </template>
        </svg>
      </div>
      <div
        :style="scoreStyle"
        class="score-title select-none"
        v-html="displayScore" />
      <div v-if="title">{{ title }}</div>
    </div>
    <div v-if="showLegend">
      <ul
        class="-mt-2 w-full pr-2"
        :class="{ 'z-10': $route.name === 'score' }">
        <li
          v-for="(stroke, index) in strokes[strokeLabels[0]]"
          :key="index"
          class="flex items-center gap-2">
          <div
            class="h-2 min-h-[.5rem] w-2 min-w-[.5rem] rounded"
            :class="`bg-${stroke.color}`"></div>
          <div class="ignore-metrics flex w-full flex-row items-center justify-between gap-x-4 text-sm">
            <router-link
              v-if="$route.name === 'score'"
              class="text-sm"
              :to="{
                name: stroke.routeName,
                query: {
                  from: 'score',
                },
              }">
              {{ stroke.name }}
            </router-link>
            <span v-else>
              {{ stroke.name }}
            </span>
            <div class="ignore-metrics flex items-center">
              <span class="font-semibold">{{ handleNA(+stroke?.normalized?.toFixed(1)) }}</span>
              <span class="text-sm text-gray-400"> /100 </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScoreChart',
  props: {
    id: {
      type: String,
      default: () => '',
    },
    size: {
      type: Number,
      default: () => 80,
    },
    title: {
      type: String,
      default: () => '',
    },
    strokes: {
      type: Object,
      default: () => {},
    },
    showLegend: {
      type: Boolean,
      default: () => true,
    },
    circleRadius: {
      type: Number,
      default: () => 44,
    },
  },
  data() {
    return {
      strokeScales: {},
      strokesMath: {},
      maxStrokeRatio: {},
      magicNumberMap: {
        2: 320,
        3: 311,
        4: 302,
        5: 260,
      },
      magicGapMap: {
        2: 0,
        3: 2,
        4: 0,
        5: 0,
      },
    };
  },
  watch: {
    strokes: {
      deep: true,
      handler() {
        this.computeStrokes();
      },
    },
  },
  created() {
    this.computeStrokes();
  },
  computed: {
    displayScore() {
      try {
        return +Number(
          this.strokes[this.strokeLabels[0]]
            .map((obj) => obj.fillWeight)
            .reduce((prevVal, currValue) => prevVal + currValue, 0)
            .toFixed(2)
        );
      } catch (e) {
        return '?';
      }
    },
    strokeLabels() {
      if (this.strokes) {
        return Object.keys(this.strokes);
      }
      return [];
    },
    gaugeStyle() {
      return {
        width: this.size,
        height: this.size,
      };
    },
    scoreStyle() {
      return {
        top: `calc(${this.size + 12}px / 2)`,
        height: `height: ${this.size}px !important`,
        fontSize: `calc(${this.size}px * 0.14 + 1.3px)`,
        zIndex: -1,
      };
    },
  },
  methods: {
    handleNA(number) {
      if (number >= 0) {
        return number;
      }
      return 'N/A';
    },
    sumStrokeRatio(label) {
      return this.strokes[label].reduce((acc, stroke) => acc + stroke.weight, 0);
    },
    maxStrokeLength(label) {
      return 352 - 16 * this.strokes[label].length;
    },
    computeStrokes() {
      this.strokesMath = {};
      this.maxStrokeRatio = {};
      this.strokeScales = {};

      if (this.strokes) {
        let lastScale = 100;
        this.strokeLabels.forEach((label, labelIndex) => {
          if (labelIndex > 0) {
            lastScale -= 16;
          }

          this.strokeScales[label] = lastScale;

          this.maxStrokeRatio[label] = Math.max(...this.strokes[label].map((stroke) => stroke.weight));

          this.strokesMath[label] = {};
          this.strokes[label].forEach((stroke, index) => {
            if (this.strokesMath[label] && !this.strokesMath[label][index]) {
              this.strokesMath[label][index] = {
                length: null,
                rotation: 0,
                sumLength: 0,
              };
            }
            this.strokesMath[label][index].length = this.normalize(stroke.weight, label);
            this.strokesMath[label][index].fillLength = this.normalizeFill(stroke.fillWeight, label);
            if (index > 0) {
              this.strokesMath[label][index].sumLength =
                this.strokesMath[label][index].length + this.strokesMath[label][index - 1].sumLength;
            } else {
              this.strokesMath[label][index].sumLength = this.strokesMath[label][index].length;
            }
          });

          const offset = -87.9537;
          const strokesLength = this.strokes[label].length;

          this.strokes[label].forEach((stroke, index) => {
            if (index > 0) {
              this.strokesMath[label][index].rotation =
                this.strokesMath[label][index - 1].sumLength +
                ((352 - this.magicNumberMap[strokesLength]) / strokesLength) * index;
            }
            if (index === 1) {
              this.strokesMath[label][index].rotation += this.magicGapMap[strokesLength];
            }
            this.strokesMath[label][index].rotation += offset;
          });
        });
      }
    },
    normalize(value, label) {
      return this.intervalNormalization(value, 0, this.sumStrokeRatio(label), 0, this.maxStrokeLength(label));
    },
    normalizeFill(value, label) {
      const outMax = this.maxStrokeLength(label);
      const inMax = this.sumStrokeRatio(label);

      if (value === inMax) {
        return outMax;
      }
      const threshold = (outMax / 100) * 30;

      return this.intervalNormalization(value, 0, inMax, 0, outMax - threshold);
    },
  },
};
</script>
<style lang="scss" scoped>
.score-chart-wrapper {
  @apply relative flex flex-col items-center p-2;
  contain: content;
  will-change: opacity;
}

@keyframes strokes-animation {
  from {
    stroke-dasharray: 0 352;
  }
}

.circle-stroke {
  @apply fill-none;
  transform-origin: 50% 50%;
  animation: strokes-animation 1s ease both;
  animation-delay: 250ms;
  stroke-linecap: round;
}

.score-title {
  @apply absolute h-20 w-full text-center font-mono leading-[0];
}
</style>
