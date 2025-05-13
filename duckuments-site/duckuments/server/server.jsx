import { FileDiffIcon } from "lucide-react";
import { useState, useEffect } from "react";

const API_URL = "http://127.0.0.1:8000/";

function useLogin() {
  const loginUrl = API_URL + "account/login/";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  const loginUserFunc = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Login failed");
      }

      const data = await res.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loginUserFunc, loading, error, userData };
}

function useSignup() {
  const signupUrl = API_URL + "account/signup/";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  const signupUserFunc = async (email, username, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(signupUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, username, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "signup failed");
      }

      const data = await res.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { signupUserFunc, loading, error, userData };
}

function useForgotPassword() {
  const signupUrl = API_URL + "account/password/";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  const changePasswordFunc = async (email) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(signupUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "change password failed");
      }

      const data = await res.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { changePasswordFunc, loading, error, userData };
}

function useNewProject() {
  const formData = new FormData();
  const newProjectUrl = API_URL + "project/new/";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  const NewProjectFunc = async (
    title,
    description,
    language,
    zip_file,
    token
  ) => {
    setLoading(true);
    setError(null);

    try {
      formData.append("title", title);
      formData.append("description", description);
      formData.append("language", language);
      formData.append("zip_file", zip_file);

      const res = await fetch(newProjectUrl, {
        headers: {
          Authorization: `Bearer  ${token}`,
        },
        credentials: "include",
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "new project failed");
      }

      const data = await res.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { NewProjectFunc, loading, error, userData };
}

function useAllUserProjects() {
  const newProjectUrl = API_URL + "project/all/";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState([]);

  const UserProjectFunc = async (token) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(newProjectUrl, {
        headers: {
          Authorization: `Bearer  ${token}`,
        },
        credentials: "include",
        method: "GET",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "get all user projects failed");
      }

      const data = await res.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { UserProjectFunc, loading, error, userData };
}

function useGetFileContent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ProjectData, setProjectData] = useState(null);

  const getFileContentFunc = async (token, project_slug, searchParams = "") => {
    setLoading(true);
    setError(null);

    const urlParams = new URLSearchParams({ path: searchParams });

    const fileContentUrl = API_URL + `project/doc/${project_slug}?` + urlParams.toString();
    console.log("url is :",fileContentUrl)

    // const fileContentUrl = API_URL + `project/doc/${project_slug}`;

    try {
      const res = await fetch(fileContentUrl, {
        headers: {
          Authorization: `Bearer  ${token}`,
        },
        credentials: "include",
        method: "GET",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "get all user projects failed");
      }

      const data = await res.json();
      setProjectData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { getFileContentFunc, loading, error, ProjectData };
}

export {
  useForgotPassword,
  useLogin,
  useSignup,
  useNewProject,
  useAllUserProjects,
  useGetFileContent,
};
