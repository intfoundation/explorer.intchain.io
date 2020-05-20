<template>
  <div class="nav-container">
    <div class="nav-panel">
      <router-link tag="div" to="/" class="common-inline-block ii">
        <img src="../../assets/int-logo.png" alt="int logo" class="nav-logo">
      </router-link>
      <div class="common-inline-block ic" style="vertical-align: 10px;">
        <router-link to="/" id="home" :class="{'nav-active': $route.path === '/'}" class="pgy">{{$t('nav.home')}}</router-link>
        <div class="vg">
          <a href="javacript:void(0);">
            <span :class="{'nav-active': (/blockchain/g).test($route.path)}">{{$t('nav.blockchain.name')}}</span>
            <i class="triangle" :class="{'triangle-active': (/blockchain/g).test($route.path)}"></i>
          </a>
          <div class="chain-dropdown">
            <router-link
              tag="div"
              :to="{path: item.url}"
              v-for="(item, index) in blockchainList"
              :key="index"
              @click.native="highlight(item.nav)"
              class="chain-dropdown-i">{{item.name}}</router-link>
          </div>
        </div>
        <router-link to="/node" :class="{'nav-active': $route.path === '/node'}" class="pgy">
          <span>{{$t('nav.bp')}}</span>
        </router-link>

        <div class="vg">
          <a href="javacript:void(0);">
            <span>{{$t('nav.guide')}}</span>
            <i class="triangle"></i>
          </a>
          <div class="chain-dropdown">
            <a
              style="display: inline-block;"
              :href="item.url"
              v-for="(item, index) in guidelist"
              :key="index"
              target="_blank"
              class="chain-dropdown-i">{{item.name}}</a>
          </div>
        </div>



      </div>
      <div class="common-inline-block iv" @keyup.enter="search">
        <input
          type="text"
          :placeholder="$t('nav.placeholder')"
          v-model="searchContent"><span @click="search"><i class="search-icon"></i></span>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios'

export default {
  name: 'NavPanel',
  data () {
    return {
      curNav: 'Home',
      searchContent: '',
      otherSearch: '',
      blockchainList: [
        {
          name: this.$t('nav.blockchain.block'),
          url: '/blockchain/blocklist/1'
        },
        {
          name: this.$t('nav.blockchain.transaction'),
          url: '/blockchain/txlist/1'
        },
        {
          name: this.$t('nav.blockchain.token'),
          url: '/blockchain/tokenlist/1'
        },
        {
          name: this.$t('nav.blockchain.account'),
          url: '/blockchain/accountlist/1'
        },
        {
          name: this.$t('nav.blockchain.referendum'),
          url: '/referendum'
        }
      ],
      guidelist: [
        { name: this.$t('nav.enVersion'),
          url: '/static/help/en.pdf'
        },
        {
          name: this.$t('nav.cnVersion'),
          url: '/static/help/cn.pdf'
        }
      ]
    }
  },
  methods: {
    strTrim(str) {
      str = str+""
      return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    highlight (index) {
      this.curNav = index
    },
     search () {
      this.searchContent = this.strTrim(this.searchContent);
      let that = this
      let url = '/api/trans/search?param=' + that.searchContent.replace(/\s+/g,"")
      try {
          axios.get(url).then(
          function(result) {
            if (result.data.isValidAddress) {
              if (result.data.data.type === 'tokenid') {
                that.$router.push({path: '/blockchain/tokendetail/1', query: {tokenid: that.searchContent}})
                that.searchContent = ''
                return
              } else {
                that.$router.push({path: '/blockchain/accountdetail/1', query: {address: that.searchContent}})
                that.searchContent = ''
                return
              }
            }
            let str = JSON.stringify(result.data.data)
            if (str === '{}') {
              that.$router.push({ path: '/search', query: {q: that.searchContent}} )
              that.searchContent = ''
              return
            } else {
              let type = result.data.data.type
              let co = result.data.data.data[0]
              that.otherSearch = that.searchContent
              that.searchContent = ''
              switch (type) {
                case 'height':
                  let height = co.height
                  that.$router.push({path: '/blockchain/blockdetail', query: {height: height}})
                  break
                case 'blockHash':
                  let height1 = co.height
                  that.$router.push({path: '/blockchain/blockdetail', query: {height: height1}})
                  break
                case 'transHash':
                  let hash = co.hash
                  that.$router.push({path: '/blockchain/txdetail', query: {hash: hash}})
                  break
                case 'address':
                  that.$router.push({path: '/blockchain/accountdetail/1', query: {address: that.otherSearch}})
                  break
                case 'tokenid':
                  that.$router.push({path: '/blockchain/tokendetail/1', query: {tokenid: that.otherSearch}})
                  break
              }
            }
          })
      } catch(err) {
        alert(err)
      }
    }
  }
}
</script>

<style lang="scss">
  .nav-container {
    box-shadow: 0px 0px 6px 0px #ccc;
    background-color: #171921;
    height: 70px;
    .nav-panel {
      text-align: left;
      padding: 10px 0px;
      box-sizing: border-box;
      width: 1200px;
      margin: 0 auto;
      .ii {
        vertical-align: middle;
        .nav-logo {
          width: 72px;
          height: 72px;
          margin-top: -12px;
        }
      }
      .ic {
        margin-left: 40px;
        & a {
          margin-right: 30px;
          color: #ffffff;
          text-decoration: none;
          font-weight: 500;
          span {
            vertical-align: middle;
          }
        }
        .pgy:hover {
          color: #d31515;
          padding-bottom: 2px;
        }
        .vg {
          position: relative;
          display: inline-block;
          height: 55px;
          &:hover > .chain-dropdown {
            display: block !important;
          }
          .chain-dropdown {
            position: absolute;
            width: 110px;
            top: 45px;
            box-shadow: 0px 6px 10px 0px #ccc;
            background-color: #171921;
            color: #fff;
            padding: 10px 15px;
            left: -16px;
            font-size: 14px;
            display: none;
            z-index: 1000;
            .chain-dropdown-i {
              cursor: pointer;
            }
            .chain-dropdown-i:not(:first-child) {
              margin-top: 8px;
            }
            .chain-dropdown-i:hover {
              color: #d31515;
            }
          }
          .triangle {
            display: inline-block;
            width: 0;
            height: 0;
            border-width: 7px 7px 0;
            border-style: solid;
            border-color: #ffffff transparent transparent;
            margin-left: 8px;
            vertical-align: middle;
          }
        }
        .nav-active {
          color: #d31515;
          padding-bottom: 2px;
        }
        .triangle-active {
          border-color: #ffffff transparent transparent !important;
        }
      }
      .help:hover {
        color: #d31515;
        padding-bottom: 2px;
        border-bottom: 2px solid #d31515;
      }
      .iv {
        height: 52px;
        line-height: 48px;
        float: right;
        & input {
          width: 280px;
          box-sizing: border-box;
          height: 37px;
          padding-left: 10px;
          border: 1px solid #ccc;
          border-right: none !important;
          outline: none;
          vertical-align: middle;
        }
        & span {
          display: inline-block;
          width: 53px;
          height: 37px;
          line-height: 3;
          background-color: #1f80c1;
          text-align: center;
          vertical-align: middle;
        }
        .search-icon {
          background-image: url("../../assets/search.png");
          background-size: cover;
          display: inline-block;
          width: 18px;
          height: 16px;
          position: relative;
          top: -3px;
        }
      }
    }
  }
  .common-inline-block {
    display: inline-block;
    cursor: pointer;
  }
</style>
