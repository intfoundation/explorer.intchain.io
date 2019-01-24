import Vue from 'vue'
import Router from 'vue-router'
const Layout = resolve => require(['@/components/layouts/Layout'], resolve);
const HomePage = resolve => require(['@/components/pages/HomePage'], resolve);

// 区块
const BlockList = resolve => require(['@/components/pages/block/BlockList'], resolve);
const BlockDetail = resolve => require(['@/components/pages/block/BlockDetail'], resolve);

// 搜索无结果
const Error = resolve => require(['@/components/pages/error/404'], resolve);
const invalidHash = resolve => require(['@/components/pages/error/InvalidHash'], resolve);

// 账户
const AccountList = resolve => require(['@/components/pages/account/AccountList'], resolve);
const AccountDetail = resolve => require(['@/components/pages/account/AccountDetail'], resolve);
const InquireToken = resolve => require(['@/components/pages/account/InquireToken'], resolve);

// 交易
const TxListByAddress = resolve => require(['@/components/pages/transaction/TxListByAddress'], resolve);
const TxTokenListByAddress = resolve => require(['@/components/pages/transaction/TxTokenListByAddress'], resolve);
const TxDetail = resolve => require(['@/components/pages/transaction/TxDetail'], resolve);
const TxList = resolve => require(['@/components/pages/transaction/TxList'], resolve);
const TxListByBlock = resolve => require(['@/components/pages/transaction/TxListByBlock'], resolve);
const ContractDetail = resolve => require(['@/components/pages/contract/ContractDetail'], resolve);
const ContractTransaction = resolve => require(['@/components/pages/contract/ContractTransaction'], resolve);

// 代币
const TokenList = resolve => require(['@/components/pages/token/TokenList'], resolve);
const TokenDetail = resolve => require(['@/components/pages/token/TokenDetail'], resolve)
const TxListByToken = resolve => require(['@/components/pages/token/TxListByToken'], resolve)
const AccountListByToken = resolve => require(['@/components/pages/token/AccountListByToken'], resolve)

// 超级节点
const BlockProducer = resolve => require(['@/components/pages/node/Node'], resolve)

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      // name: 'Layout',
      component: Layout,
      children: [
        {
          path: '',
          name: 'HomePage',
          component: HomePage,
          meta: []
        },
        {
          path: '/blockchain/txdetail',
          name: 'TxDetail',
          component: TxDetail,
        },
        {
          path: '/blockchain/txlist/:p',
          name: 'TxList',
          component: TxList
        },
        {
          path: '/blockchain/txlist/byBlock/:p',
          name: 'TxListByBlock',
          component: TxListByBlock
        },
        {
          path: '/blockchain/blocklist/:p',
          name: 'BlockList',
          component: BlockList
        },
        {
          path: '/blockchain/blockdetail',
          name: 'BlockDetail',
          component: BlockDetail
        },
        {
          path: '/blockchain/accountlist/:p',
          name: 'AccountList',
          component: AccountList
        },
        {
          path: '/blockchain/accountdetail/:p',
          name: 'AccountDetail',
          component: AccountDetail
        },
        {
          path: '/blockchain/account/inquire',
          name: 'InquireToken',
          component: InquireToken
        },
        {
          path: '/blockchain/contract/:p',
          name: 'ContractDetail',
          component: ContractDetail
        },
        {
          path: '/blockchain/contract/transactions/:p',
          name: 'ContractTransaction',
          component: ContractTransaction
        },
        {
          path: '/blockchain/tokenlist/:p',
          name: 'TokenList',
          component: TokenList
        },
        {
          path: '/blockchain/tokendetail/:p',
          name: 'TokenDetail',
          component: TokenDetail
        },
        {
          path: '/blockchain/txlist/byAddress/:p',
          name: 'TxListByAddress',
          component: TxListByAddress
        },
        {
          path: '/blockchain/tx/tokenlist/byAddress/:p',
          name: 'TxTokenListByAddress',
          component: TxTokenListByAddress
        },
        {
          path: '/blockchain/txlist/byToken/:p',
          name: 'TxListByToken',
          component: TxListByToken
        },
        {
          path: '/blockchain/accountlist/byToken/:p',
          name: 'AccountListByToken',
          component: AccountListByToken
        },
        {
          path: '/node',
          name: 'BlockProducer',
          component: BlockProducer
        },
        {
          path: '/search',
          component: Error,
          name: 'Error'
        },
        {
          path: '/invalidHash',
          component: invalidHash,
          name: 'invalidHash'
        }
      ]
    }
  ]
})

export default router
