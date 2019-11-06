<template>
    <div class="header">
        <ul>
            <li>首页</li>
            <li>音乐</li>
            <li>小说</li>
            <li>古诗</li>
            <li>新闻</li>
        </ul>
        <div v-if="isLogin"  class="user">
            <div @click="handleToLogin">登录</div>
            <p>|</p>
            <div @click="handleToLogin">注册</div>
        </div>
        <div v-else class="user">
            <p>欢迎您：{{ username }}</p>
            <div @click="Logout">退出</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data(){
            return{
                isLogin : true,
                username:'',
            }
        },
        mounted(){
            this.$axios.get('/api2/users/getUser').then((res) =>{
                let status = res.data.status;
                if(status === 0){
                    this.isLogin = false;
                    this.username = res.data.data.username;
                }
            });
        },
        methods:{
            handleToLogin(){
                this.$router.push('/login');
            },
            Logout(){
                this.$axios.get('/api2/users/logout').then((res) =>{
                    let status = res.data.status;
                    if( status === 0){
                        localStorage.removeItem('username');
                        this.$store.commit('user/USER_NAME', { username: ''});
                        this.$alert('退出成功', '消息提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/login');
                            }
                        });
                    }
                })
            }
        },
    }
</script>

<style scoped  lang="css">
  .header{
      width: 100%;
      height: 50px;
      border-radius: 4px;
      background-color: #000;
  }
  ul{
      display: flex;
  }
    ul li{
        height: 50px;
        line-height: 50px;
        color: #9d9d9d;
        margin-left: 50px;
        font-size: 16px;
        /*background-color: #fff;*/
        width: 80px;
        text-align: center;
        font-weight: bold;
        cursor: pointer;
        background-color: transparent
    }
  ul li:hover{
      color: #fff;
  }
    .user{
        display: flex;
        position: absolute;
        top: 20px;
        padding-left: 20px;
        right: 30px;
    }
  .user div,p{
      color: #eee;
      font-size: 14px;
      cursor: pointer;
      margin-left: 20px;
  }
</style>