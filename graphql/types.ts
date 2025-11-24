export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isDefault: Scalars['Boolean']['output'];
  label?: Maybe<Scalars['String']['output']>;
  phone: Scalars['String']['output'];
  postalCode?: Maybe<Scalars['String']['output']>;
  street: Scalars['String']['output'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
};

export type Brand = {
  __typename?: 'Brand';
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type BrandsResponse = {
  __typename?: 'BrandsResponse';
  data: Array<Brand>;
  paginationDetails: PaginationDetails;
};

export type Cart = {
  __typename?: 'Cart';
  itemCount: Scalars['Int']['output'];
  items: Array<CartItem>;
  subtotal: Scalars['Float']['output'];
};

export type CartItem = {
  __typename?: 'CartItem';
  id: Scalars['ID']['output'];
  price: Scalars['Float']['output'];
  product: Product;
  quantity: Scalars['Int']['output'];
  total: Scalars['Float']['output'];
};

export type CategoriesResponse = {
  __typename?: 'CategoriesResponse';
  data: Array<Category>;
  paginationDetails: PaginationDetails;
};

export type Category = {
  __typename?: 'Category';
  children: Array<Category>;
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  parentId?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Coupon = {
  __typename?: 'Coupon';
  code: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  discountType: DiscountType;
  discountValue: Scalars['Float']['output'];
  expiresAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  maxDiscount?: Maybe<Scalars['Float']['output']>;
  minPurchase?: Maybe<Scalars['Float']['output']>;
};

export type CreateBrandInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type CreateExpenseCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateExpenseInput = {
  amount: Scalars['Float']['input'];
  categoryId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  expenseDate: Scalars['String']['input'];
  receiptUrl?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateOrderItemInput = {
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};

export type CreateProductInput = {
  brandId?: InputMaybe<Scalars['String']['input']>;
  categoryId: Scalars['String']['input'];
  comparePrice?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dimensions?: InputMaybe<Scalars['String']['input']>;
  images: Array<Scalars['String']['input']>;
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  metaDescription?: InputMaybe<Scalars['String']['input']>;
  metaTitle?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  sku?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  stock: Scalars['Int']['input'];
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateTransactionInput = {
  amount: Scalars['Float']['input'];
  description: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  role: Role;
};

export enum DiscountType {
  Fixed = 'FIXED',
  Percentage = 'PERCENTAGE'
}

export enum EditRequestStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type Expense = {
  __typename?: 'Expense';
  amount: Scalars['Float']['output'];
  category: ExpenseCategory;
  createdAt: Scalars['String']['output'];
  createdBy: User;
  description?: Maybe<Scalars['String']['output']>;
  editRequests: Array<ExpenseEditRequest>;
  expenseDate: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  receiptUrl?: Maybe<Scalars['String']['output']>;
  status: ExpenseStatus;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type ExpenseCategory = {
  __typename?: 'ExpenseCategory';
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type ExpenseEditRequest = {
  __typename?: 'ExpenseEditRequest';
  createdAt: Scalars['String']['output'];
  expense: Expense;
  id: Scalars['ID']['output'];
  proposedChanges: Scalars['JSON']['output'];
  rejectionReason?: Maybe<Scalars['String']['output']>;
  requestedBy: User;
  reviewedAt?: Maybe<Scalars['String']['output']>;
  reviewedBy?: Maybe<User>;
  status: EditRequestStatus;
  updatedAt: Scalars['String']['output'];
};

export enum ExpenseStatus {
  Approved = 'APPROVED',
  PendingEdit = 'PENDING_EDIT',
  RejectedEdit = 'REJECTED_EDIT'
}

export type LogoutPayload = {
  __typename?: 'LogoutPayload';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
  addToCart: Cart;
  addToWishlist: Product;
  applyCoupon: ValidateCouponPayload;
  approveExpenseEdit: Expense;
  approveReview: Review;
  cancelOrder: Order;
  changePassword: User;
  clearCart: Scalars['Boolean']['output'];
  createAddress: Address;
  createBrand: Brand;
  createCategory: Category;
  createCoupon: Coupon;
  createExpense: Expense;
  createExpenseCategory: ExpenseCategory;
  createOrder: Order;
  createProduct: Product;
  createReview: Review;
  createTransaction?: Maybe<Transaction>;
  createUser: User;
  deleteAccount: LogoutPayload;
  deleteAddress: Scalars['Boolean']['output'];
  deleteBrand: Scalars['Boolean']['output'];
  deleteCategory: Scalars['Boolean']['output'];
  deleteCoupon: Scalars['Boolean']['output'];
  deleteExpense: Scalars['Boolean']['output'];
  deleteExpenseCategory: Scalars['Boolean']['output'];
  deleteProduct: Scalars['Boolean']['output'];
  deleteReview: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  login: AuthPayload;
  logout: LogoutPayload;
  moveToCart: Cart;
  register: AuthPayload;
  rejectExpenseEdit: Expense;
  removeFromCart: Cart;
  removeFromWishlist: Scalars['Boolean']['output'];
  setDefaultAddress: Address;
  toggleBrandStatus: Brand;
  toggleCategoryStatus: Category;
  toggleCouponStatus: Coupon;
  toggleExpenseCategoryStatus: ExpenseCategory;
  toggleProductStatus: Product;
  toggleUserStatus: User;
  updateAddress: Address;
  updateBrand: Brand;
  updateCartItem: Cart;
  updateCategory: Category;
  updateCoupon: Coupon;
  updateExpense: Expense;
  updateExpenseCategory: ExpenseCategory;
  updateOrderStatus: Order;
  updateProduct: Product;
  updateProfile: User;
  updateReview: Review;
  updateUser: User;
};


export type MutationAddToCartArgs = {
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationAddToWishlistArgs = {
  productId: Scalars['ID']['input'];
};


export type MutationApplyCouponArgs = {
  couponCode: Scalars['String']['input'];
};


export type MutationApproveExpenseEditArgs = {
  id: Scalars['ID']['input'];
};


export type MutationApproveReviewArgs = {
  approved: Scalars['Boolean']['input'];
  id: Scalars['ID']['input'];
};


export type MutationCancelOrderArgs = {
  id: Scalars['ID']['input'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};


export type MutationCreateAddressArgs = {
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
  phone: Scalars['String']['input'];
  postalCode?: InputMaybe<Scalars['String']['input']>;
  street: Scalars['String']['input'];
};


export type MutationCreateBrandArgs = {
  input: CreateBrandInput;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationCreateCouponArgs = {
  code: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  discountType: DiscountType;
  discountValue: Scalars['Float']['input'];
  expiresAt?: InputMaybe<Scalars['String']['input']>;
  maxDiscount?: InputMaybe<Scalars['Float']['input']>;
  maxUseCount?: InputMaybe<Scalars['Int']['input']>;
  maxUsePerUser?: InputMaybe<Scalars['Int']['input']>;
  minPurchase?: InputMaybe<Scalars['Float']['input']>;
  startsAt?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateExpenseArgs = {
  input: CreateExpenseInput;
};


export type MutationCreateExpenseCategoryArgs = {
  input: CreateExpenseCategoryInput;
};


export type MutationCreateOrderArgs = {
  couponCode?: InputMaybe<Scalars['String']['input']>;
  customerNotes?: InputMaybe<Scalars['String']['input']>;
  items: Array<CreateOrderItemInput>;
  shippingCity: Scalars['String']['input'];
  shippingCountry: Scalars['String']['input'];
  shippingName: Scalars['String']['input'];
  shippingPhone: Scalars['String']['input'];
  shippingPostal?: InputMaybe<Scalars['String']['input']>;
  shippingStreet: Scalars['String']['input'];
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationCreateReviewArgs = {
  comment?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  productId: Scalars['ID']['input'];
  rating: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateTransactionArgs = {
  input: CreateTransactionInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteAddressArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteBrandArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCouponArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteExpenseArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteExpenseCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteReviewArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationMoveToCartArgs = {
  productId: Scalars['ID']['input'];
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  gender?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
};


export type MutationRejectExpenseEditArgs = {
  id: Scalars['ID']['input'];
  rejectionReason?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRemoveFromCartArgs = {
  productId: Scalars['ID']['input'];
};


export type MutationRemoveFromWishlistArgs = {
  productId: Scalars['ID']['input'];
};


export type MutationSetDefaultAddressArgs = {
  id: Scalars['ID']['input'];
};


export type MutationToggleBrandStatusArgs = {
  id: Scalars['ID']['input'];
};


export type MutationToggleCategoryStatusArgs = {
  id: Scalars['ID']['input'];
};


export type MutationToggleCouponStatusArgs = {
  id: Scalars['ID']['input'];
};


export type MutationToggleExpenseCategoryStatusArgs = {
  id: Scalars['ID']['input'];
};


export type MutationToggleProductStatusArgs = {
  id: Scalars['ID']['input'];
};


export type MutationToggleUserStatusArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateAddressArgs = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateBrandArgs = {
  id: Scalars['ID']['input'];
  input: UpdateBrandInput;
};


export type MutationUpdateCartItemArgs = {
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['ID']['input'];
  input: UpdateCategoryInput;
};


export type MutationUpdateCouponArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  discountValue?: InputMaybe<Scalars['Float']['input']>;
  expiresAt?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};


export type MutationUpdateExpenseArgs = {
  id: Scalars['ID']['input'];
  input: UpdateExpenseInput;
};


export type MutationUpdateExpenseCategoryArgs = {
  id: Scalars['ID']['input'];
  input: UpdateExpenseCategoryInput;
};


export type MutationUpdateOrderStatusArgs = {
  id: Scalars['ID']['input'];
  status: OrderStatus;
};


export type MutationUpdateProductArgs = {
  id: Scalars['ID']['input'];
  input: UpdateProductInput;
};


export type MutationUpdateProfileArgs = {
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateReviewArgs = {
  comment?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  rating?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
};

export type Order = {
  __typename?: 'Order';
  adminNotes?: Maybe<Scalars['String']['output']>;
  carrier?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  customerNotes?: Maybe<Scalars['String']['output']>;
  deliveredAt?: Maybe<Scalars['String']['output']>;
  discount: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  items: Array<OrderItem>;
  orderNumber: Scalars['String']['output'];
  shippedAt?: Maybe<Scalars['String']['output']>;
  shipping: Scalars['Float']['output'];
  status: OrderStatus;
  subtotal: Scalars['Float']['output'];
  tax: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  trackingNumber?: Maybe<Scalars['String']['output']>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  id: Scalars['ID']['output'];
  price: Scalars['Float']['output'];
  productImage?: Maybe<Scalars['String']['output']>;
  productName: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  total: Scalars['Float']['output'];
};

export enum OrderStatus {
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Refunded = 'REFUNDED',
  Shipped = 'SHIPPED'
}

export type PaginatedExpenseCategories = {
  __typename?: 'PaginatedExpenseCategories';
  data: Array<ExpenseCategory>;
  paginationDetails: PaginationDetails;
};

export type PaginatedExpenseEditRequests = {
  __typename?: 'PaginatedExpenseEditRequests';
  data: Array<ExpenseEditRequest>;
  paginationDetails: PaginationDetails;
};

export type PaginatedExpenses = {
  __typename?: 'PaginatedExpenses';
  data: Array<Expense>;
  paginationDetails: PaginationDetails;
};

export type PaginatedProducts = {
  __typename?: 'PaginatedProducts';
  data: Array<Product>;
  paginationDetails: PaginationDetails;
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  data: Array<User>;
  paginationDetails: PaginationDetails;
};

export type PaginationDetails = {
  __typename?: 'PaginationDetails';
  currentPage: Scalars['Int']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  perPage: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginationInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};

export type Product = {
  __typename?: 'Product';
  brand?: Maybe<Brand>;
  category: Category;
  comparePrice?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  dimensions?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  images: Array<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  isFeatured: Scalars['Boolean']['output'];
  metaDescription?: Maybe<Scalars['String']['output']>;
  metaTitle?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  reviews: Array<Review>;
  sku?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  stock: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
  variants: Array<ProductVariant>;
  weight?: Maybe<Scalars['Float']['output']>;
};

export type ProductVariant = {
  __typename?: 'ProductVariant';
  attributes: Scalars['JSON']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  price?: Maybe<Scalars['Float']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  stock: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  address?: Maybe<Address>;
  addresses: Array<Address>;
  brand?: Maybe<Brand>;
  brands: BrandsResponse;
  brandsDropdown: Array<Brand>;
  cart: Cart;
  cartItemCount: Scalars['Int']['output'];
  categories: CategoriesResponse;
  categoriesDropdown: Array<Category>;
  category?: Maybe<Category>;
  coupon?: Maybe<Coupon>;
  coupons: Array<Coupon>;
  customers: PaginatedUsers;
  expense?: Maybe<Expense>;
  expenseCategories: PaginatedExpenseCategories;
  expenseCategoriesDropdown: Array<ExpenseCategory>;
  expenseCategory?: Maybe<ExpenseCategory>;
  expenseEditRequest?: Maybe<ExpenseEditRequest>;
  expenseEditRequests: PaginatedExpenseEditRequests;
  expenses: PaginatedExpenses;
  featuredProducts: Array<Product>;
  health: Scalars['String']['output'];
  me?: Maybe<User>;
  order?: Maybe<Order>;
  orders: Array<Order>;
  ordersByStatus: Array<Order>;
  pendingExpenseEditRequests: Array<ExpenseEditRequest>;
  product?: Maybe<Product>;
  productReviews: Array<Review>;
  productVariants: Array<ProductVariant>;
  products: PaginatedProducts;
  productsByBrand: PaginatedProducts;
  productsByCategory: PaginatedProducts;
  relatedProducts: Array<Product>;
  review?: Maybe<Review>;
  reviews: Array<Review>;
  searchProducts: PaginatedProducts;
  staff: PaginatedUsers;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  user?: Maybe<User>;
  userOrderHistory: Array<Order>;
  users: PaginatedUsers;
  validateCoupon: ValidateCouponPayload;
  wishlist: Array<Product>;
  wishlistItemCount: Scalars['Int']['output'];
};


export type QueryAddressArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBrandArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBrandsArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryCategoriesArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCouponArgs = {
  code: Scalars['String']['input'];
};


export type QueryCouponsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCustomersArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryExpenseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryExpenseCategoriesArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryExpenseCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryExpenseEditRequestArgs = {
  id: Scalars['ID']['input'];
};


export type QueryExpenseEditRequestsArgs = {
  pagination?: InputMaybe<PaginationInput>;
  requestedById?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<EditRequestStatus>;
};


export type QueryExpensesArgs = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  createdById?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  pagination?: InputMaybe<PaginationInput>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ExpenseStatus>;
};


export type QueryFeaturedProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryOrderArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  orderNumber?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOrdersArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryOrdersByStatusArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  status: OrderStatus;
};


export type QueryProductArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductReviewsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  productId: Scalars['ID']['input'];
};


export type QueryProductVariantsArgs = {
  productId: Scalars['ID']['input'];
};


export type QueryProductsArgs = {
  brandId?: InputMaybe<Scalars['String']['input']>;
  categoryId?: InputMaybe<Scalars['String']['input']>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryProductsByBrandArgs = {
  brandId: Scalars['String']['input'];
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryProductsByCategoryArgs = {
  categoryId: Scalars['String']['input'];
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryRelatedProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  productId: Scalars['ID']['input'];
};


export type QueryReviewArgs = {
  id: Scalars['ID']['input'];
};


export type QueryReviewsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySearchProductsArgs = {
  pagination?: InputMaybe<PaginationInput>;
  query: Scalars['String']['input'];
};


export type QueryStaffArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryTransactionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTransactionsArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserOrderHistoryArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUsersArgs = {
  pagination?: InputMaybe<PaginationInput>;
  role?: InputMaybe<Role>;
};


export type QueryValidateCouponArgs = {
  code: Scalars['String']['input'];
  orderTotal: Scalars['Float']['input'];
};

export type Review = {
  __typename?: 'Review';
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  images: Array<Scalars['String']['output']>;
  isApproved: Scalars['Boolean']['output'];
  isVerifiedPurchase: Scalars['Boolean']['output'];
  product: Product;
  rating: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
  user: User;
};

export enum Role {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER'
}

export type Transaction = {
  __typename?: 'Transaction';
  amount: Scalars['Float']['output'];
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  userId: Scalars['ID']['output'];
};

export type UpdateBrandInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateExpenseCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateExpenseInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  categoryId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  expenseDate?: InputMaybe<Scalars['String']['input']>;
  receiptUrl?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductInput = {
  brandId?: InputMaybe<Scalars['String']['input']>;
  categoryId?: InputMaybe<Scalars['String']['input']>;
  comparePrice?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dimensions?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  metaDescription?: InputMaybe<Scalars['String']['input']>;
  metaTitle?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateUserInput = {
  image?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  role: Role;
  updatedAt: Scalars['String']['output'];
};

export type ValidateCouponPayload = {
  __typename?: 'ValidateCouponPayload';
  coupon?: Maybe<Coupon>;
  discount?: Maybe<Scalars['Float']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  valid: Scalars['Boolean']['output'];
};
