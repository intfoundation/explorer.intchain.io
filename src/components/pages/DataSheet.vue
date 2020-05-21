<template>
  <div class="charts">
    <div style="display: inline-block;">
      <div class="int-st" style="width: 545px;">
        <div class="text">14 Day Transaction History</div>
      </div>
      <div ref="echarts" class="echarts"></div>
    </div>
    <div class="int">
      <div class="int-st">
        <div class="text">INT Metrics</div>
      </div>
      <div class="price">$ {{int.price}}</div>
      <div class="val">
        <div>
          <span>{{$t('int.change')}}</span>
          <span :class="['right-float', {'positive': int.percent_change_24h > 0}, {'negative': int.percent_change_24h < 0}]">{{int.percent_change_24h}}%</span>
        </div>
        <div>
          <span>{{$t('int.volume')}}</span>
          <span class="right-float">${{int.volume_24h}}</span>
        </div>
        <div>
          <span>{{$t('int.cap')}}</span>
          <span class="right-float">${{int.market_cap}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { dataFilter } from '../../utils/common.js'
  import axios from 'axios'
  import echarts from 'echarts'
  export default {
    name: 'DataSheet',
    data () {
      return {
        int: {
          price: '',
          market_cap: '',
          percent_change_24: '',
          volume_24h: ''
        },
        arr: [],
        option: {
          title: {
            // text: 'transaction',
            left: 'center', // align属性设置居中不生效，这个就生效了
            // subtext: 'data sources：INTChain',
            subtextStyle: {
              color: '#656665'
            }
          },
          legend: {
            orient: 'vertical', // 'vertical'
            right: 100,
            top: 20,
            bottom: 20,
            data: [
              {
                name: 'transaction',
                // icon: 'circle' // 如果不写就默认，默认的圆形外面有两条短横线
              },
            ]
          },
          tooltip: {
            trigger: 'axis' // tooltip出现悬浮的解释框
          },
          xAxis: {
            type: 'category',
            data: [],
            // data: ['2018-08-22','2018-08-22', '2018-08-22','2018-08-22','2018-08-22','2018-08-22','2018-08-22','2018-08-22','2018-08-22','2018-08-22','2018-08-22','2018-08-22','2018-08-22','2018-08-22','2018-08-22',],
            axisLabel: {
              interval: 0,
              rotate: 45, //倾斜度 -90 至 90 默认为0
              margin: 12, // 刻度标签与轴线的距离
              fontWeight: 500
            },
            axisTick: {
              alignWithLabel: true // 刻度和标签对齐
            }
          },
          yAxis: {
            type: 'value',
            name: 'Quantity',
            nameLocation: 'center',
            nameGap: 60, // 坐标轴的名称与轴线之间的距离
            axisLine: {
              show: false // 不显示纵轴的坐标轴
            },
            axisTick: {
              show: false // 不显示纵轴的刻度
            },
            axisLabel: {
              // formatter: function (value, index) {
              //   if (value >= 100000) {
              //     return value = (value / 1000) + 'k';
              //   } else {
              //     return value;
              //   }
              // },
              margin: 15 // 刻度标签与轴线的距离
            }
          },
          series: [{
            name: 'transaction', // 这个name必须与legend data中的name一致
            data: [],
            type: 'line',
            smooth: true,
            label: {
              position: [50, 50]
            },
            itemStyle: {
              color: '#1f80c1', // 线的颜色
              borderWidth: 5 // 线的宽度
            }
          }]
        }
      }
    },
    created() {
      this.coinMarket();
    },
    mounted () {
      this.transactionHistory()
    },
    methods: {
      coinMarket () {
        let that = this;
        axios.get('/api/intInfo').then(res1 => {
          let obj = res1.data;
          that.int.price = obj.intPrice;
          that.int.volume_24h = dataFilter(obj.volumeDay * obj.intPrice,4);
          that.int.percent_change_24h = obj.changeDay;
          that.int.market_cap = dataFilter(obj.marketCap,4);
        })
      },
      transactionHistory () {
        let that = this
        axios({
          type: 'get',
          url: '/api/block/transferTrend'
        })
          .then(function (res) {
            let result = res.data
            if (result.status === 'success') {
              let outcome = result.data
              outcome.forEach(item => {
                that.option.xAxis.data.push(item.time.slice(5))
                that.option.series[0].data.push(item.count)
              })
              var myChart = echarts.init(that.$refs['echarts']) // 减少dom的消耗
              myChart.setOption(that.option)
            }
          })
          .catch(function(error) {

          })
      }
    }
  }
</script>

<style lang="scss">
  .charts {
    width: 1200px;
    border: 1px solid #ddd;
    background-color: #fff;
    height: 400px;
    margin: 0 auto;
    padding: 22px 18px;
    box-sizing: border-box;
    .echarts {
      width: 600px;
      height: 336px;
      float: left;
      margin-left: -18px;
      margin-top: -20px;
    }
    .int {
      width: 545px;
      float: right;
      .price {
        padding: 27px 0px 27px 16px;
        font-size: 40px;
        text-align: left;
        border-bottom: 1px solid #ddd;
        font-weight: 700;
      }
      .val {
        padding: 20px 20px 0;
        text-align: left;
        color: #222222;
        font-weight: 500;
        div:not(:first-child) {
          margin-top: 10px;
        }
        .positive {
          color: #2ebf54;
        }
        .negative {
          color: #dc4056;
        }
      }
    }
    .right-float {
      float: right;
    }
    .int-st {
      border-bottom: 1px solid #ddd;
      padding-bottom: 22px;
      .text {
        font-size: 18px;
        font-weight: 700;
        text-align: left;
      }
    }
  }
</style>
