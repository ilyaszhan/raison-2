import RequestService from "../services/requestService"

class RequestController {
    static requestService = RequestService

    static async sendEmail(email: string) {
        try {
            const data = await this.requestService.sendEmail(email)
            console.log(data)
            return false
        } catch {
            return true
        }
    }
}

export default RequestController