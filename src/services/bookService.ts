const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchBooks = async (query: string, token: string) => {
  const url = query
    ? `${apiUrl}/product/search?q=${query}`
    : `${apiUrl}/product/explore`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch books. Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.isError) {
      throw new Error(data.errorMessage || "Error fetching books");
    }

    return data.result.products || [];
  } catch (error) {
    return [];
  }
};

export const fetchBookById = async (id: string) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await fetch(`${apiUrl}/product/details?productId=${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

export const login = async (email: string, password: string) => {
  const url = "https://bookbuzz.inloya.com/api/v1/account/login";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Login failed. Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.isError) {
      throw new Error(data.errorMessage || "Invalid credentials");
    }

    return data.result.jwt;
  } catch (error: any) {
    throw new Error(error.message || "Login failed");
  }
};
