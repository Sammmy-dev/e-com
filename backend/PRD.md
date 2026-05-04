# Product Requirements Document

## Product Name

E-Commerce Store

## 1. Product Summary

The product is a full-stack e-commerce web application that allows shoppers to browse products, filter by category, manage a cart, apply coupons, and complete checkout with Stripe. The platform also includes an admin experience for product management and store analytics.

The application is built with a React + Vite frontend, an Express + Node.js backend, MongoDB for primary data storage, Redis for token and cache support, Cloudinary for product image hosting, and Stripe for payments.

## 2. Problem Statement

Small and mid-sized online stores need a lightweight commerce platform that supports essential shopping workflows without the complexity of a large enterprise system. They need:

- Secure user authentication
- Product discovery by category
- Cart and checkout flows
- Basic discounting through coupons
- Admin tools for product operations
- Visibility into sales and revenue trends

This product addresses those needs with a focused direct-to-consumer storefront and a simple internal admin dashboard.

## 3. Goals

- Enable users to sign up, log in, and remain authenticated securely.
- Allow shoppers to browse products and discover featured or recommended items.
- Support a complete cart-to-checkout purchase flow.
- Allow eligible users to apply coupons during checkout.
- Give admins the ability to create, feature, and remove products.
- Provide admins with top-level sales and revenue analytics.

## 4. Non-Goals

- Multi-vendor marketplace support
- Inventory forecasting or warehouse management
- Product reviews and ratings
- Advanced search, sorting, or faceted filtering
- Order returns, refunds, or exchanges workflows
- Multi-currency and localized pricing
- Guest checkout
- Shipping rate calculation and fulfillment management

## 5. Target Users

### Shopper

A customer who wants to browse products, maintain a cart, apply discounts, and purchase products online.

### Admin

An internal operator responsible for catalog maintenance and high-level business monitoring.

## 6. User Stories

### Shopper Stories

- As a shopper, I want to create an account so I can save my session and cart.
- As a shopper, I want to log in securely so I can access protected actions like cart and checkout.
- As a shopper, I want to browse featured products on the home page so I can quickly discover highlighted items.
- As a shopper, I want to browse products by category so I can narrow down what I am shopping for.
- As a shopper, I want to add products to my cart and adjust quantities so I can manage my order before paying.
- As a shopper, I want to apply a valid coupon so I can reduce my order total.
- As a shopper, I want to complete payment with Stripe so I can place an order securely.
- As a shopper, I want to see success or cancellation states after checkout so I understand what happened.

### Admin Stories

- As an admin, I want to create a new product with an uploaded image so I can keep the catalog current.
- As an admin, I want to delete a product so I can remove obsolete items.
- As an admin, I want to mark products as featured so I can promote selected inventory.
- As an admin, I want to see sales and revenue analytics so I can monitor store performance.

## 7. Core Product Scope

### 7.1 Authentication and Session Management

The system must support:

- User signup with name, email, and password
- User login and logout
- Role-aware access for admin-only areas
- Access and refresh token handling using HTTP-only cookies
- Session continuity through token refresh

Business rules:

- Protected routes require authentication.
- Admin routes require a user role of `admin`.
- Refresh tokens are persisted in Redis.

### 7.2 Product Discovery

The storefront must support:

- Home page product discovery
- Featured product surfacing
- Category-based browsing
- Product recommendations

Business rules:

- Featured products should be cached in Redis for faster retrieval.
- Product catalog data includes name, description, image, category, price, and featured state.

### 7.3 Cart Management

The cart experience must support:

- Adding a product to cart
- Viewing items currently in cart
- Updating product quantities
- Removing a product from cart
- Clearing the cart
- Recalculating subtotal and total after cart changes

Business rules:

- Cart actions require an authenticated user.
- Totals should reflect the latest cart state.

### 7.4 Coupons and Discounts

The platform must support:

- Fetching a currently active coupon for the authenticated user
- Validating a coupon code before checkout
- Applying a percentage-based discount to the cart total
- Deactivating a coupon after successful use

Current implementation behavior:

- A new coupon may be created after a sufficiently large checkout total.
- Coupons are user-specific and expire.

### 7.5 Checkout and Payments

The checkout flow must support:

- Creating a Stripe Checkout session from cart contents
- Passing product, quantity, and discount information to payment processing
- Redirecting users to success and cancel states
- Persisting an order after a successful paid session

Business rules:

- Checkout requires at least one product.
- Stripe is the payment processor for the initial release.
- Successful checkout should produce an order record.

### 7.6 Admin Dashboard

The admin interface must support:

- Product creation
- Product deletion
- Featured product toggling
- Analytics visibility for total users, total products, total sales, total revenue, and daily sales trends

Business rules:

- The admin dashboard is only accessible to authenticated admins.

## 8. Functional Requirements

### FR-1 Account Creation

Users must be able to register with name, email, and password.

### FR-2 Login and Logout

Users must be able to authenticate and terminate their session.

### FR-3 Auth Persistence

The system must preserve login state with refresh token support and recover from expired access tokens where possible.

### FR-4 Product Retrieval

Users must be able to retrieve product lists, featured products, recommendations, and category-specific products.

### FR-5 Cart Operations

Users must be able to add, update, remove, and clear cart items.

### FR-6 Coupon Validation

Users must be able to validate a coupon and see discount-adjusted totals before purchase.

### FR-7 Checkout Session Creation

The system must create a Stripe Checkout session from the current cart and any valid discount state.

### FR-8 Successful Order Recording

The system must store a completed order after confirmed payment success.

### FR-9 Admin Catalog Management

Admins must be able to create and delete products and change featured state.

### FR-10 Admin Analytics

Admins must be able to view aggregated sales and revenue metrics.

## 9. Non-Functional Requirements

### Security

- Authentication tokens must be stored in HTTP-only cookies.
- Protected endpoints must reject unauthenticated users.
- Admin endpoints must reject non-admin users.
- Secrets and credentials must be provided through environment variables.

### Performance

- Featured products should be cacheable in Redis.
- Primary storefront interactions should feel responsive on modern desktop and mobile browsers.
- Image hosting should be offloaded to Cloudinary rather than the application server.

### Reliability

- Checkout failures must return a clear error state instead of silently failing.
- Coupon validation must prevent expired or inactive coupon use.
- Order creation must occur only after confirmed paid status.

### Maintainability

- Frontend and backend must remain logically separated.
- State management should stay centralized in the existing Zustand stores.
- API surface should remain organized by domain route groups.

## 10. Primary User Flows

### Shopper Purchase Flow

1. User lands on the home page.
2. User browses featured or category-specific products.
3. User adds one or more products to the cart.
4. User logs in or signs up if not already authenticated.
5. User reviews cart contents and optionally applies a coupon.
6. User starts Stripe Checkout.
7. User completes or cancels payment.
8. On success, the system confirms payment, records the order, updates coupon state, and shows a purchase success page.

### Admin Catalog Flow

1. Admin logs in.
2. Admin opens the dashboard.
3. Admin creates a product with image, price, and category.
4. Admin optionally marks a product as featured.
5. Admin reviews catalog items and removes products when needed.

### Admin Analytics Flow

1. Admin logs in.
2. Admin opens the analytics section.
3. Admin reviews summary KPIs and daily sales trend data.

## 11. Success Metrics

For an initial release, success should be measured through:

- Signup-to-login conversion rate
- Product view to add-to-cart rate
- Cart to checkout initiation rate
- Checkout completion rate
- Coupon usage rate
- Admin product publishing frequency
- Daily revenue and sales trend growth

## 12. Assumptions

- The store initially operates in USD through Stripe.
- Product inventory availability is managed outside this application.
- Only authenticated users can complete purchases.
- A single admin role model is sufficient for the current stage.

## 13. Risks and Gaps

- No advanced search or merchandising controls may limit discovery as the catalog grows.
- No inventory controls may create oversell risk if this app is used in production without an external stock system.
- No refunds, returns, or support tooling may create operational gaps after purchase.
- A single payment provider creates dependency risk if Stripe configuration fails.
- Analytics are operationally useful but not a substitute for full BI reporting.

## 14. Future Enhancements

- Search, sorting, and richer filtering
- Product detail pages with more media and specifications
- Wishlist and save-for-later flows
- Ratings and reviews
- Inventory and stock alerts
- Order history and account management pages
- Email notifications for signup, purchase, and coupon issuance
- Refund and returns workflows
- Multi-currency and localization support
- Broader analytics such as top products, repeat customers, and funnel conversion

## 15. Technical Context

### Frontend

- React
- Vite
- Tailwind CSS
- Zustand
- Axios
- Framer Motion

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- Redis
- JWT authentication
- Stripe API
- Cloudinary

## 16. Release Scope Recommendation

### MVP

- Authentication
- Product browsing and featured products
- Category browsing
- Cart management
- Coupon validation and application
- Stripe checkout
- Order creation on success
- Admin product management
- Admin analytics dashboard

### Post-MVP

- Search and discovery improvements
- Order management for users
- Customer communications
- Operational tooling for returns and support
