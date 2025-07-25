import { io, type Socket } from "socket.io-client";

const API_BASE_URL = "https://becky-beauty-botique-1.onrender.com/api";

class ApiClient {
  private token: string | null = null;
  private socket: Socket | null = null;

  constructor() {
    this.token = localStorage.getItem("becky_beauty_token");
    this.initializeSocket();
  }

  private initializeSocket() {
    if (typeof window !== "undefined") {
      this.socket = io("https://becky-beauty-botique-1.onrender.com", {
        autoConnect: false,
      });

      if (this.token) {
        this.socket.connect();
        const user = this.getCurrentUser();
        if (user) {
          this.socket.emit("join-user", user.id);
        }
      }
    }
  }

  private getCurrentUser() {
    const userStr = localStorage.getItem("becky_beauty_user");
    return userStr ? JSON.parse(userStr) : null;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Something went wrong");
    }

    return response.json();
  }

  // Auth methods
  async login(email: string, password: string) {
    const data = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    this.token = data.token;
    localStorage.setItem("becky_beauty_token", data.token);
    localStorage.setItem("becky_beauty_user", JSON.stringify(data.user));

    // Connect socket
    if (this.socket) {
      this.socket.connect();
      this.socket.emit("join-user", data.user.id);
    }

    return data;
  }

  async register(name: string, email: string, password: string) {
    const data = await this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    this.token = data.token;
    localStorage.setItem("becky_beauty_token", data.token);
    localStorage.setItem("becky_beauty_user", JSON.stringify(data.user));

    // Connect socket
    if (this.socket) {
      this.socket.connect();
      this.socket.emit("join-user", data.user.id);
    }

    return data;
  }

  logout() {
    this.token = null;
    localStorage.removeItem("becky_beauty_token");
    localStorage.removeItem("becky_beauty_user");

    if (this.socket) {
      this.socket.disconnect();
    }
  }

  // Products
  async getProducts(params: any = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/products?${queryString}`);
  }

  async getFeaturedProducts() {
    return this.request("/products/featured");
  }

  async getProduct(id: string) {
    return this.request(`/products/${id}`);
  }

  // Cart
  async getCart() {
    return this.request("/cart");
  }

  async addToCart(productId: string, quantity = 1) {
    return this.request("/cart/add", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    });
  }

  async updateCartItem(productId: string, quantity: number) {
    return this.request(`/cart/update/${productId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    });
  }

  async removeFromCart(productId: string) {
    return this.request(`/cart/remove/${productId}`, {
      method: "DELETE",
    });
  }

  async clearCart() {
    return this.request("/cart/clear", {
      method: "DELETE",
    });
  }

  // Orders
  async getOrders(params: any = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/orders?${queryString}`);
  }

  async getOrder(id: string) {
    return this.request(`/orders/${id}`);
  }

  async createOrder(orderData: any) {
    return this.request("/orders/create", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  }

  async cancelOrder(id: string) {
    return this.request(`/orders/${id}/cancel`, {
      method: "PUT",
    });
  }

  // Wishlist
  async getWishlist() {
    return this.request("/wishlist");
  }

  async addToWishlist(productId: string) {
    return this.request(`/wishlist/add/${productId}`, {
      method: "POST",
    });
  }

  async removeFromWishlist(productId: string) {
    return this.request(`/wishlist/remove/${productId}`, {
      method: "DELETE",
    });
  }

  // Profile
  async getProfile() {
    return this.request("/profile");
  }

  async updateProfile(profileData: any) {
    return this.request("/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request("/profile/change-password", {
      method: "PUT",
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // Socket methods
  onCartUpdate(callback: (cart: any) => void) {
    if (this.socket) {
      this.socket.on("cart-updated", callback);
    }
  }

  onWishlistUpdate(callback: (wishlist: any) => void) {
    if (this.socket) {
      this.socket.on("wishlist-updated", callback);
    }
  }

  onOrderUpdate(callback: (order: any) => void) {
    if (this.socket) {
      this.socket.on("order-updated", callback);
    }
  }
}

export const apiClient = new ApiClient();
