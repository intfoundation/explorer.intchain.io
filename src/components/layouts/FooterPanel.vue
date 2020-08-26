<template>
  <div class="footer-panel">
    <div class="footer-content" >
      <!--<span class="footer-title">{{$t('detail.Contact_us')}}{{$t('detail.link')}}</span>-->
      <div class="footer-left">
        <div style="margin-top:72px;margin-bottom:24px;">{{$t('detail.Contact_us')}}</div>
        <a class="isc" href="mailto:intfoundation@intchain.io">
          <span class="rmb email"></span>
          <a class="link">Email</a>
        </a>
        <a class="isc" href="https://t.me/INTChainOfficial" target="_blank">
          <span class="rmb telegram"></span>
          <a class="link">Telegram</a>
        </a>
        <a class="isc" href="https://twitter.com/intchain" target="_blank">
          <span class="rmb twitter"></span>
          <a class="link">Twitter</a>
        </a>
        <a class="isc" target="_blank" href="https://www.facebook.com/INTchainINT" >
          <span class="rmb facebook"></span>
          <a class="link">Facebook</a>
        </a>
        <a class="isc" target="_blank" href="https://www.reddit.com/r/INT_Chain/">
          <span class="rmb reddit"></span>
          <a class="link">Reddit</a>
        </a>
        <br/>
        <span class="isc fff" style="position: relative;">
          <span class="rmb wechat"></span>
          <span class="wechat-qrcode"></span>
          <a class="link">{{$t('detail.wechat')}}</a>
        </span>

        <a class="isc" target="_blank" href="https://weibo.com/u/6358909246">
          <span class="rmb weibo"></span>
          <a class="link">{{$t('detail.micro_blog')}}</a>
        </a>

        <a class="isc" target="_blank" href="https://github.com/intfoundation">
          <span class="rmb github"></span>
          <a class="link">GitHub</a>
        </a>

        <a class="isc fff" style="position: relative;">
          <span class="rmb pulnum"></span>
          <span class="wechat-qrcode-sub"></span>
          <a class="link">{{$t('detail.Subscription')}}</a>
        </a>

      </div>
      <div class="footer-right">
        <div style="margin-top:72px;margin-bottom:24px;">{{$t('detail.link')}}</div>
        <a class="isc" href="http://tech.intchain.io/" target="_blank">
          <span class="rmb community"></span>
          <a class="link" >{{$t('detail.Community')}}</a>
        </a>

        <a class="isc" target="_blank" href="http://wallet.intchain.io/index.html">
          <span class="rmb wallet"></span>
          <a class="link">{{$t('detail.wallet')}}</a>
        </a>

      </div>
    </div>
      <div style="font-size: 14px; display:inline-block;">Copyright © {{ year }} INT</div>
  </div>
</template>

<script>
  export default {
    name: 'FooterPanel',
    data() {
      return {
        year: '2019 - ' + (new Date()).getFullYear()
      }
    }
  }
</script>

<style lang="scss">
  .footer-panel {
    height: 320px;
    color: #ffffff;
    background: #171928;
    .footer-content {
      margin: 0 auto;
      width: 1200px;
      font-size: 18px;
      font-weight: bold;
      text-align: left;
    }
    .footer-title{
       margin-top:90px;
       display: inline-block;
       margin-bottom: 30px;
       width:1200px;
       font-size: 24px;
    }
    .footer-left {
      display: inline-block;
      width:740px;
      margin-bottom: 60px;
    }
    .footer-right {
      display: inline-block;
      width:400px;
      vertical-align: top;

    }
    .isc {
      display: inline-block;
      width: 134px;
      line-height: 29px;
      vertical-align: middle;
      font-weight: normal;
      padding-bottom: 5px;
      position: relative;
      text-decoration: none;
      .link{
        font-size: 14px;
        text-decoration:none;
        color:#ffffff;
      }
      .link:hover {
        color: #fff;
      }
    }
    .icon-common {
      padding-right: 10px;
      height: 32px;
      width: 32px;
      border-radius: 30px;
      vertical-align: middle;
    }
  }
  .rmb {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-size: cover;
    vertical-align: middle;
    margin-right: 6px;
  }
  .twitter{
    background-image: url("../../assets/twitter.png");
  }
  .twitter:hover {
    background-image: url("../../assets/twitterSel.png");
    display: inline-block;
    background-size: cover;
  }
  .telegram{
    background-image: url("../../assets/telegram.png");
  }
  .telegram:hover {
    background-image: url("../../assets/telegramSel.png");
    display: inline-block;
    background-size: cover;
  }
  .facebook{
    background-image: url("../../assets/facebook.png");
  }
  .facebook:hover {
    background-image: url("../../assets/facebookSel.png");
    display: inline-block;
    background-size: cover;
  }
  .reddit{
    background-image: url("../../assets/reddit.png");
  }
  .reddit:hover {
    background-image: url("../../assets/redditSel.png");
    display: inline-block;
    background-size: cover;
  }

  .wechat{
    background-image: url("../../assets/wechat.png");
  }

  .wechat:hover{
    background-image: url("../../assets/wechatSel.png");
  }

  .fff:hover > .wechat-qrcode{
    height: 5rem;
  }
  .fff:hover > .wechat-qrcode-sub{
    height: 5rem;
  }

  .wechat-qrcode {
    position: absolute;
    top: 100%;
    left: 12%;
    width: 5rem;
    height: 0rem;
    background: url("../../assets/wechat-kefu.jpg") no-repeat 0 0/cover;
    transition: height 0.8s;
  }
  .wechat-qrcode-sub {
    position: absolute;
    top: 100%;
    left: 12%;
    width: 5rem;
    height: 0rem;
    background: url("../../assets/wechat-gongzhong.jpg") no-repeat 0 0/cover;
    transition: height 0.8s;
  }
  .weibo{
    background-image: url("../../assets/weibo.png");
  }

  .weibo:hover{
    background-image: url("../../assets/weiboSel.png");
  }
  .github{
    background-image: url("../../assets/github.png");
  }

  .github:hover{
    background-image: url("../../assets/githubSel.png");
  }
  .pulnum{
    background-image: url("../../assets/pulnum.png");
  }

  .pulnum:hover{
    background-image: url("../../assets/pulnumSel.png");
  }
  .community{
    background-image: url("../../assets/community.png");
  }

  .community:hover{
    background-image: url("../../assets/communitySel.png");
  }
  .wallet{
    background-image: url("../../assets/wallet.png");
  }

  .wallet:hover{
    background-image: url("../../assets/walletSel.png");
  }

  .email {
    background-image: url("../../assets/email.png");
  }

  .email:hover {
    background-image: url("../../assets/email-active.png");
  }


</style>

