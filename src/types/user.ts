type GeoCoordinates = {
  lat: string
  lng: string
}

type Address = {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: GeoCoordinates
}

type Company = {
  name: string
  catchPhrase: string
  bs: string
}

export type User = {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}
