<script>
import { onMounted } from 'vue';
import Test from '@/Test.vue';

export default {
  name: 'APP',
  components: {
    Test
  },
  setup() {
    onMounted(() => {
      console.log('mounted!')

      document.documentElement.classList.remove('no-js');
      document.documentElement.classList.add('js');
    })
  },
}
</script>
