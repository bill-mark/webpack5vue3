<template>
  <div class="home">
    home
  </div>
  <div @click="handlegoto">go about</div>
</template>

<script>
import { useRouter } from "vue-router"
export default {
  name: 'Home',
  setup(){
    const {handlegoto} = useEffect_goto()
    return {handlegoto}
  }
}

const useEffect_goto = ()=>{
    const router = useRouter()
    const handlegoto = ()=>{
        router.push({ name: "About" });
    }

    return {handlegoto}
}

</script>
