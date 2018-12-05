<template>
  <i :class="`fa-${name}`" class="fa" aria-hidden="true"/>
</template>

<script>
export default {
  name: 'FaIcon',
  props: {
    name: {
      type: String,
      required: false,
      default: 'font-awesome'
    }
  }
}
</script>
