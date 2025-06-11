export interface RootProduct {
  product: Product
  colors: any[]
  tags: any[]
  imagesPath: any[]
  isLiked: boolean
}

export interface Product {
  name: string
  slack: string
  brand: string
  code: number
  price: number
  discount: number
  number: number
  description: string
  specs: string
  imagePath: string
  image3DPath: string
  categoryId: number
  id: number
}
