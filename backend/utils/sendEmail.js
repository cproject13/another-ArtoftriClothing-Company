const Sib = require("sib-api-v3-sdk")


const sendEmail = async (options) => {
  const client = Sib.ApiClient.instance
  const apiKey = client.authentications['api-key']
  apiKey.apiKey = process.env.API_KEY

  const tranEmailApi = new Sib.TransactionalEmailsApi()

  const sender = {
    email: 'cproject.website@gmail.com'
  }
  const receiver = [{
    email: options.email
  }]
  tranEmailApi.sendTransacEmail({
    sender,
    to: receiver,
    subject: options.subject,
    textContent: options.message
  }).then(console.log)
};


module.exports = sendEmail;
