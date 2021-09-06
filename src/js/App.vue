<script>
  import Test from './Test.vue';

  export default {
    name: 'APP',
    components: {
      Test
    },
    mounted() {
      console.log('app mounted');

      document.documentElement.classList.remove('no-js');
      document.documentElement.classList.add('js');
    }
  }
</script>
