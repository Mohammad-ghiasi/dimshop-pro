import axios from "axios";

export const emailSender = async (to: string) => {
  try {
    const res = await fetch("/api/sendverifyemail", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to send email");
    }

    const data = await res.json();
    return data;
    // const res = axios.post(
    //   "/api/sendverifyemail",
    //   { to },
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // if (!res) {
    //   throw new Error("Failed to send email");
    //   console.error("Failed to send email");
    // }
    // return res.data

    console.log("Email sent successfully:", data);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};



export const verifyEmai = async (code: string) => {
  try {
    const res = await fetch("/api/verifyemmailcode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code // your verification code
      }),
    });

    // Check if the response is not okay
    if (!res.ok) {
      const errorData = await res.json(); // Capture the error response body
      throw new Error(errorData.error || "Failed to send email");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error during verification:");
  }
};