type PedidoType = {
  name: string
  lastName: string
  email: string
  password?: string | undefined
  birthday: Date | string
  createdAt: Date | string
  updatedAt?: Date | string
}

export default PedidoType