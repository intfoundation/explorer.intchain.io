<template>
  <div class="txtype">
    <div class="txtype-detail">

      <!--from地址-->
      <div class="trad-list">
        <span class="span-width">{{$t('transactionList.from')}}</span>
        <router-link
          :to="{ path: '/blockchain/accountdetail/1', query: {address: transObj.from_address}}"
          class="format">{{transObj.from_address}}</router-link>
      </div>

      <!--to地址-->
      <div class="trad-list"
           v-if="transObj.method !== 'vote'
           && transObj.method !== 'unmortgage'
           && transObj.method !== 'mortgage'
           && transObj.method !== 'register'
           && transObj.method !== 'freezeAccount'">
        <span class="span-width">{{$t('transactionList.to')}}</span>
        <div style="display: inline-block;" v-if="inputs&&inputs.tokenid">
          <span>{{$t('contract.contract')}}</span>
          <router-link
            :to="{ path: '/blockchain/contract/1', query: {contract: tokenid}}"
            class="format">{{tokenid}}</router-link>
          <!--在pending状态下没有tokenName字段，在fail状态下，tokenName返回null-->
          <span v-if="transObj.tokenName">&nbsp;({{transObj.tokenName}})</span>

          <span v-else-if="transObj.tokenName === null">(Fail)</span>
          <span v-else>(Pending)</span>
        </div>
        <!--contract单独处理，关于锁仓的-->
        <div style="display: inline-block;" v-else-if="inputs&&inputs.contractid">
          <span>{{$t('contract.contract')}}</span>
          <router-link
            :to="{ path: '/blockchain/accountdetail/1', query: {address: contractid}}"
            class="format">{{contractid}}</router-link>
        </div>

          <router-link
          v-else
          :to="{ path: '/blockchain/accountdetail/1', query: {address: transObj.to_address}}"
          class="format">{{transObj.to_address}}</router-link>
       </div>

      <div class="trad-list" v-if="transObj.method === 'vote'">
        <span class="span-width" style="vertical-align: top;">{{$t('detail.Node_name')}}：</span>
        <div style="display: inline-block;">
        <router-link
          style="margin-bottom: 4px; cursor: pointer;"
          tag="div"
          v-for="(item, index) in node"
          :key="index" v-if="index <= maxIndex"
          :to="{ path: '/blockchain/accountdetail/1', query: {address: item}}"
          class="format">{{item}}</router-link>
          <span v-if="node.length > 5 && (maxIndex !== node.length - 1)" @click="more" style="cursor: pointer;">{{$t('blocksList.viewMore')}}</span>
          <span v-if="node.length > 5 && (maxIndex === node.length - 1)" @click="less" style="cursor: pointer;">{{$t('detail.less')}}</span>
        </div>
      </div>

      <!--tokens transferred-->
      <div class="trad-list"
           v-if="
           transObj.method === 'transferTokenTo'
           || transObj.method === 'approve'
           || transObj.method === 'freezeAccount'
           || transObj.method === 'transferOwnership'">
        <span class="span-width">{{$t('transactionList.transfer')}}</span>
        <span>{{$t('transactionList.from2')}}</span>
        <router-link
          :to="{ path: '/blockchain/accountdetail/1', query: {address: transObj.from_address}}"
          class="format obc">{{transObj.from_address}}</router-link>
        <span>{{$t('transactionList.to2')}}</span>

        <!--transferTokenTo-->
        <router-link
          :to="{ path: '/blockchain/accountdetail/1', query: {address: transObj.to_address}}"
          v-if="transObj.method === 'transferTokenTo'"
          class="format obc">{{transObj.to_address}}</router-link>

        <!--approve-->
        <router-link
          :to="{ path: '/blockchain/accountdetail/1', query: {address: inputs.spender}}"
          v-if="transObj.method === 'approve'"
          class="format obc">{{inputs.spender}}</router-link>

        <!--transferOwnership-->
        <router-link
          :to="{ path: '/blockchain/accountdetail/1', query: {address: inputs.newOwner}}"
          v-if="transObj.method === 'transferOwnership'"
          class="format obc">{{inputs.newOwner}}</router-link>

        <!--freezeAccount-->
        <router-link
          :to="{ path: '/blockchain/accountdetail/1', query: {address: inputs.freezeAddress}}"
          v-if="transObj.method === 'freezeAccount'"
          class="format obc">{{inputs.freezeAddress}}</router-link>


        <span v-if="transObj.method !== 'transferOwnership' && transObj.method !== 'freezeAccount' ">
          <span>{{$t('transactionList.for2')}}</span>
          <span>{{transObj.jsonInput.amount}}</span>
          <router-link
          :to="{ path: '/blockchain/tokendetail/1', query: {tokenid: inputs.tokenid}}"
          class="format">{{transObj.tokenSymbol}}</router-link>
        </span>

      </div>

      <!--value值-->
      <div class="trad-list">
        <span class="span-width">{{$t('transactionList.value')}}</span>
        <span>{{transObj.value}}</span>
      </div>

      <!--gas limit值-->
      <div class="trad-list">
        <span class="span-width">{{$t('transactionList.gasLimit')}}</span>
        <span>{{transObj.limit_value}}</span>
      </div>

      <!--gas used by transaction-->
      <div class="trad-list">
        <span class="span-width">{{$t('transactionList.gasUsed')}}</span>
        <span v-if="transObj.returnCode !== -1" v-show="transObj.price !== undefined">{{parseInt(transObj.cost/transObj.price)}}</span>
        <span v-else>Pending</span>
      </div>

      <!--gas price-->
      <div class="trad-list">
        <span class="span-width">{{$t('transactionList.gasPrice')}}</span>
        <span v-show="transObj.price !== undefined">{{transObj.price}} INT</span>
      </div>

      <!--actual tx cost-->
      <div class="trad-list">
        <span class="span-width">{{$t('transactionList.actualTxCost')}}</span>
        <span v-if="transObj.returnCode !== -1" v-show="transObj.cost !== undefined">{{dataFilter(+transObj.cost, 5)}} INT</span>
        <span v-else>Pending</span>
      </div>

      <!--nonce-->
      <div class="trad-list">
        <span class="span-width">{{$t('transactionList.nounce')}}</span>
        <span>{{transObj.nonce}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { BigNumber } from 'bignumber.js';
  import { dataFilter } from '../../../utils/common.js'
  export default {
    name: '',
    // props:[
    //   'transObj'
    // ],
    props: {
      transObj: Object
    },
    data() {
      return {
        amount: 0,
        maxIndex: 4,
        dataFilter,
        isContract: false,
        contractTypeList: ['createToken', 'transferTokenTo', 'approve', 'mintToken', 'burn', 'freezeAccount', 'transferOwnership']
      }
    },
    mounted () {
      this.contractTypeList.forEach(item => {
        if (item === this.transObj.method) {
          this.isContract = true
        }
      });
    },
    computed: {
      inputs () {
        if (JSON.stringify(this.transObj) !== '{}') {
          return JSON.parse(this.transObj.input.replace(/'/g,`"`))
        }
      },
      node () {
        if (JSON.stringify(this.transObj) !== '{}') {
          let node = JSON.parse(this.transObj.input.replace(/'/g,`"`))
          return node.candidates
        }
      },
      tokenid () {
        if (JSON.stringify(this.transObj) !== '{}') {
          return JSON.parse(this.transObj.input.replace(/'/g,`"`)).tokenid
        }
      },
      contractid () {
        if (JSON.stringify(this.transObj) !== '{}') {
          return JSON.parse(this.transObj.input.replace(/'/g,`"`)).contractid
        }
      }
    },
    methods:{
      more () {
        this.maxIndex = this.node.length - 1
      },
      less () {
        this.maxIndex = 4
      },
    }
   }
</script>

<style lang="scss">
  .txtype {
    .txtype-detail {
      border: 1px solid #CCCCCC;
      border-radius: 0px;
      font-size: 14px;
      margin-bottom: 30px;
      padding: 35px 56px;
      .trad-list:not(:first-of-type) {
        margin-top: 22px;
      }
      .span-width {
        display: inline-block;
        width: 220px;
      }
      .format{
        color:#1f80c1;
        text-decoration: none;
      }

      .format:hover{
        text-decoration: underline;
      }
      .obc {
        display: inline-block;
        width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: text-top;
      }
    }
  }

</style>
