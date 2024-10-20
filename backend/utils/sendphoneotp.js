import twilio from "twilio"

const SendPhoneOtp= async(verificationOTPphone, PhoneNum) =>{
    
    console.log("TWILIO_SID:", process.env.TWILIO_SID);
    console.log("TWILIO_TOKEN:", process.env.TWILIO_TOKEN);
        const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
        console.log(client)

        client.messages.create({
            body: verificationOTPphone + ' is your verificationd code for Cuvette',
            messagingServiceSid: process.env.TWILIO_SERVICESID,
            to: PhoneNum
        }).then((response)=>{
            console.log(response," opt is send successfully ")
        }).catch((error)=>{
            console.log(error)
        })
  
}

















// import fast2sms from "fast-two-sms"


// const SendPhoneOtp= async(verificationOTPphone, PhoneNum) =>{
//  var options = {

//     authorization: process.env.FASTTWOSMS_API,
//     message:`This is Cuvette Verification Opt is ${verificationOTPphone} This OTP is valid for the next 15 minutes. Please do not share this code with anyone. ` ,
//     numbers:[PhoneNum]
// }

// fast2sms.sendMessage(options).then((response)=>{
//         console.log(response)

// }).catch((error)=>{
//     console.log(error, "falid sending opt to phone ")
// })
// }


export {SendPhoneOtp}


