/**
 * Тип данных пользователя, полученный из tRPC.
 * @example RouterOutput['user']['me']
 */
export type User = any

/**
 * Тип для пары токенов (access и refresh), полученный из tRPC.
 * @example RouterOutput['user']['signIn']['token']
 */
export type TokenPair = any

/**
 * Тип данных для входа в систему, на основе tRPC-ввода.
 * @example RouterInput['user']['signIn']
 */
export type SignInPayload = any

/**
 * Тип данных для регистрации, на основе tRPC-ввода.
 * @example RouterInput['user']['signUp']
 */
export type SignUpPayload = any
