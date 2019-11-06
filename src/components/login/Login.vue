<template>
    <div class="form">
        <div id="landing">登录</div>
        <div id="registered">注册</div>
        <div class="fix"></div>
        <div id="landing-content">
            <div id="photo"><img src="../../assets/image/photo.jpg" /></div>
            <div class="inp"><input v-model="userName" type="text" placeholder="用户名" /></div>
            <div class="inp"><input v-model="userPwd" type="password" placeholder="密码" /></div>
            <div class="login" @click="handleLogin">登录</div>
            <div id="bottom"><span id="registeredtxt" >立即注册</span><span id="forgotpassword">忘记密码</span></div>
        </div>
        <div id="registered-content">
            <div class="inp"><input v-model="userName" type="text" placeholder="请输入用户名" /></div>
            <div class="inp"><input v-model="userPwd" type="password" placeholder="请输入密码" /></div>
            <div class="inp"><input v-model="email" type="text" placeholder="电子邮箱" /> <button :disabled="disabled" @click="handleToVerify" class="verify">{{verifyInfo}}</button></div>
            <div class="inp"><input v-model="verifyCode" type="password" placeholder="请输入验证码" /></div>
            <div class="login" @click="handleToRegister">立即注册</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "login",
        data(){
            return{
                userName: '',
                userPwd: '',
                email:'',
                verifyInfo: '获取验证码',
                disabled: false,
                verifyCode:''
            }
        },
        mounted() {
            $(document).ready(function() {

                $(".form").slideDown(500);

                $("#landing").addClass("border-btn");

                $("#registered").click(function() {
                    $("#landing").removeClass("border-btn");
                    $("#landing-content").hide(500);
                    $(this).addClass("border-btn");
                    $("#registered-content").show(500);

                })

                $("#landing").click(function() {
                    $("#registered").removeClass("border-btn");
                    $(this).addClass("border-btn");

                    $("#landing-content").show(500);
                    $("#registered-content").hide(500);
                })
            });
        },
        methods: {
            handleLogin(){
                this.$axios.post('/api2/users/login',{
                    username: this.userName,
                    password: this.userPwd
                }).then((res)=>{
                    let status = res.data.status;
                    if(status === 0){
                        localStorage.setItem('username',this.userName);
                        this.$store.commit('user/USER_NAME',this.userName);
                        this.$alert('登录成功', '登录提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/');
                            }
                        });
                    }else {
                        this.$alert('登录失败', '登录提示', {
                            confirmButtonText: '确定',
                        });
                    }
                })
            },
            handleToVerify(){
                this.$axios.get('/api2/users/verify?email=' + this.email).then((res)=>{
                    let status = res.data.status;
                    if(status === 0){
                        this.$alert('验证码已发送至邮箱，请注意查收', '消息提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.countDown();
                            }
                        });

                    }else {
                        this.$alert(res.data.msg, '消息提示', {
                            confirmButtonText: '确定',
                        });
                    }
                });
            },
            countDown(){
                let count =60;
                this.disabled = true;
                let timer = setInterval(()=>{
                        this.verifyInfo = '剩余'+ count + '秒';
                        count --;
                        if(count == 0){
                        this.verifyInfo = '再次发送';
                        this.disabled = false
                        clearInterval(timer)
                    }

                },1000)
            },
            handleToRegister(){
                this.$axios.post('/api2/users/register', {
                    username: this.userName,
                    password: this.userPwd,
                    email: this.email,
                    verify: this.verifyCode
                }).then((res) =>{
                    let status = res.data.status;
                    if( status === 0){
                        this.$alert('用户注册成功，请登录', '消息提示', {
                            confirmButtonText: '确定',
                        });
                    }else {
                        this.$alert('用户注册失败,'+ res.data.msg, '消息提示', {
                            confirmButtonText: '确定',
                        });
                    }
                });
            }
        }
    }
</script>

<style scoped lang="css">
    .form {
        position: relative;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -185px;
        margin-top: -210px;
        height: 420px;
        width: 340px;
        font-size: 14px;
        -webkit-box-shadow: 0px 0px 10px #A6A6A6;
        background: #fff;
    }

    .border-btn {
        border-bottom: 2px solid #ccc;
        cursor: pointer;
    }

    #landing,
    #registered {
        float: left;
        text-align: center;
        width: 170px;
        padding: 15px 0;
        color: #545454;
    }

    #landing-content {
        clear: both;
    }

    .inp {
        height: 30px;
        margin: 0 auto;
        margin-bottom: 30px;
        width: 200px;
    }
    .inp .verify {
        height: 30px;
        font-size: 12px;
        cursor: pointer;
        color:#2a62ff;
        font-weight: normal;
        position: absolute;
        right: 10px;
    }

    .inp>input {
        text-align: center;
        height: 30px;
        width: 180px;
        margin: 0 auto;
        transition: all 0.3s ease-in-out;
    }

    .login {
        border: 1px solid #A6A6A6;
        color: #a6a6a6;
        height: 30px;
        width: 182px;
        text-align: center;
        font-size: 13.333333px;
        margin-left: 70px;
        line-height: 30px;
        margin-top: 30px;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
    }

    .login:hover {
        background: #A6A6A6;
        color: #fff;
    }

    #bottom {
        margin-top: 30px;
        font-size: 13.333333px;
        color: #a6a6a6;
    }

    #registeredtxt {
        float: left;
        margin-left: 80px;
    }

    #forgotpassword {
        float: right;
        margin-right: 80px;
    }

    #photo {
        border-radius: 80px;
        border: 1px solid #ccc;
        height: 80px;
        width: 80px;
        margin: 0 auto;
        overflow: hidden;
        clear: both;
        margin-top: 30px;
        margin-bottom: 30px;
    }

    #photo>img:hover {
        -webkit-transform: rotateZ(360deg);
        -moz-transform: rotateZ(360deg);
        -o-transform: rotateZ(360deg);
        -ms-transform: rotateZ(360deg);
        transform: rotateZ(360deg);
    }

    #photo>img {
        height: 80px;
        width: 80px;
        -webkit-background-size: 220px 220px;
        border-radius: 60px;
        -webkit-transition: -webkit-transform 1s linear;
        -moz-transition: -moz-transform 1s linear;
        -o-transition: -o-transform 1s linear;
        -ms-transition: -ms-transform 1s linear;
    }


    #registered-content {
        margin-top: 40px;
        display: none;
    }

    .fix {
        clear: both;
    }
    .form{
        display: none;
    }
</style>