import createWelcomeEmailTemplate from "./emailTemplate.js"
import { resendClient, sender } from "../lib/resend.js"
const sendWelcomeEmail = async (email, name, clientURL) => {
    const { data, error } = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: "Welcome to TalkFlow!",
        html: createWelcomeEmailTemplate(name, clientURL)
    })

    if (error) {
        console.log("Error sending the Email :", error);
        throw new Error("Failed to send Email")
    }

    console.log("Welcome Email send Successfully", data);


}
export default sendWelcomeEmail;