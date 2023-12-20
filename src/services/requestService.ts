import API from "../http/http"

class RequestService {
    static async sendEmail(email: string) {
        return API.post('/endpoint/', { email })
    }
}

export default RequestService