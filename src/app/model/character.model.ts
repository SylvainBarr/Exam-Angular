
export interface CharacterHttp{
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: {name: string, url: string}
  location: {name: string, url: string}
  image: string
  episode: string[]
  url: string
  created: string
}

export interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: {name: string, url: string}
  location: {name: string, url: string}
  image: string
  episode: string[]
  url: string
  created: string
}

export namespace Character{
  export function fromCharacterHttpToCharacter(characterHttp: CharacterHttp): Character{
    return {
      id: characterHttp.id,
      name: characterHttp.name,
      status: characterHttp.status,
      species: characterHttp.species,
      type: characterHttp.type,
      gender: characterHttp.gender,
      origin: characterHttp.origin,
      location: characterHttp.location,
      image: characterHttp.image,
      episode: characterHttp.episode.map(episode => 'Episode '+episode.split('https://rickandmortyapi.com/api/episode/')[1]),
      url: characterHttp.url,
      created: characterHttp.created.split('T')[0]
    }
  }
}
