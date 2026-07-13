export async function loginUser(data) {
  try {
    const res = await fetch("/api/Auths/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    // console.log(res);
    const text = await res.text();
    // console.log(text);

    if (!res.ok) {
      throw new Error(text);
    }

    const user = JSON.parse(text);
    console.log(user);
    // console.log(user);
    return { success: true, user };
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function confirmAccount(userId, token) {
  try {
    // console.log(data);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Auths/confirm-email?UserId=${userId}&Token=${token}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      },
    );
    console.log(res);

    if (!res.ok) {
      let errorMessage = "Registration failed";
      const errorText = await res.text();
      console.log("error231", errorText);
      return { error: errorText || errorMessage };
    }

    return { success: "confirmation email sent" };
  } catch (err) {
    console.error("Error during registration:", err);
    return { error: err.message };
  }
}

export async function registerUser(data) {
  try {
    const formData = new FormData();

    formData.append("UserName", data.UserName);
    formData.append("FullName", data.FullName);
    formData.append("Email", data.Email);
    formData.append("PhoneNumber", data.PhoneNumber);
    formData.append("UniversityId", data.UniversityId);
    formData.append("CollegeId", data.CollegeId);
    formData.append("Password", data.Password);

    // مهم: الملف
    if (data.ProfilePictureUrl) {
      formData.append("ProfilePictureUrl", data.ProfilePictureUrl);
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Auths/register`,
      {
        method: "POST",

        body: formData,
      },
    );

    console.log("res", res);
    // const resData = await res.json();
    // console.log("resData", resData);

    if (!res.ok) {
      let errorMessage = "Registration failed";
      const errorText = await res.text();
      console.log(errorText);
      return { error: errorText || errorMessage };
    }

    return { success: "check you email for confirmation" };
  } catch (err) {
    console.error("Error during registration:", err);
    return { error: err.message };
  }
}

export async function publishProduct(publishData) {
  try {
    const formData = new FormData();
    formData.append("Title", publishData.title);
    formData.append("Description", publishData.description);
    formData.append("CollegeId", parseInt(publishData.collegeId));
    formData.append("CategoryId", parseInt(publishData.categoryId));
    formData.append("DailyPrice", parseFloat(publishData.dailyPrice));
    formData.append(
      "MinReputationScore",
      parseInt(publishData.minReputationScore),
    );
    formData.append("InsuranceAmount", parseFloat(publishData.insuranceAmount));
    formData.append(
      "AvailableFrom",
      new Date(publishData.availableFrom).toISOString(),
    );
    formData.append(
      "AvailableTo",
      new Date(publishData.availableTo).toISOString(),
    );
    formData.append("IsAvailable", publishData.isAvailable ? "true" : "false");
    formData.append("Image", publishData.image);

    // fetch to api

    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Tools`,
      {
        method: "POST",
        body: formData,
      },
    );

    console.log("Status Code:", response.status);
    console.log("Redirected:", response.redirected);

    console.log("response sexxxxxxxx", response);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to publish product:", errorText);
      throw new Error(errorText || "Failed to publish product");
    }

    const resData = await response.text();

    console.log("resData", resData);

    return { success: "Product published successfully" };
  } catch (err) {
    console.error("Error during publish:", err);
    throw err; //rethrow to get catch by useMutation
  }
}
