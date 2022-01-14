interface RickAndMortyCharacterOriginOrLocation {
  name: string
  url: string
}

interface RickAndMortyCharacter {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: RickAndMortyCharacterOriginOrLocation
  location: RickAndMortyCharacterOriginOrLocation
  image: string
  episode: string[]
  url: string
  created: string
}

interface RickAndMortyApiCharacterResponseInfo {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

interface RickAndMortyApiCharacterResponse {
  info: RickAndMortyApiCharacterResponseInfo
  results: RickAndMortyCharacter[]
}