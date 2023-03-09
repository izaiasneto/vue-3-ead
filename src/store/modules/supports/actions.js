import SupportService from "@/services/support.service"

const actions = {

    getSupportsOfLesson ({commit}, lessonId){
        return SupportService.getSupportByLesson(lessonId)
                                .then(supports => commit('SET_SUPPORTS', supports))
    }
}

export default actions