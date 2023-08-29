import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Environment} from "../../environment/environment";
import {Character, CharacterHttp} from "../../model/character.model";
import {firstValueFrom, map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private baseApiUrl: string
  constructor(private http: HttpClient) {
    this.baseApiUrl = Environment.API_URL
  }

  getAll(page: number = 1): Promise<{ characters:  Character[], pages: number, next: string|null, prev: string|null}>{
    return firstValueFrom(
      this.http
        .get<{ results: CharacterHttp[], info: {pages: number, next: string|null, prev: string|null} }>(this.baseApiUrl+'?page='+page)
        .pipe(
          map(response => ({
            characters: response.results.map(cH => Character.fromCharacterHttpToCharacter(cH)),
            pages: response.info.pages,
            next: response.info.next,
            prev: response.info.prev
          })
        ))
    )
  }

  getById(characterId: number): Promise<Character>{
    return firstValueFrom(
      this.http
        .get<CharacterHttp>(this.baseApiUrl + characterId)
        .pipe(
          map(characterHttp=> Character.fromCharacterHttpToCharacter(characterHttp))
        )
    )
  }

  getFiltered(filter: string): Promise<{ characters:  Character[], pages: number, next: string|null, prev: string|null}>{
    return firstValueFrom(
      this.http
        .get<{ results: CharacterHttp[], info: {pages: number, next: string|null, prev: string|null} }>(this.baseApiUrl+filter)
        .pipe(
          map(response => ({
              characters: response.results.map(cH => Character.fromCharacterHttpToCharacter(cH)),
              pages: response.info.pages,
              next: response.info.next,
              prev: response.info.prev
            })
          ))
    )
  }

  update(id: number, characterUpdated: Omit<Character, "id" | "location" | "url" | "origin" | "episode" | "created">) {
    return new Promise<void>(
      (res)=>{
        let message = 'Character id '+id+' has been updated'
        console.log(message)
        res()
      }
    )
  }
}
