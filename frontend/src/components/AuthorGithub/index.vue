<template>
  <div>
    <el-tooltip effect="dark" placement="bottom">
      <div slot="content">
        <a :href="url" class="link" target="_blank">转到 Github</a>
      </div>
      <el-button class="btn-text can-hover" type="text" @click="handleClick">
        <fa-icon name="github" style="font-size: 20px"/>
      </el-button>
    </el-tooltip>
  </div>
</template>

<script>
import FaIcon from '@/components/FaIcon'
export default {
  name: 'AuthorGithub',
  components: { FaIcon },
  data() {
    return {
      url: 'https://github.com/Gtry/svnlab/'
    }
  },
  methods: {
    handleClick() {
      window.open(this.url)
    }
  }
}
</script>

<style lang="scss" scoped>
.link {
  color: #FFF;
  text-decoration: none;
}
</style>
