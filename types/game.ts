export interface Game {
  id: number
  title: string
  thumbnail: string
  short_description: string
  game_url: string
  genre: string
  platform: string
  publisher: string
  developer: string
  release_date: string
  freetogame_profile_url: string

}

export interface Screenshot {
  id: number
  image: string
}

export interface MinimumSystemRequirements {
  os: string
  processor: string
  memory: string
  graphics: string
  storage: string
}

export interface GameDetail extends Game {
  description: string
  status: string
  screenshots: Screenshot[]
  minimum_system_requirements?: MinimumSystemRequirements
  tags?: string[]
  error?: string
}
