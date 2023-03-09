import BaseService from "./base.service";

export default class SupportService extends BaseService{
    
    static async getSupportByLesson (lessonId) {
        return new Promise((resolve, reject) => {
            this.request({auth: true})
                .get('/supports', {
                    params: {lesson: lessonId}
                })
                .then(response => resolve(response.data))
                .catch(error => reject(error.response))
        })
    }
}