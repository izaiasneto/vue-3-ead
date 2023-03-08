import BaseService from "./base.service";
import { TOKEN_NAME } from '@/configs'

export default class ResetPasswordService extends BaseService{

    static async forgetPassword (params) {
        return new Promise((resolve, reject) => {
            this.request()
                .post('/forgot-password', params)
                .then(response => {
                    localStorage.setItem(TOKEN_NAME, response.data.token)
                    resolve(response)
                })
                .catch(error => reject(error.response))
        })
    }

    static async reset (params) {
        return new Promise((resolve, reject) => {
            this.request()
                .post('/reset-password', params)
                .then(response => {
                    localStorage.setItem(TOKEN_NAME, response.data.token)
                    resolve(response)
                })
                .catch(error => reject(error.response))
        })
    }


}