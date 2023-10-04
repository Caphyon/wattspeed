<template>
  <div class="flex flex-col md:flex-row items-center justify-center gap-6 pr-2">
    <div class="flex-1 score-chart-wrapper">
      <div :style="`height: ${size}px`"
           class="score-chart-svg-wrapper select-none">
        <svg :style="gaugeStyle" viewBox="0 0 120 120" class="lh-gauge">
          <circle class="lh-gauge-base opacity-40"
                  :r="circleRadius" cx="60" cy="60" stroke-width="5" />
          <template v-for="(label, indexLabel) in strokeLabels" :key="indexLabel">
            <template v-for="(stroke, index) in strokes[label]" :key="index">
              <circle
                v-if="displayScore !== '?'"
                class="lh-gauge-arc opacity-20 z-10"
                :class="`stroke-${stroke.color}`"
                r="56"
                cx="60"
                cy="60"
                stroke-width="5"
                :style="`transform: scale(${strokeScales[label]}%) rotate(${strokesMath[label][index].rotation}deg);
stroke-dasharray:${strokesMath[label][index].length}, 352`" />
              <circle
                v-if="displayScore !== '?'"
                class="lh-gauge-arc opacity-70 z-10"
                :class="[`stroke-${stroke.color}`, { 'hidden' : stroke.fillWeight === 0 }]"
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
      <div :style="scoreStyle"
           class="score-title select-none" v-html="displayScore"/>
      <div v-if="title">{{ title }}</div>
    </div>
    <div v-if="showLegend">
      <ul class="w-full -mt-2 pr-2">
        <li v-for="(stroke, index) in strokes[strokeLabels[0]]" :key="index"
            class="flex items-center gap-2">
          <div class="min-w-[.5rem] min-h-[.5rem] w-2 h-2 rounded"
               :class="`bg-${stroke.color}`"></div>
          <div class="flex flex-row items-center justify-between w-full gap-x-4 ignore-metrics text-sm">
            <span>
              {{ stroke.name }}
            </span>
            <div class="flex items-center ignore-metrics">
              <span class="font-semibold">{{handleNA(+stroke?.normalized?.toFixed(1))}}</span>
              <span class="text-gray-400 text-sm">
                /100
              </span>
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
      if (number === 0) {
        return 'N/A';
      }
      return number;
    },
    sumStrokeRatio(label) {
      return this.strokes[label].reduce((acc, stroke) => acc + stroke.weight, 0);
    },
    maxStrokeLength(label) {
      return 352 - (16 * this.strokes[label].length);
    },
    computeStrokes() {
      // min -87.9537
      // max 272.0463
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

          this.maxStrokeRatio[label] = Math
            .max(...this.strokes[label].map((stroke) => stroke.weight));
          this.strokesMath[label] = {};
          // Calculate the length of every stroke
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
              this.strokesMath[label][index].sumLength = this.strokesMath[label][index].length
                + this.strokesMath[label][index - 1].sumLength;
            } else {
              this.strokesMath[label][index].sumLength = this.strokesMath[label][index].length;
            }
          });

          // Calculate the rotate degree for each stroke based on the sumLength
          const offset = -87.9537;
          const strokesLength = this.strokes[label].length;
          this.strokes[label].forEach((stroke, index) => {
            if (index > 0) {
              this.strokesMath[label][index].rotation = this.strokesMath[label][index - 1].sumLength
                + (((352 - this.magicNumberMap[strokesLength]) / strokesLength) * index);
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
      return this.intervalNormalization(
        value,
        0,
        this.sumStrokeRatio(label),
        0,
        this.maxStrokeLength(label),
      );
    },
    normalizeFill(value, label) {
      const outMax = this.maxStrokeLength(label);
      const inMax = this.sumStrokeRatio(label);

      if (value === inMax) {
        return outMax;
      }
      const threshold = (outMax / 100) * 30;

      return this.intervalNormalization(
        value,
        0,
        inMax,
        0,
        outMax - threshold,
      );
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
  from { stroke-dasharray: 0 352; }
}

.lh-gauge-arc {
  @apply fill-none;
  transform-origin: 50% 50%;
  animation: strokes-animation 1s ease both;
  animation-delay: 250ms;
  stroke-linecap: round;
}

.score-title {
  @apply absolute w-full h-20 font-mono text-center leading-[0];
}

</style>
