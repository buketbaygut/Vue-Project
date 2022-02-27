import router from "./router";
import VueCookies from 'vue-cookies'

router.beforeEach((to,from,next)=>{
    console.log(to)
    if (to.path === "/") {
        if(getTokenCookies()){
            next("/profile")
        }
    }else if(to.path === "/profile"){
        if(!getTokenCookies()){
            next("/")
        }
    }

    next()
    

})

function getTokenCookies() {
    return VueCookies.get('accessToken')
}