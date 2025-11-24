"use client";

import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [authToken, setAuthToken] = useState<string>("");

  const testQueries: Record<string, { description: string; query: string }> = {
    health: {
      description: "Health Check",
      query: `query { health }`,
    },
    register: {
      description: "Register New User",
      query: `mutation {
        register(email: "user@example.com", password: "password123", name: "Test User") {
          token
          user {
            id
            email
            name
            role
          }
        }
      }`,
    },
    login: {
      description: "Login User",
      query: `mutation {
        login(email: "user@example.com", password: "password123") {
          token
          user {
            id
            email
            name
            role
          }
        }
      }`,
    },
    me: {
      description: "Get Current User Profile",
      query: `query { me { id email name phone role } }`,
    },
    categories: {
      description: "Get All Categories",
      query: `query { categories { id name slug description } }`,
    },
    brands: {
      description: "Get All Brands",
      query: `query { brands { id name slug } }`,
    },
    products: {
      description: "Get Products (Paginated)",
      query: `query {
        products(page: 1, perPage: 10) {
          items {
            id
            name
            slug
            price
            stock
            isFeatured
          }
          total
          page
          perPage
        }
      }`,
    },
    featuredProducts: {
      description: "Get Featured Products",
      query: `query { featuredProducts(limit: 5) { id name price } }`,
    },
    searchProducts: {
      description: "Search Products",
      query: `query {
        searchProducts(query: "phone", page: 1, perPage: 5) {
          items { id name price }
          total
        }
      }`,
    },
    cart: {
      description: "Get Shopping Cart",
      query: `query { cart { items { id product { name } quantity price } subtotal } }`,
    },
    cartItemCount: {
      description: "Get Cart Item Count",
      query: `query { cartItemCount }`,
    },
    addresses: {
      description: "Get User Addresses",
      query: `query { addresses { id label fullName phone country city street } }`,
    },
    userOrderHistory: {
      description: "Get User Orders",
      query: `query { userOrderHistory(page: 1, perPage: 10) { orderNumber status total createdAt } }`,
    },
    wishlist: {
      description: "Get Wishlist",
      query: `query { wishlist { id name price } }`,
    },
    wishlistItemCount: {
      description: "Get Wishlist Count",
      query: `query { wishlistItemCount }`,
    },
    addToCart: {
      description: "Add Product to Cart",
      query: `mutation {
        addToCart(productId: "replace_with_product_id", quantity: 1) {
          items { id quantity }
          subtotal
          itemCount
        }
      }`,
    },
    createAddress: {
      description: "Create New Address",
      query: `mutation {
        createAddress(
          fullName: "John Doe"
          phone: "+201234567890"
          country: "Egypt"
          city: "Cairo"
          street: "123 Main St"
          label: "Home"
        ) {
          id
          label
          fullName
          city
        }
      }`,
    },
    createOrder: {
      description: "Create Order",
      query: `mutation {
        createOrder(
          items: [
            { productId: "replace_with_product_id", quantity: 1 }
          ]
          shippingName: "John Doe"
          shippingPhone: "+201234567890"
          shippingCountry: "Egypt"
          shippingCity: "Cairo"
          shippingStreet: "123 Main St"
          customerNotes: "Please deliver in morning"
        ) {
          orderNumber
          status
          total
          items { productName quantity price }
        }
      }`,
    },
    createProduct: {
      description: "Create Product (Admin)",
      query: `mutation {
        createProduct(
          name: "Sample Product"
          slug: "sample-product"
          price: 99.99
          stock: 100
          categoryId: "replace_with_category_id"
          images: ["https://via.placeholder.com/400"]
        ) {
          id
          name
          price
          slug
        }
      }`,
    },
    createCategory: {
      description: "Create Category (Admin)",
      query: `mutation {
        createCategory(
          name: "Electronics"
          slug: "electronics"
          description: "Electronic devices"
        ) {
          id
          name
          slug
        }
      }`,
    },
    createCoupon: {
      description: "Create Coupon (Admin)",
      query: `mutation {
        createCoupon(
          code: "WELCOME10"
          discountType: PERCENTAGE
          discountValue: 10
          minPurchase: 100
          maxUseCount: 100
          expiresAt: "2025-12-31T23:59:59Z"
        ) {
          id
          code
          discountValue
        }
      }`,
    },
    validateCoupon: {
      description: "Validate Coupon",
      query: `query {
        validateCoupon(code: "WELCOME10", orderTotal: 500) {
          valid
          coupon { code discountValue }
          discount
          error
        }
      }`,
    },
    createReview: {
      description: "Create Review",
      query: `mutation {
        createReview(
          productId: "replace_with_product_id"
          rating: 5
          title: "Great product!"
          comment: "Exactly what I needed"
        ) {
          id
          rating
          title
          user { name }
        }
      }`,
    },
    productReviews: {
      description: "Get Product Reviews",
      query: `query {
        productReviews(productId: "replace_with_product_id", page: 1, perPage: 5) {
          id
          rating
          title
          comment
          user { name }
        }
      }`,
    },
    logout: {
      description: "Logout User",
      query: `mutation { logout { success message } }`,
    },
  };

  const executeQuery = async (gql: string) => {
    setLoading(true);
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      // Add auth token if available
      if (authToken) {
        headers["Cookie"] = `authToken=${authToken}`;
      }

      const response = await fetch("/api/graphql", {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify({ query: gql }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.log("[v0] HTTP Error:", response.status, text);
        setResult({
          error: `HTTP ${response.status}: ${text.substring(0, 100)}`,
        });
        return;
      }

      const data = await response.json();
      console.log("[v0] GraphQL Response:", data);
      setResult(data);

      // Extract and store token if present (from login/register)
      if (data.data?.login?.token || data.data?.register?.token) {
        const token = data.data.login?.token || data.data.register?.token;
        setAuthToken(token);
      }
    } catch (error: any) {
      console.log("[v0] Fetch Error:", error);
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            ABI GraphQL Backend
          </h1>
          <p className="text-gray-400 text-lg">
            Complete e-commerce GraphQL API with 38 queries and 51 mutations
          </p>
        </div>

        {/* Auth Status */}
        {authToken && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
            <p className="text-green-400 text-sm">
              ✓ Authenticated - Token stored. Your queries will use this token.
            </p>
            <button
              onClick={() => {
                setAuthToken("");
                executeQuery(`mutation { logout { success message } }`);
              }}
              className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
            >
              Clear Token
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Query Selector */}
          <div className="lg:col-span-1 space-y-4">
            <div className="sticky top-8">
              <h2 className="text-xl font-semibold text-white mb-4">
                Test Queries
              </h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {Object.entries(testQueries).map(([key, { description }]) => (
                  <button
                    key={key}
                    onClick={() => executeQuery(testQueries[key].query)}
                    disabled={loading}
                    className="w-full text-left px-3 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-600 text-gray-100 text-sm transition-colors disabled:opacity-50 hover:disabled:bg-slate-700/50"
                    title={description}
                  >
                    <span className="line-clamp-2">{description}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Query Input and Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Custom Query Input */}
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-white">Custom Query</h2>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your GraphQL query here... Example: query { categories { id name } }"
                className="w-full h-32 p-4 bg-slate-700/50 border border-slate-600 rounded-lg text-gray-100 font-mono text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => executeQuery(query)}
                disabled={loading || !query}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⚙️</span> Executing...
                  </span>
                ) : (
                  "Execute Query"
                )}
              </button>
            </div>

            {/* Results */}
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-white">Results</h2>
              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 min-h-64 max-h-96 overflow-auto">
                {result ? (
                  <pre className="text-sm text-gray-100 font-mono whitespace-pre-wrap break-words">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                ) : (
                  <p className="text-gray-400 text-center py-12">
                    Click a query or enter custom GraphQL to see results
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Documentation */}
        <div className="mt-12 bg-slate-700/50 border border-slate-600 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Setup Instructions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300 text-sm">
            <div>
              <h3 className="font-semibold text-white mb-2">
                1. Environment Variables
              </h3>
              <code className="block bg-slate-800/50 p-3 rounded mb-2 text-xs">
                NEON_NEON_DATABASE_URL="your_neon_db_url"
                <br />
                JWT_SECRET="your_secret_key"
              </code>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">
                2. Database Migration
              </h3>
              <code className="block bg-slate-800/50 p-3 rounded mb-2 text-xs">
                npx prisma migrate dev --name init
                <br />
                npx prisma generate
              </code>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">
                3. Authentication Flow
              </h3>
              <p className="text-xs">
                • Test "Register New User" or "Login User" first
                <br />• Token stored automatically
                <br />• Protected queries use stored token
                <br />• JWT expires in 7 days
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">4. Test Flow</h3>
              <p className="text-xs">
                1. Register/Login to get token
                <br />
                2. Create category & products
                <br />
                3. Add to cart & create order
                <br />
                4. View order history & leave reviews
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-600">
            <h3 className="font-semibold text-white mb-3">Folder Structure</h3>
            <code className="block bg-slate-800/50 p-4 rounded text-xs text-gray-300 overflow-auto">
              {`graphql/
├── typedefs/
│   ├── index.ts (merges all typeDefs)
│   ├── auth.typedefs.ts
│   ├── product.typedefs.ts
│   ├── cart.typedefs.ts
│   ├── order.typedefs.ts
│   ├── wishlist.typedefs.ts
│   ├── coupon.typedefs.ts
│   ├── review.typedefs.ts
│   └── address.typedefs.ts
├── resolvers/
│   ├── index.ts (merges all resolvers)
│   ├── auth.resolver.ts
│   ├── product.resolver.ts
│   ├── cart.resolver.ts
│   ├── order.resolver.ts
│   ├── wishlist.resolver.ts
│   ├── coupon.resolver.ts
│   ├── review.resolver.ts
│   └── address.resolver.ts
├── schema.ts
├── apollo-server.ts
└── route.ts

lib/
├── prisma.ts (Singleton Prisma Client)
├── jwt.ts (JWT token generation & verification)
├── auth.ts (Password hashing)
└── helpers.ts (Utilities: order number, coupon validation, etc)`}
            </code>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-600">
            <h3 className="font-semibold text-white mb-2">Key Features</h3>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>✓ JWT Authentication with httpOnly Cookies (No 3rd party)</li>
              <li>✓ 38 GraphQL Queries + 51 Mutations</li>
              <li>
                ✓ Full E-commerce: Products, Cart, Orders, Payments, Reviews
              </li>
              <li>✓ Coupon System with validation</li>
              <li>✓ Address Management</li>
              <li>✓ Order Status Tracking</li>
              <li>✓ Merged TypeDefs & Resolvers (Scalable)</li>
              <li>✓ PostgreSQL with Prisma ORM</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
