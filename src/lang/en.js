module.exports = {
  blocksList: {
    blocksListTitle: 'Blocks',
    viewMore: 'View More > ',
    height: 'Height: ',
    miner: 'Miner: ',
    reward: 'Block Reward: ',
    txns: 'Txns: ',
    avgGasPrice: 'Avg.Fee: ',
    timestamp: 'Timestamp: ',
    hash: 'Hash: ',
    parent: 'Parent Hash: ',
    total: 'Total: ',
    blocklist: 'Blocklist',
    blockdetail: 'Block Info',
    blocklist2: 'Blocks',
    totalfee: 'Total Fee',
    txns2: 'Txns',
    miner2: 'Miner',
    reward2: 'Reward',
    avgGasPrice2: 'Avg.Fee'
  },
  nav: {
    home: 'Home',
    guide: 'User Guide',
    community: 'Community',
    placeholder: 'Search by Height/Hash/Address/Token',
    blockchain: {
      name: 'Blockchain',
      block: 'Blocks',
      transaction: 'Transactions',
      token: 'Tokens',
      account: 'Accounts'
    },
    bp: 'Thearchy Node',
    cnVersion: 'CN Version',
    enVersion: 'EN Version'
  },
  transactionList: {
    transactionListTitle: 'Transactions',
    txHash: 'TxHash: ',
    from: 'From: ',
    to: 'To: ',
    txReceiptStatus: 'TxReceiptStatus: ',
    value: 'Value: ',
    txtype: 'TxType: ',
    txtype2: 'TxType',
    txfee: 'TxFee',
    txfee2: 'TxFee: ',
    txhash2: 'TxHash',
    from2: 'From',
    to2: 'To',
    for2: 'for',
    timestamp: 'Timestamp',
    value2: 'Value',
    height: 'Height',
    latest: 'Latest',
    txns: 'txns',
    status: 'Status',
    transactions: 'Transactions',
    transfer: 'Tokens Transferred: ',
    holders: 'holders',
    gasLimit: 'Gas Limit: ',
    gasUsed: 'Gas Used By Transaction: ',
    gasPrice: 'Gas Price: ',
    actualTxCost: 'Actual Tx Cost/Fee: ',
    nounce: 'Nonce: '
  },
  int: {
    change: '24 Change: ',
    volume: '24 Volume: ',
    cap: 'Market Cap: '
  },
  account: {
    rank: 'Rank',
    address: 'Address',
    balance: 'Balance',
    percentage: 'Percentage',
    accountlist: 'Accountlist',
    accountdetail: 'Accountdetail',
    total: 'Total Txns: ',
    qrcode: 'Address QR Code: ',
    address2: 'Address: ',
    balance2: 'Balance: ',
    token: 'Token Txns',
    accounts: 'Accounts',
    inquire: 'Inquire about other token',
    otherToken: 'Other Token',
    weight: 'Weight'
  },
  err: {
    hint: 'There is no content~~~'
  },
  detail:{
    District:'District fund chain',
    Trade_list:'Transactions',
    Activity_list:'Tx Info',
    block_height:'Height',
    Transaction_type:'TxType',
    Vote_redemption:'Vote redemption',
    Trading_state:'TxReceipt Status',
    success: 'Success',
    fail:'Fail',
    pending: 'Pending',
    time_stamp:'Timestamp',
    Seconds_before:'Seconds before',
    Time_standard:'Time standard',
    Redemption_account:'Unmortgage Account',
    ticket_number:'Redemption ticket number',
    ticket:'ticket',
    tickets:' Number of votes ',
    Service_Charge:'Service Charge',
    log:'log',
    Mortgage_account:' Mortgage Account: ',
    Voting_account:' Vote Account ',
    Node_name: 'Node',
    More:'more nodes',
    less: 'Collapse',
    Initiator:'Initiator',
    recipient:'recipient',
    Money:'money',
    vote:'vote',
    Voting_mortgage:'Voting mortgage',
    Transfer_accounts:'Transfer accounts',
    Contact_us:'Contact Us',
    link:'link',
    wechat:"WeChat",
    micro_blog:'Weibo',
    Subscription:'Subscription',
    Community:' Community ',
    wallet:'Wallet',
    input: 'Input',
    log2: 'Log'
  },
  contract: {
    contract: 'Contract',
    transactions: 'Transactions: ',
    creator: 'Contract Creator: ',
    atTxn: 'create at txn'
  },
  token: {
    tokens: 'Tokens',
    token: 'Token',
    price: 'Price',
    marketcap: 'Market Cap',
    change: 'Change(%)',
    totalsupply: 'Total Supply: ',
    totalsupply2: 'Total Supply',
    holders: 'Holders: ',
    price2: 'Price: ',
    contract: 'Contract: ',
    holders2: 'Holders',
    inquire: 'Token Inquiries',
    searchToken: 'Search by Token',
    name: 'Token Name',
    id: 'Token ID'
  },
  node: {
    team: 'Team',
    region: 'Country/City',
    nodes: 'Nodes',
    placeholder: 'Search by candidate',
    name: 'Candidates',
    weight: 'Weight',
    count: 'Votes',
    plan: 'INT Node Plan',
    list: 'Node list',
    composition: '1. Node composition: ',
    content1: 'All registered nodes are candidate nodes.After each round of voting,Top 100 is the reward node.Reward node are generated by voting, Each voting cycle will last 48 hours. After the end of each round of the election cycle, the top 13 candidate nodes will be regarded as Block Producer, responsible for the block out of the block in the next round of election cycles.',
    generation: '2. Block Producer generation: ',
    content2: 'The Block Producer generation is determined by the consensus algorithm. Block Producer will refresh every 48 hours.The algorithm will execute automatically with high Tps while ensuring the fairness. Related factors for becoming a Block Producer are server configuration, upstream flow, network bandwidth, current state, and violation mark.',
    mechanism: '3. Reward mechanism: ',
    content3: 'For maintain INT network better, before 2023, the reward Token are paid by the Foundation’s exclusive wallet, Estimated annual expenditure of 19.5 million INT as Token rewards. If it need to change the rewards mechanisim later,it require to collect the community comments first, and the Block Producer will propose a proposal. The proposal will take effect after more than 2/3 nodes agree. The reward token will be distributed in two ways:',
    contentway1: '(1) 30% of the reward tokens are distributed to the Block Producer. The Block Producer responsible for generating the block will receive a reward for each block generated. This distribution mode is good to motivate the node maintainer to continuously evolve the device, which is conducive to the continuous improvement of the throughput of the whole network.',
    contentway2: '(2) 70% of the reward tokens are distributed according to the proportion of votes obtained by the reward node in one round of voting cycles.This distributed mode makes up for the plain design of the first distribution mode. And reduced the probability that node defender\'s behaving bad. In conclusion,node with both high-performance and hold more INT will receive the most token reward. A node that is neither high-performance nor hold many INT can still gain a certain amount of Token.',
    configuration: '4. Block Producer configuration requirements: ',
    classfication: 'Classfication',
    configurationText: 'Configuration',
    remark: 'Remark',
    cpuConfig: '16 cores CPU Clock Speed more than 2.0GHz',
    ram: 'RAM',
    hardDisk: 'Hard Disk Drive',
    network: 'Network',
    diskRemark: 'Partition mode: suap: 8G-32G, boot: >100M, the rest are all root partitions. Single hard disk Space day ≥ 2T does not require an array, single hard disk space 8T needs to form a 2T array',
    networkConfig: 'Bidirectional bandwidth minimum 20Mbps, Recommended bidirectional bandwidth 100Mbps',
    networkRemark: 'Becoming a Block Producer requires at least 100Mbps of bidirectional bandwidth',
    system: 'System'
  }
}
