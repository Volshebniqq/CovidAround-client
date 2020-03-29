<template>
  <div class="register-container">
    <img src="logo.png" class="logo" />
    <form>
      <label>User identificator</label>
      <input :value="userId" type="text" disabled>
      <label>First Name</label>
      <input type="text" v-model="firstName">
      <label>Last Name</label>
      <input type="text" v-model="lastName">
      <button @click="handleRegister">Register</button>
    </form>
  </div>
</template>

<script>
import { setUserId, getUserId } from '@/services/auth';
export default {
  data() {
    return {
      userId: '',
      firstName: '',
      lastName: ''
    }
  },
  created() {
    if (getUserId()) this.$router.push('/notifications');
    this.userId = this.generateIdentificator();
  },
  methods: {
    generateIdentificator() {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    },
    handleRegister(e) {
      e.preventDefault();
      setUserId(this.userId);
      this.$router.push('/notifications');
      // ws auth here
    }
  }
}
</script>

<style lang="scss" scoped>
.register-container {
  width: 100%;
  height: 100vh;
  position: relative;
  .logo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    top: 20%;
  }
  form {
    width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    label {
      display: block;
      font-size: 14px;
    }
    input {
      width: 100%;
      display: block;
      border: 2px solid #aaa;
      outline: none;
      border-radius: 3px;
      height: 40px;
      line-height: 36px;
      font-size: 16px;
      padding: 10px;
      margin-bottom: 10px;
    }
    button {
      cursor: pointer;
      display: block;
      width: 100%;
      border-radius: 20px;
      height: 40px;
      line-height: 40px;
      border: none;
      outline: none;
      color: #fff;
      font-size: 18px;
      text-align: center;
      font-weight: bold;
      margin-top: 20px;
      background-color: #4073e6;
    }
  }
}
</style>