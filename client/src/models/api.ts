/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type PrismaDecimal = string;

/** Model Order */
export interface Order {
  status: string;
  amount: PrismaDecimal | null;
  /** @format date-time */
  updatedAt: string | null;
  /** @format date-time */
  createdAt: string | null;
  /** @format double */
  userId: number;
  /** @format double */
  id: number;
}

/** Model ProductOrder */
export interface ProductOrder {
  price: PrismaDecimal;
  /** @format double */
  orderId: number | null;
  /** @format double */
  quantity: number;
  /** @format double */
  productId: number | null;
  /** @format date-time */
  updatedAt: string | null;
  /** @format date-time */
  createdAt: string | null;
  /** @format double */
  id: number;
}

/** From T, pick a set of properties whose keys are in the union K */
export interface PickOrderUserId {
  /** @format double */
  userId: number;
}

export type OrderCreationParams = PickOrderUserId;

/** From T, pick a set of properties whose keys are in the union K */
export interface PickProductOrderProductIdOrOrderIdOrQuantityOrPrice {
  /** @format double */
  productId: number | null;
  /** @format double */
  orderId: number | null;
  /** @format double */
  quantity: number;
  price: PrismaDecimal;
}

export type ProductOrderCreationParams = PickProductOrderProductIdOrOrderIdOrQuantityOrPrice;

export interface CheckoutInfo {
  order: ProductOrder[];
  userEmail: string;
}

/** Enums */
export enum RoleEnumType {
  User = "user",
  Admin = "admin",
}

/** Make all properties in T optional */
export interface PartialUser {
  /** @format double */
  id?: number;
  name?: string | null;
  surname?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  password?: string | null;
  /** Enums */
  role?: RoleEnumType;
  fullProfile?: boolean | null;
  /** @format date-time */
  createdAt?: string | null;
  /** @format date-time */
  updatedAt?: string | null;
  stripeId?: string | null;
}

export interface UserLoginParams {
  password: string;
  email: string;
}

export interface UserInfo {
  /** @format double */
  id: number;
  accessToken: string;
  refreshToken: string;
}

/** Model Category */
export interface Category {
  categoryName: string;
  /** @format double */
  id: number;
}

/** Model Product */
export interface Product {
  picture: string | null;
  /** @format date-time */
  updatedAt: string | null;
  /** @format date-time */
  createdAt: string;
  categoryName: string;
  available: boolean;
  price: PrismaDecimal;
  description: string;
  name: string;
  /** @format double */
  id: number;
}

export enum PrismaSortOrder {
  Asc = "asc",
  Desc = "desc",
}

/** From T, pick a set of properties whose keys are in the union K */
export interface PickProductNameOrDescriptionOrPriceOrAvailableOrCategoryName {
  price: PrismaDecimal;
  name: string;
  description: string;
  available: boolean;
  categoryName: string;
}

export type ProductCreationParams = PickProductNameOrDescriptionOrPriceOrAvailableOrCategoryName;

/** Model User */
export interface User {
  stripeId: string | null;
  /** @format date-time */
  updatedAt: string | null;
  /** @format date-time */
  createdAt: string | null;
  fullProfile: boolean | null;
  /** Enums */
  role: RoleEnumType;
  password: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  surname: string | null;
  name: string | null;
  /** @format double */
  id: number;
}

export interface UserCreationParams {
  password: string;
  address: string | null;
  phone: string;
  email: string;
  surname: string;
  name: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "/";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Plantie app API
 * @version 1.0.0
 * @license ISC
 * @baseUrl /
 * @contact
 *
 * CRUD API made with Express
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  orders = {
    /**
     * @description Retrieves a list of all orders in the system for the particular user.
     *
     * @tags Orders
     * @name GetOrders
     * @request GET:/orders/{userId}
     * @secure
     */
    getOrders: (userId: number, params: RequestParams = {}) =>
      this.request<Order[], any>({
        path: `/orders/${userId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves the detailes of a particular order provided the unique order ID.
     *
     * @tags Orders
     * @name GetOrder
     * @request GET:/orders/{orderId}
     * @secure
     */
    getOrder: (orderId: number, params: RequestParams = {}) =>
      this.request<Order | null, any>({
        path: `/orders/${orderId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns draft order provided the unique user ID.
     *
     * @tags Orders
     * @name GetOrderByUserId
     * @request GET:/orders/draft/{userId}
     */
    getOrderByUserId: (userId: number, params: RequestParams = {}) =>
      this.request<Order | null, any>({
        path: `/orders/draft/${userId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns user's cart (list of cart items) provided the order ID.
     *
     * @tags Orders
     * @name GetCart
     * @request GET:/orders/{orderId}/product-orders
     */
    getCart: (orderId: number, params: RequestParams = {}) =>
      this.request<ProductOrder[] | null, any>({
        path: `/orders/${orderId}/product-orders`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a new draft order in the system.
     *
     * @tags Orders
     * @name CreateOrder
     * @request POST:/orders
     */
    createOrder: (data: OrderCreationParams, params: RequestParams = {}) =>
      this.request<Order, any>({
        path: `/orders`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  productOrders = {
    /**
     * @description Creates a new ProductOrder in the system.
     *
     * @tags ProductOrders
     * @name CreateProductOrder
     * @request POST:/product-orders
     */
    createProductOrder: (data: ProductOrderCreationParams, params: RequestParams = {}) =>
      this.request<ProductOrder, any>({
        path: `/product-orders`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Updates ProductOrder quantity provided the unique ProductOrder ID.
     *
     * @tags ProductOrders
     * @name UpdateQuantity
     * @request PUT:/product-orders/{productOrderId}
     */
    updateQuantity: (
      productOrderId: number,
      data: {
        /** @format double */
        quantity: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ProductOrder | null, any>({
        path: `/product-orders/${productOrderId}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes cart item from the cart provided the unique cart item ID.
     *
     * @tags ProductOrders
     * @name DeleteProductOrderById
     * @request DELETE:/product-orders/{productOrderId}
     */
    deleteProductOrderById: (productOrderId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/product-orders/${productOrderId}`,
        method: "DELETE",
        ...params,
      }),
  };
  stripe = {
    /**
     * No description
     *
     * @tags Stripe
     * @name CreateCheckoutSession
     * @request POST:/stripe/create-checkout-session
     * @secure
     */
    createCheckoutSession: (data: CheckoutInfo, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/stripe/create-checkout-session`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Creates Stripe webhook to update database is the checkout session was successfull.
     *
     * @tags Stripe
     * @name CreateWebhook
     * @request POST:/stripe/webhook
     */
    createWebhook: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/stripe/webhook`,
        method: "POST",
        ...params,
      }),
  };
  session = {
    /**
     * @description Logs in user to the system and creates an access token.
     *
     * @tags Auth
     * @name Login
     * @request POST:/session/authenticate
     */
    login: (data: UserLoginParams, params: RequestParams = {}) =>
      this.request<PartialUser, any>({
        path: `/session/authenticate`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a new user in the system and returns access token and refresh token.
     *
     * @tags Auth
     * @name CreateUser
     * @request POST:/session/start
     */
    createUser: (params: RequestParams = {}) =>
      this.request<UserInfo, any>({
        path: `/session/start`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * @description Updates access token using refresh token.
     *
     * @tags Auth
     * @name Refresh
     * @request POST:/session/refresh
     */
    refresh: (params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/session/refresh`,
        method: "POST",
        format: "json",
        ...params,
      }),
  };
  categories = {
    /**
     * @description Retrieves a list of all categories in the system. If filtering criteria are provided, filters the list of products.
     *
     * @tags Categories
     * @name GetCategories
     * @request GET:/categories
     */
    getCategories: (params: RequestParams = {}) =>
      this.request<Category[], any>({
        path: `/categories`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  products = {
    /**
     * @description Retrieves a list of all products in the system. If filtering criteria are provided, filters the list of products.
     *
     * @tags Products
     * @name GetProducts
     * @request GET:/products
     */
    getProducts: (
      query?: {
        priceRange?: string;
        categoryName?: string;
        orderBy?: PrismaSortOrder;
        searchTerm?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Product[], any>({
        path: `/products`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a new product in the system.
     *
     * @tags Products
     * @name CreateProduct
     * @request POST:/products
     * @secure
     */
    createProduct: (data: ProductCreationParams, params: RequestParams = {}) =>
      this.request<Product, any>({
        path: `/products`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves a product with the lowest price.
     *
     * @tags Products
     * @name GetCheapest
     * @request GET:/products/cheapest
     */
    getCheapest: (params: RequestParams = {}) =>
      this.request<Product | null, any>({
        path: `/products/cheapest`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves a product with the highest price.
     *
     * @tags Products
     * @name GetHighestPrice
     * @request GET:/products/highestPrice
     */
    getHighestPrice: (params: RequestParams = {}) =>
      this.request<Product | null, any>({
        path: `/products/highestPrice`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves the detailes of a particular product provided the unique product ID.
     *
     * @tags Products
     * @name GetProduct
     * @request GET:/products/{productId}
     */
    getProduct: (productId: number, params: RequestParams = {}) =>
      this.request<Product, any>({
        path: `/products/${productId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Updates the detailes of a particular product provided the unique product ID.
     *
     * @tags Products
     * @name UpdateProduct
     * @request PUT:/products/{productId}
     * @secure
     */
    updateProduct: (productId: number, data: ProductCreationParams, params: RequestParams = {}) =>
      this.request<Product, any>({
        path: `/products/${productId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes a product from the system.
     *
     * @tags Products
     * @name DeleteProduct
     * @request DELETE:/products/{productId}
     * @secure
     */
    deleteProduct: (productId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/products/${productId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Returns a ProductOrder provided the product ID.
     *
     * @tags Products
     * @name GetProductOrderByProductId
     * @request GET:/products/{productId}/product-orders
     */
    getProductOrderByProductId: (productId: number, params: RequestParams = {}) =>
      this.request<ProductOrder | null, any>({
        path: `/products/${productId}/product-orders`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * @description Retrieves a list of all users in the system.
     *
     * @tags Users
     * @name GetUsers
     * @request GET:/users
     * @secure
     */
    getUsers: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/users`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves the detailes of a particular user provided the unique user ID.
     *
     * @tags Users
     * @name GetUser
     * @request GET:/users/{userId}
     * @secure
     */
    getUser: (userId: number, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/${userId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes a user from the system.
     *
     * @tags Users
     * @name DeleteUser
     * @request DELETE:/users/{userId}
     * @secure
     */
    deleteUser: (userId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/${userId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  me = {
    /**
     * @description Retrieves the detailes of a particular user provided the unique user ID.
     *
     * @tags Users
     * @name GetUserProfile
     * @request GET:/me
     * @secure
     */
    getUserProfile: (params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UpdateUser
     * @request PUT:/me
     * @secure
     */
    updateUser: (data: UserCreationParams, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/me`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
