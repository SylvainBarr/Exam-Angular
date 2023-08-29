export interface User {
  id: number
  email: string
  password: string
}

export namespace User {
  export function generateAdminUser(): User {
    return  {
      id: 1,
      email: 'admin@admin.fr',
      password: 'P@ssw0rd2023'
    }

  }
}
