const { mailTrapClient, sender } = require("./mailtrap.config");

const sendVerificationEmail = async (email, verificationToken, name) => {
  const recipient = [{ email }];

  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "904eba78-d15a-4fc8-807c-44db2acb6900",
      template_variables: {
        company_info_name: "TraderX Capital",
        name: name,
        VERIFICATION_CODE: verificationToken,
      },
    });

    console.log("Email sent successfully");
  } catch (err) {
    console.log("Error sending email", err);
  }
};

const sendPasswordResetEmail = async (email, resetToken) => {
  const recipient = [{ email }];
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "96e97301-1c67-4fac-939c-8cee04de3c30",
      template_variables: {
        resetToken: resetToken,
      },
    });

    console.log("Email sent successfully");
  } catch (err) {
    console.log("Error sending email", err);
  }
};

const sendResetSuccessfulEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "7793988c-cdfb-49bd-8f49-49d3fbb131d9",
      template_variables: {},
    });

    console.log("Email sent successfully");
  } catch (err) {
    console.log("Error sending email", err);
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendResetSuccessfulEmail,
};
