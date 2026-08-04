import apiClient from "../api/axios";

const BACKEND_ORIGIN = "http://localhost:8080";

function normalizeUser(user) {
  if (!user) return user;
  const avatarUrl = user.profileImageUrl
    ? (user.profileImageUrl.startsWith("http") ? user.profileImageUrl : `${BACKEND_ORIGIN}${user.profileImageUrl}`)
    : null;
  return { ...user, avatarUrl };
}


const EDUCATION_LEVEL_MAP = {
  "Orta təhsil": "HIGH_SCHOOL",
  "Peşə təhsili": "HIGH_SCHOOL",
  "Subbakalavr": "BACHELOR",
  "Bakalavr": "BACHELOR",
  "Magistratura": "MASTER",
  "Doktorantura": "PHD",
  "Məzun": "BACHELOR",
};

function mapEducationLevel(label) {
  return EDUCATION_LEVEL_MAP[label] ?? null;
}

function buildRegisterPayload(formData) {
  return {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    password: formData.password,
    confirmPassword: formData.confirmPassword,
    phoneNumber: formData.phone,
    birthDate: formData.birthDate, 
    university: formData.university,
    major: formData.major,
    educationLevel: mapEducationLevel(formData.educationLevel),
    interests: formData.interests?.length ? formData.interests : [],
    termsAccepted: formData.acceptTerms,
    newsletter: formData.acceptMarketing,
  };
}

export async function login(credentials) {
  const { data } = await apiClient.post("/auth/login", credentials);

  if (!data.token) {
    throw new Error("Login uğursuz oldu. Token tapılmadı.");
  }

  localStorage.setItem("authToken", data.token);


  if (data.refreshToken) {
    localStorage.setItem("refreshToken", data.refreshToken);
  }

  const meResponse = await apiClient.get("/auth/me");

  const user = normalizeUser(meResponse.data.user);

  localStorage.setItem("user", JSON.stringify(user));

  return user;
}

export async function register(formData) {
  const payload = buildRegisterPayload(formData);
  const { data } = await apiClient.post("/auth/register", payload);

  if (data.accessToken) {
    localStorage.setItem("authToken", data.accessToken);


    if (data.refreshToken) {
      localStorage.setItem("refreshToken", data.refreshToken);
    }

    const meResponse = await apiClient.get("/auth/me");

    const user = normalizeUser(meResponse.data.user);

    localStorage.setItem("user", JSON.stringify(user));

    return user;
  }

  return data;
}

export async function loginWithGoogle(idToken) {
  const { data } = await apiClient.post("/auth/google", { idToken });

  if (!data.token) {
    throw new Error("Google login uğursuz oldu. Token tapılmadı.");
  }

  localStorage.setItem("authToken", data.token);

  if (data.refreshToken) {
    localStorage.setItem("refreshToken", data.refreshToken);
  }

  const meResponse = await apiClient.get("/auth/me");
  const user = normalizeUser(meResponse.data.user);

  localStorage.setItem("user", JSON.stringify(user));

  return user;
}


export async function logout() {
  const refreshToken = localStorage.getItem("refreshToken");

  if (refreshToken) {
    try {
      await apiClient.post("/auth/logout", { refreshToken });
    } catch (err) {
      console.error("Backend logout çağırışı uğursuz oldu:", err);
    }
  }

  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
}

export async function getCurrentUser() {
  const { data } = await apiClient.get("/auth/me");

  if (import.meta.env?.DEV && data?.user && data.user.profileCompleted === undefined) {
    console.warn(
      "[authService] /auth/me cavabında 'profileCompleted' sahəsi tapılmadı. " +
      "Backend CompleteProfileRequest / UserResponse DTO-sunu yoxlayın."
    );
  }

  return normalizeUser(data.user);

}


export async function resendVerification(email) {
  const { data } = await apiClient.post(
    "/auth/resend-verification",
    null,
    {
      params: {
        email,
      },
    }
  );

  return data;
}

export async function verifyEmail(token) {
  const { data } = await apiClient.get("/auth/verify-email", {
    params: { token },
  });
  return data;
}

export async function updateProfile(payload) {
  const { data } = await apiClient.put("/users/me", payload);
  return data.user ?? data;
}

export async function changePassword(currentPassword, newPassword) {
  const { data } = await apiClient.put("/users/change-password", {
    currentPassword,
    newPassword,
  });
  return data;
}

export async function deleteAccount() {
  const { data } = await apiClient.delete("/users/me");
  return data;
}