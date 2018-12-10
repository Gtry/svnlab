<template>
  <div class="dashboard-container">
    <component :is="currentRole"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import gusterDashboard from './guster'
import reporterDashboard from './reporter'
import developerDashboard from './developer'
import masterDashboard from './master'

export default {
  name: 'Dashboard',
  components: {
    gusterDashboard,
    reporterDashboard,
    developerDashboard,
    masterDashboard
  },
  data() {
    return {
      currentRole: 'gusterDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    /*
    var arr = ['reporter', 'developer', 'master']
    if (arr.indexOf(this.roles) == -1) {
      this.currentRole = 'gusterDashboard'
    }
    */
    if (this.roles === 'guster') {
      this.currentRole = 'gusterDashboard'
    } else if (this.roles === 'reporter') {
      this.currentRole = 'reporterDashboard'
    } else if (this.roles === 'developer') {
      this.currentRole = 'developerDashboard'
    } else if (this.roles === 'master') {
      this.currentRole = 'masterDashboard'
    } else {
      this.currentRole = 'gusterDashboard'
    }
  }
}
</script>

