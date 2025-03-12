// Mock admin credentials (in a real app, use a backend API)
const ADMIN_EMAIL = "admin@stringartnepal.com";
const ADMIN_HASHED_PASSWORD = "admin123"; // Mocked, should be hashed in a real app

// Helper function for session storage
const AuthStorage = {
  setAuthenticated: () => sessionStorage.setItem("admin_authenticated", "true"),
  clearAuthenticated: () => sessionStorage.removeItem("admin_authenticated"),
  isAuthenticated: (): boolean => sessionStorage.getItem("admin_authenticated") === "true",
};

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  return AuthStorage.isAuthenticated();
}

// Simulated hashing function (use bcrypt in a real app)
async function mockHashCompare(inputPassword: string, storedPassword: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate processing delay
  return inputPassword === storedPassword; // Replace with actual hash comparison
}

// Login admin
export async function loginAdmin(email: string, password: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulated API delay

  if (email === ADMIN_EMAIL && (await mockHashCompare(password, ADMIN_HASHED_PASSWORD))) {
    AuthStorage.setAuthenticated();
    window.location.href = "/admin/dashboard"; // Redirect to admin panel
    return true;
  }

  return false;
}

// Logout admin
export async function logoutAdmin(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300)); // Simulated API delay

  AuthStorage.clearAuthenticated();
  window.location.href = "/login"; // Redirect to login page
}
