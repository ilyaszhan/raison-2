import RequestService from "../services/requestService"

class RequestController {
    static requestService = RequestService

    static async sendEmail(email: string) {
        try {
            await this.requestService.sendEmail(email)
            return true
        } catch {
            return false
        }
    }
}

export default RequestController