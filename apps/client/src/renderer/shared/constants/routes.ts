export enum AppRouteNames {
  Root = 'root',

  SignIn = 'sign-in',

  BoardsList = 'boards-list',
  BoardsInfo = 'boards-info',
}

export const AppRoutePaths = {
  Root: '/',
  Boards: {
    List: '/boards',
    Info: (id: string) => `/boards/${id}`,
  },
}
