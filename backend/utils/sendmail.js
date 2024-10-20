import nodemailer from "nodemailer";

const sendVerificationEmail = async (email, otp, name) => {
    console.log(email);
    try {
        // Create a transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        // Define the email options
        const mailOptions = {
            from: {
                name: "Cuvette OTP",
                address: process.env.USER_EMAIL,
            },
            to: email, // No need for an array if it's a single email
            subject: "Cuvette Signup OTP",
            html: `
<head>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      color: #333;
      background-color: #fff;
    }

    .container {
      margin: 0 auto;
      width: 100%;
      max-width: 600px;
      padding: 0 0px;
      padding-bottom: 10px;
      border-radius: 5px;
      line-height: 1.8;
    }

    .header {
      border-bottom: 1px solid #eee;
    }

    .header a {
      font-size: 1.4em;
      color: #000;
      text-decoration: none;
      font-weight: 600;
    }

    .content {
      min-width: 700px;
      overflow: auto;
      line-height: 2;
    }

    .otp {
      background: linear-gradient(to right, #00bc69 0, #00bc88 50%, #00bca8 100%);
      margin: 0 auto;
      width: max-content;
      padding: 0 10px;
      color: #fff;
      border-radius: 4px;
    }

    .footer {
      color: #aaa;
      font-size: 0.8em;
      line-height: 1;
      font-weight: 300;
    }

    .email-info {
      color: #666666;
      font-weight: 400;
      font-size: 13px;
      line-height: 18px;
      padding-bottom: 6px;
    }

    .email-info a {
      text-decoration: none;
      color: #00bc69;
    }
  </style>
</head>

<body>
  <!--Subject: Login Verification Required for Your Cuvette Account-->
  <div class="container">
    <div class="header">
      <a>Prove Your Cuvette Identity</a>
    </div>
    <br />
    <strong>Dear ${name},</strong>
    <p>
      We have received a login request for your Cuvette account. For
      security purposes, please verify your identity by providing the
      following One-Time Password (OTP).
      <br />
      <b>Your One-Time Password (OTP) verification code is:</b>
    </p>
    <h2 class="otp">${otp}</h2>
    <p style="font-size: 0.9em">
      <strong>One-Time Password (OTP) is valid for 15 minutes.</strong>
      <br />
      <br />
      If you did not initiate this login request, please disregard this
      message. Please ensure the confidentiality of your OTP and do not share
      it with anyone.<br />
      <strong>Do not forward or give this code to anyone.</strong>
      <br />
      <br />
      <strong>Thank you for using Cuvette.</strong>
      <br />
      <br />
      Best regards,
      <br />
      <strong>Cuvette</strong>
    </p>

    <hr style="border: none; border-top: 0.5px solid #131111" />
    <div class="footer">
      <p>This email can't receive replies.</p>
      <p>
        For more information about Cuvette and your account, visit
        <strong>Cuvette</strong>
      </p>
    </div>
  </div>
  <div style="text-align: center">
    <div class="email-info">
      <span>
        This email was sent to
        <a href="mailto:${email}">${email}</a>
      </span>
    </div>
    <div class="email-info">
      <a href="/">Cuvette</a> | rahulmandalzzz123@gmail.com
       - 370101, india
    </div>
    <div class="email-info">
      &copy; 2023 Cuvette. All rights
      reserved.
    </div>
  </div>
</body>
</html>
            `
        };

        // Send the email
        const sendMail = async () => {
            try {
                const info = await transporter.sendMail(mailOptions);
                console.log("Email sent: " + info.response); // Log the response
            } catch (error) {
                console.error("Error sending email:", error);
            }
        };

        await sendMail(); // Wait for the mail to be sent

    } catch (error) {
        console.error("Error in sendVerificationEmail:", error);
    }
};


const sendInterviewEmail = async (jobData) => {
    const { JobTitle, JobDescription, Experiencelevel, candidate, lastdate } = jobData;

    try {
        // Create a transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        // Send email to each candidate in the candidate array
        for (const email of candidate) {
            // Define the email options
            const mailOptions = {
                from: {
                    name: "Company Interview",
                    address: process.env.USER_EMAIL,
                },
                to: email,
                subject: `Interview Invitation for ${JobTitle}`,
                html: `
<head>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      color: #333;
      background-color: #fff;
    }

    .container {
      margin: 0 auto;
      width: 100%;
      max-width: 600px;
      padding: 0 0px;
      padding-bottom: 10px;
      border-radius: 5px;
      line-height: 1.8;
    }

    .header {
      border-bottom: 1px solid #eee;
    }

    .header a {
      font-size: 1.4em;
      color: #000;
      text-decoration: none;
      font-weight: 600;
    }

    .content {
      min-width: 700px;
      overflow: auto;
      line-height: 2;
    }

    .job-details {
      background: #f5f5f5;
      padding: 10px;
      border-radius: 4px;
    }

    .footer {
      color: #aaa;
      font-size: 0.8em;
      line-height: 1;
      font-weight: 300;
    }

    .email-info {
      color: #666666;
      font-weight: 400;
      font-size: 13px;
      line-height: 18px;
      padding-bottom: 6px;
    }

    .email-info a {
      text-decoration: none;
      color: #00bc69;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <a>Interview Invitation</a>
    </div>
    <br />
    <strong>Dear Candidate,</strong>
    <p>
      We are pleased to inform you that you have been shortlisted for an interview for the position of <strong>${JobTitle}</strong> at our company.
    </p>
    <div class="job-details">
      <p><strong>Job Title:</strong> ${JobTitle}</p>
      <p><strong>Job Description:</strong> ${JobDescription}</p>
      <p><strong>Experience Level:</strong> ${Experiencelevel}</p>
      <p><strong>Interview End Date:</strong> ${new Date(lastdate).toLocaleDateString()}</p>
    </div>
    <p>
      Please confirm your availability for the interview at your earliest convenience. We look forward to meeting with you and discussing your qualifications in detail.
    </p>
    <p style="font-size: 0.9em">
      <strong>Note:</strong> Please ensure that you respond by the interview end date mentioned above. If you have any questions, feel free to reach out to us.
      <br />
      <br />
      Thank you for your interest in joining our team.
    </p>

    <hr style="border: none; border-top: 0.5px solid #131111" />
    <div class="footer">
      <p>This email can't receive replies.</p>
      <p>
        For more information about our company and the interview process, feel free to reach out to us.
      </p>
    </div>
  </div>
  <div style="text-align: center">
    <div class="email-info">
      <span>
        This email was sent to
        <a href="mailto:${email}">${email}</a>
      </span>
    </div>
    <div class="email-info">
      &copy; ${new Date().getFullYear()} Cuvette. All rights reserved.
    </div>
  </div>
</body>
</html>
                `,
            };

            // Send the email
            const sendMail = async () => {
                try {
                    const info = await transporter.sendMail(mailOptions);
                    console.log(`Email sent to ${email}: ${info.response}`); // Log the response
                } catch (error) {
                    console.error(`Error sending email to ${email}:`, error);
                }
            };

            await sendMail(); // Wait for the mail to be sent for each candidate
        }

    } catch (error) {
        console.error("Error in sendInterviewEmail:", error);
    }
};


export { sendVerificationEmail ,sendInterviewEmail };
